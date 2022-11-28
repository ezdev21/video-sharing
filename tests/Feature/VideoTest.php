<?php

namespace Tests\Feature;

use App\Models\Channel;
use App\Models\Comment;
use App\Models\User;
use App\Models\Video;
use App\Notifications\ChannelNewVideo;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Support\Collection;
use Tests\TestCase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Event;
use Illuminate\Support\Facades\Storage;

class VideoTest extends TestCase
{
    /**
     * A basic feature test example.
     *
     * @return void
     */
    use RefreshDatabase;
    
    public function test_videos_are_renderd_in_home_page()
    {
        $videos=Video::factory(100)->create();
        $response = $this->get('/');
        $response->assertStatus(200)
                 ->assertViewHas('video.index',function(Collection $videos){
                    return $videos;
                 });
    }

    public function test_videos_and_channels_can_be_searched()
    {
       $searchQuery="beyonce";
       $videos=Video::factory(5)->create(['title'=>$searchQuery]);
       $channels=Channel::factory(5)->create(['name'=>$searchQuery]);
       $response = $this->post('/json',['searchQuery'=>$searchQuery]);
       $response->assertStatus(200)
                 ->assertViewHas('video.search',function(Collection $videos){
                    return $videos;
                 });
    }

    public function test_video_upload_page_can_be_rendered()
    {
      $user=User::factory()->create();
      $this->get($user);
      $response=$this->get('/video/upload');
      $response->assertOk()
               ->assertViewIs('video.upload');
    }

    public function test_video_can_be_uploaded()
    {
      $user=User::factory()->create();
      $this->get($user);
      $channel=Channel::factory()->create(['user_id'=>$user->id]);
      //channel subscrbers
      $users=User::factory(5)->create();
      foreach ($users as $user) {
        $channel->attach($user->id);
      }
      Storage::fake('videoCover');
      $image = UploadedFile::fake()->image('image.jpg');
      Storage::fake('video');
      $video = UploadedFile::fake()->file('video.mp4');
      //$channel=Channel::factory()->create();
      $data=[
        'title'=>'title',
        'description'=>'description',
        'userId'=>$user->id,
        'cover'=>$image,
        'video'=>$video
      ];
      $response=$this->post('/video/upload',$data);
      $response->assertRedirect('/home');
      $this->assertDatabaseCount('videos',1);
      //assert image and video uploaded
      Storage::disk('videoCover')->assertExists($image->hashName());
      Storage::disk('video')->assertExists($video->hashName());
      //assert channel subscribers are notified when video uploaded
      Event::fake();
      Event::assertDispatched(ChannelNewVideo::class);
    }

    public function test_video_with_recommended_videos_can_be_rendered_in_video_show_page()
    {
       $video=Video::factory()->create(['views'=>0]);
       $recommendedVideos=Video::factory(20)->create();
       $response=$this->get("/video/watch/$video->id");
       //assert video view is increased
       $this->assertDatabaseHas('videos',['id'=>$video->id,'views'=>1]);
       //assert video.watch page rendered contains video and recommended videos
       $response->assertViewIs('video.watch')
                ->assertViewHasAll([
                  'video'=>$video,
                  'recommendedVideos'=>$recommendedVideos
                ]);
    }

    public function test_video_like_and_dislike_datas_can_be_fetched()
    {
        $user=User::factory()->create();
        $this->get($user);
        $video=Video::factory()->create();
        $response=$this->get('/video/like',['userId'=>$user->id,'videoId'=>$video->id]);
        $response->assertOk()
                 ->assertJsonStructure([
                    'liked','disliked','totalLikes','totalDislikes'
                 ]);
    }

    public function test_authenticated_user_can_like_video()
    {
        $user=User::factory()->create();
        $this->get($user);
        $video=Video::factory()->create();
        $response=$this->post('video/like',[
            'userId'=>$user->id,
            'videoId'=>$video->id,
            'status'=>false,
            'type'=>'like'
        ]);
        $response->assertOk();
        $this->assertDatabaseHas('user_video',['id'=>$video->id,'type'=>'dislike']);
    }

    public function test_authenticated_user_can_dislike_video()
    {
        $user=User::factory()->create();
        $this->get($user);
        $video=Video::factory()->create();
        $response=$this->post('video/like',[
            'userId'=>$user->id,
            'videoId'=>$video->id,
            'status'=>false,
            'type'=>'dislike'
        ]);
        $response->assertOk();
        $this->assertDatabaseHas('user_video',['id'=>$video->id,'type'=>'dislike']);
    }

    public function test_liked_video_can_be_unliked_by_authenticated_user()
    {
        $user=User::factory()->create();
        $this->get($user);
        $video=Video::factory()->create();
        $video->users()->attach($user->id);
        $response=$this->post('video/like',['userId'=>$user->id,'videoId'=>$video->id,'status'=>true]);
        $this->assertDatabaseCount('video_user',0);
    }

    public function test_video_comments_can_be_returned()
    {
        $user=User::factory()->create();
        $this->get($user);
        $video=Video::factory()->create();
        $comments=Comment::factory(5)->create(['video_id'=>$video->id]);
        $response=$this->get('/video/comments',['videoId'=>$video->id]);
        $response->assertOk()
                 ->assertJsonStructure([
                   'comments',
                   'user'
                 ]);
    }
}

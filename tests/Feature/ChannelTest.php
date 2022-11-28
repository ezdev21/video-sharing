<?php

namespace Tests\Feature;

use App\Models\Channel;
use App\Models\User;
use App\Models\Video;
use App\Notifications\NewSubscriber;
use App\Providers\RouteServiceProvider;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Notification;
use Illuminate\Support\Facades\Storage;
use Tests\TestCase;

class ChannelTest extends TestCase
{
    /**
     * A basic feature test example.
     *
     * @return void
     */
    use RefreshDatabase;
    
    public function test_channel_create_pageIs_rendered_fo_authtenticated_user()
    {
        $user=User::factory()->create();
        $this->actingAs($user);
        $response = $this->get('/channel/create');
        $response->assertViewIs('channel.create');
    }

    public function test_authenticated_user_can_create_channel()
    {
        $user=User::factory()->create();
        $this->actingAs($user);
        Storage::fake('channelCover');
        $image = UploadedFile::fake()->image('image.jpg');
        $data=[
          'name'=>'name',
          'description'=>'description',
          'userId'=>$user->id,
          'cover'=>$image
        ];
        $response=$this->post('/channel/store',$data);
        $this->assertDatabaseCount('channels',1);
        Storage::disk('channelCover')->assertExists($image->hashName());
        $response->assertRedirect(RouteServiceProvider::HOME);
    }

    public function test_channel_data_can_be_rendered_in_channel_page()
    {
       $channel=Channel::factory()->create();
       $response=$this->get("/channel/show/$channel->id");
       $response->assertViewIs('channel.show')
                ->assertViewHas('channel.create',function(Channel $channel){
                    return $channel;
                });
    }

    public function test_channel_can_be_edited()
    {
       $user=User::factory()->create();
       $this->actingAs($user);
       $channel=Channel::factory()->create(['user_id'=>$user->id]);
       $response=$this->get("/channel/$channel->id/edit");
       $response->assertViewIs('channel.edit')
                ->assertViewHas('channel.edit',function(Channel $channel){
                    return $channel;
                });
    }

    public function test_profile_can_be_updated()
    {
        $user=User::factory()->create();
        $this->actingAs($user);
        $channel=Channel::factory()->create(['user_id'=>$user->id,'name'=>'original name']);
        $response=$this->get("/channel/$channel->id/update",['name'=>'updated name']);
        $this->assertEquals($channel->name,'updated name');
        $response->assertViewIs('channel.show')
                 ->assertViewHas('channel.show',function(Channel $channel){
                    return $channel;
                 });
    }

    public function test_channel_can_be_deleted()
    {
        $user=User::factory()->create();
        $this->actingAs($user);
        $channel=Channel::factory()->create(['user_id'=>$user->id]);
        $response=$this->delete("/channel/$channel->id/delete",$channel->id);
        $response->assertOk();
        $this->assertCount('channels',0);
    }

    public function test_checks_user_subscrbed_or_not_subscribed_a_channel()
    {
        $user=User::factory()->create();
        $this->actingAs($user);
        $channel=Channel::factory()->create();
        $response=$this->get("/channel/subscribe",[
            'channelId'=>$channel->id,
            'userId'=>$user->id
        ]);
        $response->assertExatJson([
            'subscribed'=>false
        ]);
        $channel->users()->attach($user->id);
        $response=$this->get("/channel/subscribe",[
            'channelId'=>$channel->id,
            'userId'=>$user->id
        ]);
        $response->assertExatJson([
            'subscribed'=>true
        ]);
    }

    public function test_authenticated_user_can_subscribe_channel()
    {
        $channelOwner=User::factory()->create();
        $this->actingAs($user);
        $channel=Channel::factory()->create(['user_id'=>$channelOwner]);
        $user=User::factory()->create();
        $response=$this->post('/channel/subscribe',[
            'userId'=>$user->id,
            'channelId'=>$channel->id
        ]);
        // assert user can subscribe
        $response->assertOk();
        $this->assertDatabaseCount('channel_user',1);
        Notification::fake();
        Notification::assertSentTo($channelOwner,NewSubscriber::class);
        //assert user subscrier can unsubscribe
        $response=$this->post('/channel/subscribe',[
            'userId'=>$user->id,
            'channelId'=>$channel->id
        ]);
        $response->assertOk();
        $this->assertDatabaseCount('channel_user',0);
    }

    public function test_channel_videos_can_be_returned()
    {
        $channel=Channel::factory()->create();
        $videos=Video::factory(5)->create(['channel_id'=>$channel->id]);
        $response=$this->get("/channel/videos",['channelId'=>$channel->id]);
        $response->assertjson([
            'videos'=>$videos
        ]);
    }

    public function test_channel_playlist_page_can_be_rendered_with_playlists()
    {
        $channel=Channel::factory()->create();
        $videos=Video::factory(5)->create(['channel_id'=>$channel->id]);
        $response=$this->get('/channel/playlsts',['id'=>$channel->id]);
        $response->assertViewIs('channel.playlists')
                 ->assertViewHas('channel.playlists',function($videos){
                    return $videos;
                 });
    }

    public function test_channel_community_page_can_be_rendered()
    {
        $channel=Channel::factory()->create();
        $videos=Video::factory(5)->create(['channel_id'=>$channel->id]);
        $response=$this->get('/channel/community',['id'=>$channel->id]);
        $response->assertViewIs('channel.community');
    }

    public function test_channel_about_page_can_be_rendered()
    {
        $channel=Channel::factory()->create();
        $videos=Video::factory(5)->create(['channel_id'=>$channel->id]);
        $response=$this->get('/channel/community',['id'=>$channel->id]);
        $response->assertViewIs('channel.community');
    }

    public function test_channel_can_be_searched()
    {
        $channel=Channel::factory()->create();
        $response=$this->get('/channel/search',['id'=>$channel->id]);
        $response->assertViewIs('channel.search')
                 ->assertViewHas('channel.search',function($c){
                    return $channel=$c;
                 });
    }
}

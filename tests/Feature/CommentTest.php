<?php

namespace Tests\Feature;

use App\Models\Comment;
use App\Models\User;
use App\Models\Video;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class CommentTest extends TestCase
{
    /**
     * A basic feature test example.
     *
     * @return void
     */
    use RefreshDatabase;

    public function test_authenticated_user_can_comment_on_video()
    {
        $user=User::factory()->create();
        $this->actingAs($user);
        $video=Video::factory()->create();
        $data=[
          'userId'=>$user->id,
          'videoId'=>$video->id,
          'body'=>'nice video subscribed!'
        ];
        $response = $this->post('/comment/store',$data);
        $this->assertDatabaseCount('comments',0);
        $response->assertOk()
                 ->assertJsonFragment([
                    'comment'=>[
                        'user_id'=>$user->id,
                        'video_id'=>$video->id,
                        'body'=>'nice video subscribed!'
                    ]
                 ]);
    }

    public function test_user_can_update_comment()
    {
        $user=User::factory()->create();
        $this->actingAs($user);
        $comment=Comment::factory()->create(['user_id'=>$user->id,'body'=>'original comment']);
        $body='comment updated';
        $response = $this->patch('/comment/update',['commentId'=>$comment->id,'body'=>$body]);
        $response->assertOk();
        $this->assertEquals($comment->body,$body);
    }

    public function test_user_can_delete_comment()
    {
        $user=User::factory()->create();
        $this->actingAs($user);
        $comment=Comment::factory()->create(['user_id'=>$user->id]);
        $response=$this->delete('/comment/delete',['commentId'=>$comment->id]);
        $response->assertOk();
        $this->assertDatabaseCount('comments',0);
    }

    public function test_user_can_like_comment()
    {
        $user=User::factory()->create();
        $this->actingAs($user);
        $comment=Comment::factory()->create();
        $response=$this->post('/comment/like',['userId'=>$user->id,'commentId'=>$comment->id]);
        $response->assertOk();
        $this->assertDatabaseCount('comment_user',1);
    }

}

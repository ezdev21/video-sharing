<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class UserNotificationTest extends TestCase
{
    /**
     * A basic feature test example.
     *
     * @return void
     */
    public function test_auhtenticated_user_can_get_database_notifications()
    {
        $user=User::factory()->create(['id'=>1]);
        $this->actingAs($user);
        $response=$this->get('/notifications');
        $response->assertOk()
                 ->assertJsonStructure([
                   'notifications'
                 ]);
    }

    public function test_auhtenticated_user_can_mark_as_read_notification()
    {
        $user=User::factory()->create(['id'=>1]);
        $this->actingAs($user);
        $response=$this->get('/notification/read');
        $response->assertOk();
    }
}

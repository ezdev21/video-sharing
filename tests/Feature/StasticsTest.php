<?php

namespace Tests\Feature;

use App\Models\Channel;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class StasticsTest extends TestCase
{
    /**
     * A basic feature test example.
     *
     * @return void
     */
    public function test_stastics_page_can_be_rendered()
    {
        $response = $this->get('/stastics');
        $response->assertStatus(200)
                 ->assertViewIs('stastics.index');
    }

    public function assert_channel_stastics_page_can_be_rendered()
    {
        $channel=Channel::factory()->create();
        $response = $this->get("/stastics/$channel->id");
        $response->assertStatus(200)
                 ->assertViewIs('stastics.show');
    }
}

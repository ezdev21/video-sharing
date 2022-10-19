<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use Tests\Feature\RefreshDatabase;

class AuthTest extends TestCase
{

    public function setup()
    {
        parent::setup();
        $this->withoutExceptionHandling();
    }

    public function test_user_can_register_with_valid_data()
    {
        $data=[
            'name'=>'taylor otwell',
            'email'=>'taylor@laravel.com',
            'password'=>'12345678',
            'confirmation_password'=>'12345678'
        ];
        $response = $this->post('/register');

        $response->assertStatus(200);
    }

    public function test_email_should_be_valid_when_user_registers()
    {
        $data=[
            'name'=>'taylor otwell',
            'email'=>'random_text',
            'password'=>'12345678',
            'confirmation_password'=>'12345678'
        ];
        $response = $this->post('/register');

        $response->assertStatus(500);
    }

    public function test_email_attribute_should_be_unique_when_user_registers()
    {
        $user=User::factory()->create();
        $data=[
            'name'=>'taylor otwell',
            'email'=>$user->email,
            'password'=>'12345678',
            'confirmation_password'=>'12345678'
        ];
        $response = $this->post('/register');

        $response->assertStatus(500);
    }

    public function test_password_attribute_length_should_be_greater_or_equal_to_8()
    {
        $data=[
            'name'=>'taylor otwell',
            'email'=>'taylor@laravel.com',
            'password'=>'1234567',
            'confirmation_password'=>'1234567'
        ];
        $response = $this->post('/register');

        $response->assertStatus(500);
    }

    public function test_password_and_confirmation_password_attributes_should_be_similar_when_user_registeres()
    {
        $data=[
            'name'=>'taylor otwell',
            'email'=>'taylor@laravel.com',
            'password'=>'password',
            'confirmation_password'=>'another_password'
        ];
        $response = $this->post('/register');

        $response->assertStatus(500);
    }

    public function test_user_can_login_with_valid_credentials()
    {
        $user=User::factory()->create();
        $response = $this->post('/login',[
            'email'=>$user->email,
            'password'=>$user->password
        ]);
        $response->assertStatus(200);
    }

    public function test_user_can_reset_password()
    {
        $user=User::factory()->create();
        $response=$this->post('/password/reset',[
            'email'=>$user->email
        ]);
        $resposne->assertOk();
    }

    public function test_authenticated_user_redirected_when_visiting_register_page()
    {
       $user=User::factory()->create();
       $this->actingAs($user);
       $res=$this->get('/register');
       $res->assertRedirect('/home');
    }

    public function test_authenticated_user_redirected_when_visiting_password_reset_page()
    {
       $user=User::factory()->create();
       $this->actingAs($user);
       $res=$this->get('/register');
       $res->assertRedirect('/home');
    }
}

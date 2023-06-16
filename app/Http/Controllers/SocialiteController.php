<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Laravel\Socialite\Facades\Socialite;

class SocialiteController extends Controller
{
    public function redirect($provider)
    {
        return Socialite::driver($provider)->redirect();
    }

    public function callback($provider)
    {
        $socialiteUser = Socialite::driver($provider)->user();
        $user = User::updateOrCreate([
            'provider' => $provider,
            'provider_id' => $socialiteUser->id,
        ], [
            'name' => $socialiteUser->name,
            'email' => $socialiteUser->email,
            'provider_token' => $socialiteUser->token,
            'provider_refresh_token' => $socialiteUser->refreshToken,
        ]);
        Auth::login($user);
        return redirect('/dashboard');
    }
}

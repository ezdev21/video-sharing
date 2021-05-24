<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Channel extends Model
{
    use HasFactory;

    public function user()
    {
        return $this->belongsTo(User::class);
    }
    public function subscribes()
    {
        return $this->belongsToMany(User::class);
    }
    public function videos()
    {
      return $this->hasMany(Video::class);
    }
    public function playlists()
    {
        return $this->hasMany(Playlist::class);
    }
}

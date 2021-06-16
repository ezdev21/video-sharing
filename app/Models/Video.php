<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Video extends Model
{
    use HasFactory;

     protected $guarded=[];
     
    public function channel()
    {
        return $this->belongsTo(Channel::class);
    }
    public function comments()
    {
        return $this->hasMany(Comment::class);
    }
    public function likes()
    {
        return $this->belongsToMany(User::class);
    }
    public function playlists()
    {
        return $this->belongsToMany(Playlist::class);
    }
}

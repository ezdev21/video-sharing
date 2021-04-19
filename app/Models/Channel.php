<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Channel extends Model
{
    use HasFactory;

    public function owner()
    {
        return $this->hasOne(User::class);
    }
    public function subscribers()
    {
        return $this->belongsToMany(User::class);
    }
    public function videos()
    {

    }
}

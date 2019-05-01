<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class PostAttachment extends Model
{

    protected $fillable = [
        'post_id', 'attachment',
    ];

    public function post()
    {
        return $this->belongsTo('App\Post');
    }
}

<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'store_id', 'description', 'image_path'
    ];

    public function store()
    {
        return $this->belongsTo('App\Store');
    }

    public function attachments()
    {
        return $this->hasMany('App\PostAttachment');
    }
}

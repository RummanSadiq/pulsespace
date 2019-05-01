<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Review extends Model
{
    protected $fillable = [
        "user_id", "store_id", "rating", "description"
    ];

    public function user()
    {
        return $this->belongsTo('App\User');
    }
    
    public function store()
    {
        return $this->belongsTo('App\Store');
    }
}

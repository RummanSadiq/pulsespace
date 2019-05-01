<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    protected $fillable = [
        "name", "default_picture", "parent_id"
    ];

    public function products() 
    {
        return $this->hasMany('App\Product');
    }
}

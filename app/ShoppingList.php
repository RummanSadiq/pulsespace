<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ShoppingList extends Model
{
    protected $fillable = [
        "user_id", "name"
    ];

    public function products() 
    {
        return $this->belongsToMany('App\Product', 'list_items');
    }
}

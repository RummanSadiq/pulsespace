<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'store_id', 'name', 'description', 'display_picture', 'price', 'category_id',
    ];

    public function store()
    {
        return $this->belongsTo('App\Store');
    }

    public function category()
    {
        return $this->belongsTo('App\Category');
    }

    public function shoppingLists()
    {
        return $this->belongsToMany('App\ShoppingList', 'list_items');
    }

    public function promotion()
    {
        return $this->hasOne('App\Promotion');
    }

    public function attachments()
    {
        return $this->hasMany('App\PostAttachment');
    }

    public function reviews()
    {
        return $this->hasMany('App\ProductReview');
    }
}

<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Store extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'user_id',
        'store_type_id',
        'address_id',
        'name',
        'contact',
        'display_picture',
        'wifi',
        'try_room',
        'card_payment',
        'wheel_chair',
        'wash_room',
        'delivery',
        'return_policy',
        'open_time',
        'close_time',
    ];

    public function user()
    {
        return $this->belongsTo('App\User');
    }

    public function address()
    {
        return $this->hasOne('App\Address');
    }

    public function products()
    {
        return $this->hasMany('App\Product');
    }

    public function attachments()
    {
        return $this->hasMany('App\ShopAttachment', 'shop_id');
    }

    public function storeType()
    {
        return $this->belongsTo('App\StoreType');
    }

    public function storeFollowers()
    {
        return $this->hasMany('App\StoreFollower');
    }

    public function reviews()
    {
        return $this->hasMany('App\Review');
    }

    public function posts()
    {
        return $this->hasMany('App\Post');
    }

    public function faqs()
    {
        return $this->hasMany('App\Faq');
    }
}

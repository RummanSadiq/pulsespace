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
        'shop_id', 'name', 'description', 'price', 'sale_price', 'category_id', 'sale_starts_at', 'sale_ends_at', 'is_active'
    ];

    public function shop()
    {
        return $this->belongsTo('App\Shop');
    }

    public function category()
    {
        return $this->belongsTo('App\Category');
    }
}

<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ShopAttachment extends Model
{
    protected $fillable = [
        'shop_id', 'name', 'url'
    ];

    public function shop()
    {
        return $this->belongsTo('App\Store');
    }
}

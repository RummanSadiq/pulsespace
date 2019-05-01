<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ProductAttachment extends Model
{
    protected $fillable = [
        'product_id', 'attachment',
    ];

    public function product()
    {
        return $this->belongsTo('App\Product');
    }
}

<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Promotion extends Model
{
    protected $fillable = [
        "product_id", "discount", "end"
    ];

    public function product() 
    {
        return $this->belongsTo('App\Product');
    }
}

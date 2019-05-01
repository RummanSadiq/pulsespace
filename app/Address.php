<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Address extends Model
{
    protected $fillable = [
        "place", "latitude", "longitude", "zip", "city", "country"
    ];

    public function store() 
    {
        return $this->belongsTo('App\Store');
    }
}

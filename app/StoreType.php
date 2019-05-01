<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class StoreType extends Model
{
    protected $fillable = ["name"];

    public function stores()
    {
        return $this->hasMany('App\Store');
    }
}

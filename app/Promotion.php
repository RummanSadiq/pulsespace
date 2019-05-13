<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Promotion extends Model
{
    protected $fillable = [
        "shop_id", "package_name", "ends_at", "is_active"
    ];
}

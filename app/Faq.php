<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Faq extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'store_id', 'question', 'answer',
    ];

    public function store()
    {
        return $this->belongsTo('App\Store');
    }
}

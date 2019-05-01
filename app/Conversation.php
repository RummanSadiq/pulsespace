<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Conversation extends Model
{
    protected $fillable = [
        "first_participant_id", "second_participant_id", "first_participant_type", "second_participant_type", "last_sender_id",  "last_message", "msg_read"
    ];

    public function messages() 
    {
        return $this->hasMany('App\Message');
    }

    public function user()
    {
        return $this->belongsTo('App\User');
    }

}

<?php

namespace App;

use Illuminate\Notifications\Notifiable;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    use Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email', 'password', 'date_of_birth'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function store()
    {
        return $this->hasOne('App\Store');
    }

    public function messages()
    {
        return $this->hasMany('App\Message');
    }

    public function reviews()
    {
        return $this->hasMany('App\Review');
    }

    public function productReviews()
    {
        return $this->hasMany('App\ProductReview');
    }

    public function shoppingLists()
    {
        return $this->hasMany('App\ShoppingList');
    }

    public function storeFollowers()
    {
        return $this->hasMany('App\StoreFollower');
    }

    public function firstParticipantConversations()
    {
        return $this->hasMany('App\Conversation', 'first_participant_id');
    }

    public function secondParticipantConversations()
    {
        return $this->hasMany('App\Conversation', 'second_participant_id');
    }

    public function shopConversations()
    {
        return $this->firstParticipantConversations->where('first_participant_type', '1')
            ->merge($this->secondParticipantConversations->where('second_participant_type', '1'));
    }

    public function customerConversations()
    {
        return $this->firstParticipantConversations->where('first_participant_type', '0')
            ->merge($this->secondParticipantConversations->where('second_participant_type', '0'));
    }
}

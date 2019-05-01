<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateStoresTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('stores', function (Blueprint $table) {
            $table->increments('id');

            // Store Owner
            $table->integer('user_id')->unsigned();
            $table->foreign('user_id')->references('id')->on('users');

            $table->integer('store_type_id')->unsigned();
            $table->foreign('store_type_id')->references('id')->on('store_types');

            $table->integer('address_id')->unsigned()->nullable();
            $table->foreign('address_id')->references('id')->on('addresses');

            $table->string('name');
            $table->string('contact')->nullable();
            $table->string('display_picture')->nullable();
            $table->boolean('wifi')->nullable();
            $table->boolean('try_room')->nullable();
            $table->boolean('card_payment')->nullable();
            $table->boolean('wheel_chair')->nullable();
            $table->boolean('wash_room')->nullable();
            $table->boolean('delivery')->nullable();

            $table->string('return_policy')->nullable();

            $table->time('open_time')->nullable();
            $table->time('close_time')->nullable();
            
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('stores');
    }
}

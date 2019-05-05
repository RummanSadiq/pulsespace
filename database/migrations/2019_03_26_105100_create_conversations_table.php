<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateConversationsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('conversations', function (Blueprint $table) {
            $table->increments('id');

            $table->integer('first_participant_id')->unsigned();
            $table->foreign('first_participant_id')->references('id')->on('users');

            $table->integer('second_participant_id')->unsigned();
            $table->foreign('second_participant_id')->references('id')->on('users');

            $table->boolean('first_participant_type');
            $table->boolean('second_participant_type');

            $table->integer('last_sender_id')->unsigned()->nullable();
            $table->foreign('last_sender_id')->references('id')->on('users');

            $table->text('last_message')->nullable();
            $table->boolean('msg_read')->nullable();

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
        Schema::dropIfExists('conversations');
    }
}

<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Eloquent\SoftDeletes;

class CreateUsersTable extends Migration
{

  use SoftDeletes;

  public function up()
  {
    Schema::create('users', function (Blueprint $table) {
      $table->id();
      $table->string('name');
      $table->string('lastname');
      $table->string('email')->unique();
      $table->string('google_id')->nullable();
      $table->string('password');
      $table->timestamp('email_verified_at')->nullable();
      $table->rememberToken();
      $table->dateTime('deleted_at')->nullable();
      $table->timestamps();
    });
  }

  public function down()
  {
    Schema::dropIfExists('users');
  }
}

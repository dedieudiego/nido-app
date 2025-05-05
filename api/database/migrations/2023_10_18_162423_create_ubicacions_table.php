<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUbicacionsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('ubicaciones', function (Blueprint $table) {
            $table->increments('id');
            $table->string('city');
            $table->string('country');
            $table->decimal('latitude',12,9);
            $table->decimal('longitude',12,9);
            $table->string('postalCode');
            $table->string('region');
            $table->string('subregion');
            $table->integer('nido_id')->unsigned();
            $table->foreign('nido_id')->references('id')->on('nidos');


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
        Schema::dropIfExists('ubicaciones');
    }
}

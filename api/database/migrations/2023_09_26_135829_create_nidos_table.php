<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateNidosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('nidos', function (Blueprint $table) {
            $table->increments('id');
            $table->string('actividad');
            $table->decimal('altura', 8, 2);
            $table->string('contexto');
            $table->integer('estadio');
            $table->string('fuente');
            $table->string('lluvia');
            $table->string('tipoDeFuente');
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
        Schema::dropIfExists('nidos');
    }
}

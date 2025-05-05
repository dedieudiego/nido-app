<?php

namespace App;

use App\Foto;
use App\Ubicacion;

use Illuminate\Database\Eloquent\Model;

class Nido extends Model
{
  protected $fillable = [
    'actividad',
    'altura',
    'contexto',
    'estadio',
    'fuente',
    'lluvia',
    'tipoDeFuente',
  ];


  public function foto()
  {
    return $this->hasOne(Foto::class);
  }

  public function ubicacion()
  {
    return $this->hasOne(Ubicacion::class);
  }
}

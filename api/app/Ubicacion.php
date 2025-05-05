<?php

namespace App;
use App\Nido;


use Illuminate\Database\Eloquent\Model;

class Ubicacion extends Model
{
    protected $table = 'ubicaciones';

    protected $fillable = [
        'city',
        'country',
        'latitude',
        'longitude',
        'postalCode',
        'region',
        'subregion',
        'nido_id',
    ];


    public function nido()
    {
        return $this->belongsTo(Nido::class);
    }
}

<?php

namespace App;
use App\Nido;

use Illuminate\Database\Eloquent\Model;

class Foto extends Model
{
    protected $fillable = [
        'uri',
        'width',
        'height',
        'nido_id',
    ];


    public function nido()
    {
        return $this->belongsTo(Nido::class);
    }
}

<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class PassReset extends Model
{
    protected $table = 'password_resets';

    protected $primaryKey = 'id';

    protected $fillable = [
        'email', 'token', 'updated_at'
    ];

    protected $casts = [
        'created_at' => 'datetime',
        'updated_at' => 'datetime'
    ];
}

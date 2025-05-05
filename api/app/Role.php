<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\User;

class Role extends Model
{

    protected $table = 'roles';

    protected $primaryKey = 'id';

    protected $fillable = [
        'name',
        'guard_name',
    ];

    public function users(){
        return $this->belongsToMany(User::class)->withTimestamps();
    }
}

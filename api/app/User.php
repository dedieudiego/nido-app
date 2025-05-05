<?php

namespace App;


use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Tymon\JWTAuth\Contracts\JWTSubject;
use Spatie\Permission\Traits\HasRoles;
use Illuminate\Database\Eloquent\SoftDeletes;

class User extends Authenticatable implements JWTSubject
{
  use Notifiable;
  use HasRoles;
  use SoftDeletes;

  protected $fillable = [
    'name', 'lastname', 'email', 'password', 'google_id'
  ];

  protected $hidden = [
    'password', 'remember_token', 'google_id', 'created_at', 'updated_at', 'email_verified_at'
  ];

  protected $dates = ['deleted_at'];

  protected $casts = [
    'email_verified_at' => 'datetime',
  ];

  public function getJWTIdentifier()
  {
    return $this->getKey();
  }

  public function getJWTCustomClaims()
  {
    return [];
  }

  public function authorizeRoles($roles)
  {
    if ($this->hasAnyRole($roles)) {
      return true;
    }
    abort(401, 'Unauthorized action.');
  }

  public function hasAnyRole($roles)
  {
    if (is_array($roles)) {
      foreach ($roles as $role) {
        if ($this->hasRole($role)) {
          return true;
        }
      }
    } else {
      if ($this->hasRole($roles)) {
        return true;
      }
    }
    return false;
  }

  public function hasRole($role)
  {
    if ($this->roles()->where('name', $role)->first()) {
      return true;
    }
    return false;
  }
}

<?php

use Illuminate\Database\Seeder;

use App\User;
use App\Role;

class UserSeeder extends Seeder
{

  public function run()
  {
    $role_admin = Role::where('name', 'administrator')->first();
    $role_user = Role::where('name', 'customer')->first();

    $user = User::create([
      'name' => 'Admin',
      'lastname' => 'Example',
      'email' => 'admin@example.com',
      'password' => bcrypt('horneros')
    ]);
    $user->roles()->attach($role_admin);

    $user = User::create([
      'name' => 'User',
      'lastname' => 'Example',
      'email' => 'user@example.com',
      'password' => bcrypt('horneros')
    ]);
    $user->roles()->attach($role_user);
  }
}

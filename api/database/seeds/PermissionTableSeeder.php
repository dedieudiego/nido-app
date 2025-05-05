<?php

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;


class PermissionTableSeeder extends Seeder
{
    
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $permissions = [
           'role-list',
           'role-create',
           'role-edit',
           'role-delete',
        ];

        foreach ($permissions as $permission) {
            Permission::create(['name' => $permission]);
        }

        $roles = [
            'administrator',
            'customer',
            'manager',
        ];

        foreach ($roles as $role) {
            Role::firstOrCreate(['name' => $role]);
        }

    }
}

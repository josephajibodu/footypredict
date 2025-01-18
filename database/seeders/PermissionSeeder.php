<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Str;
use ReflectionClass;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;
use Spatie\Permission\PermissionRegistrar;

class PermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Role::query()->updateOrCreate([
            'name' => 'Super Admin'
        ]);

        /** @var Role $admin */
        $admin = Role::query()->updateOrCreate([
            'name' => 'Admin'
        ]);

        $adminPanelAccess = Permission::query()->updateOrCreate(
            ['name' => 'admin_dashboard.access'],
            ['group' => 'Dashboard']
        );

        $admin->givePermissionTo($adminPanelAccess);

        $policiesPath = app_path('Policies');
        $policies = File::allFiles($policiesPath);

        foreach ($policies as $policy) {
            $policyClass = 'App\\Policies\\'.Str::replaceLast('.php', '', $policy->getFilename());
            $model = Str::replaceLast('Policy', '', class_basename($policyClass));

            if (! class_exists($policyClass)) {
                continue;
            }

            $reflector = new ReflectionClass($policyClass);
            $methods = $reflector->getMethods();

            foreach ($methods as $method) {
                if ($method->isPublic() && ! in_array($method->name, ['__construct', 'viewAny', 'restore', 'forceDelete'])) {
                    $permissionName = strtolower($model).'.'.$method->name;

                    $permission = Permission::query()->updateOrCreate(
                        ['name' => $permissionName],
                        ['group' => $model]
                    );

                    $admin->givePermissionTo($permission);
                }
            }
        }

        app()->make(PermissionRegistrar::class)->forgetCachedPermissions();
    }
}

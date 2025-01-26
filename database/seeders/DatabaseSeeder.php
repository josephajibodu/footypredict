<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $user = User::factory()->create([
            'first_name' => 'John',
            'last_name' => 'Doe',
            'email' => 'joseph@footypredict.test',
        ]);

        $user->credit(1000, 'Registration bonus');

        $this->call([
            LeagueSeeder::class,
            TeamSeeder::class,
            SportEventSeeder::class,
            PermissionSeeder::class,
            SingleUserBetSeeder::class,
        ]);
    }
}

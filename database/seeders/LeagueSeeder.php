<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class LeagueSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $leagues = [
            [
                'name' => 'English Premier League',
                'short_code' => 'EPL',
                'logo_url' => 'https://upload.wikimedia.org/wikipedia/en/f/f2/Premier_League_Logo.svg',
                'country' => 'England',
            ],
            [
                'name' => 'La Liga',
                'short_code' => 'LALIGA',
                'logo_url' => 'https://upload.wikimedia.org/wikipedia/en/7/7f/LaLiga_Santander_logo.svg',
                'country' => 'Spain',
            ],
            [
                'name' => 'Serie A',
                'short_code' => 'SERIEA',
                'logo_url' => 'https://upload.wikimedia.org/wikipedia/en/e/e1/Serie_A_logo_%282019%29.svg',
                'country' => 'Italy',
            ],
            [
                'name' => 'Bundesliga',
                'short_code' => 'BUNDES',
                'logo_url' => 'https://upload.wikimedia.org/wikipedia/commons/d/df/Bundesliga_logo_%282017%29.svg',
                'country' => 'Germany',
            ],
            [
                'name' => 'Ligue 1',
                'short_code' => 'LIGUE1',
                'logo_url' => 'https://upload.wikimedia.org/wikipedia/en/5/5e/Ligue1.svg',
                'country' => 'France',
            ],
        ];

        DB::table('leagues')->insert($leagues);
    }
}

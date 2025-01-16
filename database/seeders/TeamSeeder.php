<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class TeamSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $teams = [
            [
                'name' => 'Arsenal',
                'short_name' => 'Arsenal',
                'short_code' => 'ARS',
                'logo_url' => 'https://upload.wikimedia.org/wikipedia/en/5/53/Arsenal_FC.svg',
                'country' => 'England',
            ],
            [
                'name' => 'Aston Villa',
                'short_name' => 'Villa',
                'short_code' => 'AVL',
                'logo_url' => 'https://upload.wikimedia.org/wikipedia/de/9/9f/Aston_Villa_logo.svg',
                'country' => 'England',
            ],
            [
                'name' => 'Bournemouth',
                'short_name' => 'Bournemouth',
                'short_code' => 'BOU',
                'logo_url' => 'https://upload.wikimedia.org/wikipedia/de/4/41/Afc_bournemouth.svg',
                'country' => 'England',
            ],
            [
                'name' => 'Brentford',
                'short_name' => 'Brentford',
                'short_code' => 'BRE',
                'logo_url' => 'https://upload.wikimedia.org/wikipedia/en/2/2a/Brentford_FC_crest.svg',
                'country' => 'England',
            ],
            [
                'name' => 'Brighton & Hove Albion',
                'short_name' => 'Brighton',
                'short_code' => 'BHA',
                'logo_url' => 'https://upload.wikimedia.org/wikipedia/en/f/fd/Brighton_%26_Hove_Albion_logo.svg',
                'country' => 'England',
            ],
            [
                'name' => 'Leicester City',
                'short_name' => 'Leicester',
                'short_code' => 'LEI',
                'logo_url' => 'https://upload.wikimedia.org/wikipedia/en/thumb/2/2d/Leicester_City_crest.svg/1920px-Leicester_City_crest.svg.png',
                'country' => 'England',
            ],
            [
                'name' => 'Chelsea',
                'short_name' => 'Chelsea',
                'short_code' => 'CHE',
                'logo_url' => 'https://upload.wikimedia.org/wikipedia/en/c/cc/Chelsea_FC.svg',
                'country' => 'England',
            ],
            [
                'name' => 'Crystal Palace',
                'short_name' => 'Palace',
                'short_code' => 'CRY',
                'logo_url' => 'https://upload.wikimedia.org/wikipedia/en/thumb/a/a2/Crystal_Palace_FC_logo_%282022%29.svg/350px-Crystal_Palace_FC_logo_%282022%29.svg.png',
                'country' => 'England',
            ],
            [
                'name' => 'Everton',
                'short_name' => 'Everton',
                'short_code' => 'EVE',
                'logo_url' => 'https://upload.wikimedia.org/wikipedia/en/7/7c/Everton_FC_logo.svg',
                'country' => 'England',
            ],
            [
                'name' => 'Fulham',
                'short_name' => 'Fulham',
                'short_code' => 'FUL',
                'logo_url' => 'https://upload.wikimedia.org/wikipedia/en/thumb/e/eb/Fulham_FC_%28shield%29.svg/1920px-Fulham_FC_%28shield%29.svg.png',
                'country' => 'England',
            ],
            [
                'name' => 'Liverpool',
                'short_name' => 'Liverpool',
                'short_code' => 'LIV',
                'logo_url' => 'https://upload.wikimedia.org/wikipedia/en/0/0c/Liverpool_FC.svg',
                'country' => 'England',
            ],
            [
                'name' => 'Luton Town',
                'short_name' => 'Luton',
                'short_code' => 'LUT',
                'logo_url' => 'https://upload.wikimedia.org/wikipedia/en/thumb/9/9d/Luton_Town_logo.svg/1920px-Luton_Town_logo.svg.png',
                'country' => 'England',
            ],
            [
                'name' => 'Manchester City',
                'short_name' => 'Man City',
                'short_code' => 'MCI',
                'logo_url' => 'https://upload.wikimedia.org/wikipedia/en/e/eb/Manchester_City_FC_badge.svg',
                'country' => 'England',
            ],
            [
                'name' => 'Manchester United',
                'short_name' => 'Man United',
                'short_code' => 'MUN',
                'logo_url' => 'https://upload.wikimedia.org/wikipedia/en/7/7a/Manchester_United_FC_crest.svg',
                'country' => 'England',
            ],
            [
                'name' => 'Newcastle United',
                'short_name' => 'Newcastle',
                'short_code' => 'NEW',
                'logo_url' => 'https://upload.wikimedia.org/wikipedia/en/5/56/Newcastle_United_Logo.svg',
                'country' => 'England',
            ],
            [
                'name' => 'Nottingham Forest',
                'short_name' => 'Forest',
                'short_code' => 'NFO',
                'logo_url' => 'https://upload.wikimedia.org/wikipedia/en/thumb/e/e5/Nottingham_Forest_F.C._logo.svg/1024px-Nottingham_Forest_F.C._logo.svg.png',
                'country' => 'England',
            ],
            [
                'name' => 'Southampton',
                'short_name' => 'Southampton',
                'short_code' => 'SOU',
                'logo_url' => 'https://upload.wikimedia.org/wikipedia/en/thumb/c/c9/FC_Southampton.svg/1920px-FC_Southampton.svg.png',
                'country' => 'England',
            ],
            [
                'name' => 'Tottenham Hotspur',
                'short_name' => 'Spurs',
                'short_code' => 'TOT',
                'logo_url' => 'https://upload.wikimedia.org/wikipedia/en/b/b4/Tottenham_Hotspur.svg',
                'country' => 'England',
            ],
            [
                'name' => 'West Ham United',
                'short_name' => 'West Ham',
                'short_code' => 'WHU',
                'logo_url' => 'https://upload.wikimedia.org/wikipedia/en/c/c2/West_Ham_United_FC_logo.svg',
                'country' => 'England',
            ],
            [
                'name' => 'Wolverhampton Wanderers',
                'short_name' => 'Wolves',
                'short_code' => 'WOL',
                'logo_url' => 'https://upload.wikimedia.org/wikipedia/en/f/fc/Wolverhampton_Wanderers.svg',
                'country' => 'England',
            ],
        ];

        DB::table('teams')->insert($teams);
    }
}

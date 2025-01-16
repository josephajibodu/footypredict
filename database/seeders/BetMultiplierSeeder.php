<?php

namespace Database\Seeders;

use App\Settings\BetSetting;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class BetMultiplierSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $betSettings = app(BetSetting::class);

        $sampleConfig = config('bet-multiplier');

        $betSettings->selection_config = $sampleConfig;
        $betSettings->save();
    }
}

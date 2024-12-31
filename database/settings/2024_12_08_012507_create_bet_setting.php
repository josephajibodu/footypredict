<?php

use Spatie\LaravelSettings\Migrations\SettingsMigration;

return new class extends SettingsMigration
{
    public function up(): void
    {
        $sampleConfig = config('bet-multiplier');

        $this->migrator->add('bet.min_selection', 6);
        $this->migrator->add('bet.max_selection', 6);
        $this->migrator->add('bet.selection_config', $sampleConfig);
        $this->migrator->add('bet.pool_size', 20);
        $this->migrator->add('bet.winning_multiplier', 15);
        $this->migrator->add('bet.min_stake', 1000);
        $this->migrator->add('bet.max_stake', 20_000);
    }
};

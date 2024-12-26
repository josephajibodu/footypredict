<?php

use Spatie\LaravelSettings\Migrations\SettingsMigration;

return new class extends SettingsMigration
{
    public function up(): void
    {
        $this->migrator->add('wallet.minimum_deposit_ngn', 100);
        $this->migrator->add('wallet.minimum_deposit_usdt', 1);
    }
};

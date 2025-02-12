<?php

use Spatie\LaravelSettings\Migrations\SettingsMigration;

return new class extends SettingsMigration
{
    public function up(): void
    {
        $this->migrator->add('wallet.maximum_deposit_ngn', 100_000);
        $this->migrator->add('wallet.maximum_deposit_usdt', 100);

        $this->migrator->add('wallet.maximum_withdrawal_ngn', 20_000);
        $this->migrator->add('wallet.maximum_withdrawal_usdt', 10);
    }
};

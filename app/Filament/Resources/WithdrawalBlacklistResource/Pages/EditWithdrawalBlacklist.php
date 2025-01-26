<?php

namespace App\Filament\Resources\WithdrawalBlacklistResource\Pages;

use App\Filament\Resources\WithdrawalBlacklistResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;

class EditWithdrawalBlacklist extends EditRecord
{
    protected static string $resource = WithdrawalBlacklistResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\DeleteAction::make(),
        ];
    }
}

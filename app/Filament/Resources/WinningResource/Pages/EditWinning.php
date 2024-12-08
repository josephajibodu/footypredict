<?php

namespace App\Filament\Resources\WinningResource\Pages;

use App\Filament\Resources\WinningResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;

class EditWinning extends EditRecord
{
    protected static string $resource = WinningResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\DeleteAction::make(),
        ];
    }
}

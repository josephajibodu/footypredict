<?php

namespace App\Filament\Resources\WinningResource\Pages;

use App\Filament\Resources\WinningResource;
use App\Filament\Resources\WinningResource\Widgets\WinningStatOverview;
use Filament\Actions;
use Filament\Resources\Pages\ListRecords;

class ListWinnings extends ListRecords
{
    protected static string $resource = WinningResource::class;

    protected function getHeaderActions(): array
    {
        return [
            // Actions\CreateAction::make(),
        ];
    }

    protected function getHeaderWidgets(): array
    {
        return [
            WinningStatOverview::class
        ];
    }
}

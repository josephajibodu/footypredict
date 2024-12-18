<?php

namespace App\Filament\Resources\SportEventResource\Pages;

use App\Actions\Matches\CreateMatch;
use App\Actions\Matches\UpdateScores;
use App\Filament\Resources\SportEventResource;
use Exception;
use Filament\Actions;
use Filament\Notifications\Notification;
use Filament\Resources\Pages\EditRecord;
use Illuminate\Database\Eloquent\Model;

class EditSportEvent extends EditRecord
{
    protected static string $resource = SportEventResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\DeleteAction::make(),
        ];
    }
}

<?php

namespace App\Filament\Resources\SportEventResource\Pages;

use App\Actions\Matches\CreateMatch;
use App\Filament\Resources\SportEventResource;
use App\Models\SportEvent;
use Exception;
use Filament\Actions;
use Filament\Notifications\Notification;
use Filament\Resources\Pages\CreateRecord;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Validation\ValidationException;

class CreateSportEvent extends CreateRecord
{
    protected static string $resource = SportEventResource::class;

    protected function handleRecordCreation(array $data): Model
    {
        try {
            return app(CreateMatch::class)($data);
        } catch (Exception $e) {
            Notification::make()
                ->danger()
                ->title('Match cannot be created')
                ->body($e->getMessage())
                ->send();

            $this->halt();
        }
    }
}

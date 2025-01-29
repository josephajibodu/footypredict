<?php

namespace App\Filament\Resources\BetResource\Pages;

use App\Enums\BetStatus;
use App\Filament\Resources\BetResource;
use App\Models\Bet;
use Filament\Actions;
use Filament\Resources\Components\Tab;
use Filament\Resources\Pages\ListRecords;
use Illuminate\Database\Eloquent\Builder;

class ListBets extends ListRecords
{
    protected static string $resource = BetResource::class;

    protected function getHeaderActions(): array
    {
        return [
            // Actions\CreateAction::make(),
        ];
    }

    protected function getHeaderWidgets(): array
    {
        return [
            BetResource\Widgets\BetsOverviewStat::class
        ];
    }

    public function getTabs(): array
    {
        return [
            'all' => Tab::make('All'),
            'pending' => Tab::make('Pending')
                ->badge(Bet::query()->where('status', BetStatus::Pending)->count())
                ->modifyQueryUsing(fn (Builder $query) => $query->where('status', BetStatus::Pending)),
            'settled' => Tab::make('Settled')
                ->modifyQueryUsing(fn (Builder $query) => $query->whereIn('status', [BetStatus::Won, BetStatus::Lost])),
            'voided' => Tab::make('Voided')
                ->modifyQueryUsing(fn (Builder $query) => $query->where('status', BetStatus::Voided)),
        ];
    }

    public function getDefaultActiveTab(): string | int | null
    {
        return 'pending';
    }
}

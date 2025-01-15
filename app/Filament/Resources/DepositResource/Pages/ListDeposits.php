<?php

namespace App\Filament\Resources\DepositResource\Pages;

use App\Enums\TransactionStatus;
use App\Filament\Resources\DepositResource;
use App\Models\Transaction;
use Filament\Actions;
use Filament\Resources\Components\Tab;
use Filament\Resources\Pages\ListRecords;
use Illuminate\Database\Eloquent\Builder;

class ListDeposits extends ListRecords
{
    protected static string $resource = DepositResource::class;

    protected function getHeaderActions(): array
    {
        return [
            // Actions\CreateAction::make(),
        ];
    }

    public function getTabs(): array
    {
        return [
            'all' => Tab::make(),
            'pending' => Tab::make()
                ->badge(Transaction::query()->where('status', TransactionStatus::Pending)->count())
                ->modifyQueryUsing(fn (Builder $query) => $query->where('status', TransactionStatus::Pending)),
            'completed' => Tab::make()
                ->modifyQueryUsing(fn (Builder $query) => $query->where('status', TransactionStatus::Completed)),
            'failed' => Tab::make()
                ->modifyQueryUsing(fn (Builder $query) => $query->where('status', TransactionStatus::Failed)),
            'cancelled' => Tab::make()
                ->modifyQueryUsing(fn (Builder $query) => $query->where('status', TransactionStatus::Cancelled)),
        ];
    }
}

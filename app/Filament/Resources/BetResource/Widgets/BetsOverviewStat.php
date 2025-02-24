<?php

namespace App\Filament\Resources\BetResource\Widgets;

use App\Enums\BetStatus;
use App\Models\Bet;
use Filament\Widgets\StatsOverviewWidget as BaseWidget;
use Filament\Widgets\StatsOverviewWidget\Stat;

class BetsOverviewStat extends BaseWidget
{
    protected function getStats(): array
    {
        $potentialWin = Bet::query()->where('status', BetStatus::Pending)
            ->sum('potential_winnings');

        $totalStake = Bet::query()->where('status', '!=', BetStatus::Voided)
            ->whereDate('created_at', today())
            ->sum('stake');

        $totalPayout = Bet::query()->where('status', BetStatus::Won)
            ->whereDate('created_at', today())
            ->sum('stake');

        return [
            Stat::make('Potential Win', to_money($potentialWin, 100)),
            Stat::make('Total Stake', to_money($totalStake, 100)),
            Stat::make('Total Payout', to_money($totalPayout, 100)),
        ];
    }
}
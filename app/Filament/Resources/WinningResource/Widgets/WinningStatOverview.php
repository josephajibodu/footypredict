<?php

namespace App\Filament\Resources\WinningResource\Widgets;

use App\Enums\BetStatus;
use App\Enums\TransactionStatus;
use App\Enums\TransactionType;
use App\Models\Bet;
use App\Models\Transaction;
use App\Models\Winning;
use Carbon\Carbon;
use Filament\Widgets\StatsOverviewWidget as BaseWidget;
use Filament\Widgets\StatsOverviewWidget\Stat;

class WinningStatOverview extends BaseWidget
{
    protected function getStats(): array
    {
        $totalWinningToday = Transaction::query()
            ->where('type', TransactionType::Winning)
            ->where('status', TransactionStatus::Completed)
            ->whereDay('created_at', today())
            ->sum('amount');

        $totalWinning24Hours = Transaction::query()
            ->where('type', TransactionType::Winning)
            ->where('status', TransactionStatus::Completed)
            ->where('created_at', '>=', Carbon::now()->subDay()) // Last 24 hours
            ->sum('amount');

        $totalWinningYesterday = Transaction::query()
            ->where('type', TransactionType::Winning)
            ->where('status', TransactionStatus::Completed)
            ->whereDay('created_at', today()->subDay())
            ->sum('amount');

        return [
            Stat::make('Total Winning Today', to_money($totalWinningToday, 100)),
            Stat::make('Total Winning Yesterday', to_money($totalWinningYesterday, 100)),
            Stat::make('Total Winning (24 hours)', to_money($totalWinning24Hours, 100)),
        ];
    }
}

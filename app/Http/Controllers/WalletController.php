<?php

namespace App\Http\Controllers;

use App\Enums\TransactionType;
use App\Http\Resources\ApiTransactionResource;
use App\Models\Transaction;
use Illuminate\Database\Eloquent\Builder;
use Inertia\Inertia;

class WalletController extends Controller
{
    public function index()
    {
        $transactions = Transaction::query()
            ->with(['bet', 'deposit', 'refund', 'winning', 'withdrawal'])
            ->where('user_id', auth()->id())
            ->where(function (Builder $query) {
                $query
                    ->orWhere('type', TransactionType::Deposit)
                    ->orWhere('type', TransactionType::Withdrawal)
                    ->orWhere('type', TransactionType::Bet)
                    ->orWhere('type', TransactionType::Winning);
            })
            ->latest()
            ->get();

        return Inertia::render('Wallet', [
            'transactions' => Inertia::defer(fn() => ApiTransactionResource::collection($transactions)),
        ]);
    }
}

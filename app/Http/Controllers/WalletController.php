<?php

namespace App\Http\Controllers;

use App\Enums\TransactionType;
use App\Http\Resources\ApiTransactionResource;
use App\Models\Transaction;
use Inertia\Inertia;

class WalletController extends Controller
{
    public function index()
    {
        $transactions = Transaction::query()
            ->with(['bet', 'deposit', 'refund', 'winning', 'withdrawal'])
            ->where('type', TransactionType::Deposit)
            ->orWhere('type', TransactionType::Withdrawal)
            ->orWhere('type', TransactionType::Bet)
            ->latest()
            ->get();

        return Inertia::render('Wallet', [
            'transactions' => ApiTransactionResource::collection($transactions),
        ]);
    }
}

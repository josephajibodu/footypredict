<?php

namespace App\Http\Controllers;

use App\Enums\TransactionStatus;
use App\Enums\TransactionType;
use App\Http\Resources\ApiTransactionResource;
use App\Models\Transaction;
use Inertia\Inertia;

class TransactionController extends Controller
{
    public function index()
    {
        $transactions = Transaction::query()
            ->where('type', TransactionType::Deposit)
            ->orWhere('type', TransactionType::Withdrawal)
            ->get();

        return Inertia::render('Wallet', [
            'transactions' => ApiTransactionResource::make($transactions),
        ]);
    }

    public function show(Transaction $transaction)
    {
        if ($transaction->type === TransactionType::Deposit
            && $transaction->status === TransactionStatus::Pending) {
            $transaction->load('deposit');

            return Inertia::render('Deposit', [
                'transaction' => ApiTransactionResource::make($transaction),
            ]);
        }

        $transaction->load(['deposit', 'bet', 'withdrawal', 'winning', 'refund']);

        return Inertia::render('TransactionShow', [
            'transaction' => ApiTransactionResource::make($transaction),
        ]);
    }
}

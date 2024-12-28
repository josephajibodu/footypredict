<?php

namespace App\Http\Controllers;

use App\Enums\TransactionType;
use App\Http\Resources\ApiTransactionResource;
use App\Models\Transaction;
use Illuminate\Http\Request;
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
            'transactions' => $transactions
        ]);
    }

    public function show(Transaction $transaction)
    {
        $transaction->load('deposit');

        return Inertia::render('Deposit', [
            'transaction' => ApiTransactionResource::make($transaction)
        ]);
    }
}

<?php

namespace App\Http\Controllers;

use App\Enums\TransactionType;
use App\Models\Transaction;
use Illuminate\Http\Request;
use Inertia\Inertia;

class WalletController extends Controller
{
    public function index()
    {
        $transactions = Transaction::query()
            ->where('type', TransactionType::Deposit)
            ->where('type', TransactionType::Withdrawal)
            ->get();

        return Inertia::render('Wallet', [
            'transactions' => $transactions
        ]);
    }
}

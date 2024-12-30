<?php

namespace App\Actions\Transactions;

use App\Enums\TransactionStatus;
use App\Enums\TransactionType;
use App\Models\Deposit;
use App\Models\Transaction;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;

class InitiateDepositTransaction
{
    public function __invoke(array $data): Transaction
    {
        $validatedData = validator($data, [
            'amount' => ['required', 'numeric', 'min:1'],
            'method' => ['required'],
        ])->validate();

        $user = Auth::user();

        $reference = Str::uuid()->toString();

        $currentBalance = $user->wallet->balance ?? 0;

        $transaction = Transaction::query()->create([
            'user_id' => $user->id,
            'reference' => $reference,
            'description' => 'Funds Deposit',
            'amount' => $validatedData['amount'] * 100,
            'balance' => $currentBalance,
            'type' => TransactionType::Deposit,
            'status' => TransactionStatus::Pending,
        ]);

        Deposit::query()->create([
            'transaction_id' => $transaction->id,
            'method' => $validatedData['method'],
        ]);

        return $transaction->refresh();
    }
}

<?php

namespace App\Actions\Transactions;

use App\Enums\TransactionStatus;
use App\Enums\TransactionType;
use App\Models\Deposit;
use App\Models\Transaction;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;

class CreateDepositTransaction
{
    public function __invoke(array $data): Transaction
    {
        // Validate input
        $validatedData = validator($data, [
            'amount' => ['required', 'numeric', 'min:1'],
            'method' => ['required'],
        ])->validate();

        $user = Auth::user();

        // Generate unique reference
        $reference = Str::uuid()->toString();

        // Calculate new balance (assuming you have logic for fetching user balance)
        $currentBalance = $user->wallet->balance ?? 0;
        $newBalance = $currentBalance + $validatedData['amount'];

        // Create the transaction
        $transaction = Transaction::query()->create([
            'user_id' => $user->id,
            'reference' => $reference,
            'amount' => $validatedData['amount'],
            'balance' => $newBalance,
            'type' => TransactionType::Deposit,
            'status' => TransactionStatus::Pending,
        ]);

        // Create the associated deposit
        Deposit::query()->create([
            'transaction_id' => $transaction->id,
            'method' => $validatedData['method'],
        ]);

        return $transaction;
    }
}
<?php

namespace App\Actions\Transactions;

use App\Enums\Currency;
use App\Enums\TransactionStatus;
use App\Enums\TransactionType;
use App\Models\Transaction;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;

class CreateRefund
{
    public function execute(User $user, float $amount, string $description): Transaction
    {
        $reference = Str::uuid()->toString();

        $user->credit($amount, $description);

        Log::info("Refund to user : $amount");

        $currentBalance = $user->wallet->balance ?? 0;

        $transaction = Transaction::query()->create([
            'user_id' => $user->id,
            'reference' => $reference,
            'description' => 'Bet Refund',
            'amount' => $amount * 100,
            'balance' => $currentBalance,
            'type' => TransactionType::Refunds,
            'status' => TransactionStatus::Completed,
            'currency' => Currency::NGN
        ]);

        // Refund can be used if the winning transaction needs to store more data

        return $transaction->refresh();
    }
}

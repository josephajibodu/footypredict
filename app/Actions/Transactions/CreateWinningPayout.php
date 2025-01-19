<?php

namespace App\Actions\Transactions;

use App\Enums\Currency;
use App\Enums\TransactionStatus;
use App\Enums\TransactionType;
use App\Models\Deposit;
use App\Models\Transaction;
use App\Models\User;
use Exception;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;

class CreateWinningPayout
{
    /**
     * @throws Exception
     */
    public function __invoke(User $user, float $amount, string $description): Transaction
    {
        DB::beginTransaction();

        try {
            $reference = Str::uuid()->toString();

            $user->credit($amount, $description);

            Log::info("Payout to user : $amount");

            $currentBalance = $user->wallet->balance ?? 0;

            $transaction = Transaction::query()->create([
                'user_id' => $user->id,
                'reference' => $reference,
                'description' => 'Bet Winning',
                'amount' => $amount * 100,
                'balance' => $currentBalance,
                'type' => TransactionType::Winning,
                'status' => TransactionStatus::Completed,
                'currency' => Currency::NGN
            ]);

            // Winning can be used if the winning transaction needs to store more data

            DB::commit();

            return $transaction->refresh();
        } catch (Exception $ex) {
            DB::rollBack();
            throw $ex;
        }
    }
}

<?php

namespace App\Actions\Transactions;

use App\Enums\Currency;
use App\Enums\TransactionStatus;
use App\Enums\TransactionType;
use App\Enums\WithdrawalAccountType;
use App\Models\Transaction;
use App\Models\Withdrawal;
use App\Models\WithdrawalAccount;
use Exception;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;
use RuntimeException;
use Throwable;

class InitiateFundWithdrawal
{
    /**
     * @throws Throwable
     */
    public function __invoke(float $amount, WithdrawalAccount $account, string $provider): Transaction
    {
        $user = Auth::user();

        if ($amount <= 0) {
            throw new Exception('Withdrawal amount must be greater than zero.');
        }

        if (! $user->hasSufficientBalance($amount)) {
            throw new RuntimeException('Insufficient wallet balance.');
        }

        $reference = Str::uuid()->toString();

        DB::beginTransaction();

        try {
            // Debit user's wallet
            $user->debit($amount, "Funds Withdrawal to {$account->bank_name} ({$account->account_number})");

            // Get updated wallet balance
            $currentBalance = $user->balance;

            // Create the transaction
            $transaction = Transaction::query()->create([
                'user_id' => $user->id,
                'reference' => $reference,
                'description' => "Funds Withdrawal to {$account->bank_name} ({$account->account_number})",
                'amount' => $amount * 100,
                'balance' => $currentBalance,
                'type' => TransactionType::Withdrawal,
                'status' => TransactionStatus::Pending,
                'currency' => Currency::NGN
            ]);

            Withdrawal::query()->create([
                'transaction_id' => $transaction->id,
                'type' => WithdrawalAccountType::FiatBank,
                'account_number' => $account->account_number,
                'account_name' => $account->account_name,
                'bank_name' => $account->bank_name,
            ]);

            DB::commit();

            return $transaction->refresh();
        } catch (Exception $ex) {
            DB::rollBack();

            Log::error('Failed to initiate withdrawal', ['error' => $ex->getMessage()]);
            throw $ex;
        }
    }
}

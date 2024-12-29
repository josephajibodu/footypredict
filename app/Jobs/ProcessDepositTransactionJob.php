<?php

namespace App\Jobs;

use App\Enums\TransactionStatus;
use App\Models\Transaction;
use Exception;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class ProcessDepositTransactionJob implements ShouldQueue
{
    use Queueable;

    /**
     * Create a new job instance.
     */
    public function __construct(
        public Transaction $transaction,
        public array $data
    )
    {}

    /**
     * Execute the job.
     * @throws Exception
     */
    public function handle(): void
    {
        try {
            DB::transaction(function () {

                if ($this->transaction->status !== TransactionStatus::Pending) {
                    Log::info('[JOB] Transaction already processed', [
                        'reference' => $this->transaction->reference,
                        'status' => $this->transaction->status,
                    ]);

                    return;
                }

                $amountReceived = $this->data['amount'] ?? 0;
                $fee = $this->data['charges'] ?? 0;

                // Credit user wallet
                $user = $this->transaction->user;
                $user->credit($amountReceived, "Wallet Deposit");

                $this->transaction->update([
                    'balance' => $user->balance,
                    'amount' => ($amountReceived) * 100,
                    'status' => TransactionStatus::Completed,
                ]);

                if ($this->transaction->deposit) {
                    $this->transaction->deposit->update([
                        'fee' => $fee * 100,
                        'amount_received' => $amountReceived * 100
                    ]);
                }

            });

            Log::info('Transaction processed successfully', [
                'reference' => $this->transaction->reference,
                'user_id' => $this->transaction->user_id,
                'amount' => $this->data['amount'] ?? null,
            ]);

        } catch (Exception $ex) {
            Log::error('Error processing transaction in job', [
                'reference' => $this->transaction->reference,
                'error' => $ex->getMessage(),
            ]);

            throw $ex;
        }
    }
}

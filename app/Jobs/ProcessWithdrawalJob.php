<?php

namespace App\Jobs;

use App\Enums\TransactionStatus;
use App\Models\Transaction;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;
use Illuminate\Support\Facades\Log;

class ProcessWithdrawalJob implements ShouldQueue
{
    use Queueable;

    /**
     * Create a new job instance.
     */
    public function __construct(
        public Transaction $transaction,
        public array $data,
    ) {}

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        if ($this->transaction->status !== TransactionStatus::Pending) {
            Log::info('[JOB] Transaction already processed', [
                'reference' => $this->transaction->reference,
                'status' => $this->transaction->status,
            ]);

            return;
        }

        $this->transaction->update([
            'status' => TransactionStatus::Completed,
        ]);
    }
}

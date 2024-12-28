<?php

namespace App\Http\Controllers;

use App\Enums\TransactionStatus;
use App\Models\Transaction;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Throwable;

class SwervPayWebhookController extends Controller
{
    public function __invoke(Request $request)
    {
        $secret = config('services.misc.swervpay.secret_key');

        Log::info('SwervPay webhook received', [
            'headers' => $request->headers->all(),
            'body' => $request->all(),
        ]);

        if (request()->header('X-SWERV-SECRET') !== $secret) {
            Log::warning('Unauthorized request to SwervPay webhook', [
                'provided_secret' => $request->header('X-SWERV-SECRET'),
            ]);

            return response('Unauthorized request', 401);
        }

        $data = $request->input('data', []);
        $reference = $data['reference'] ?? null;

        if (!$reference) {
            Log::warning('Missing transaction reference in SwervPay webhook');
            return response('Missing reference', 400);
        }

        /**
         * @var Transaction $transaction
         */
        $transaction = Transaction::query()->where('reference', $reference)->first();

        if (!$transaction) {
            Log::error('Transaction not found for reference', ['reference' => $reference]);
            return response('Transaction not found', 404);
        }

        if ($transaction->status !== TransactionStatus::Pending) {
            Log::info('Transaction already processed', [
                'reference' => $transaction->reference,
                'status' => $transaction->status,
            ]);
            return response('Transaction already processed', 200);
        }

        try {
            DB::transaction(function () use ($transaction, $data) {
                $this->processTransaction($transaction, $data);
            });

            Log::info('Transaction processed successfully', [
                'reference' => $transaction->reference,
                'user_id' => $transaction->user_id,
                'amount' => $data['amount'] ?? null,
            ]);

            return response('Transaction processed successfully', 200);
        } catch (Throwable $e) {
            Log::error('Error processing transaction', [
                'reference' => $transaction->reference,
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ]);

            return response('Failed to process transaction', 500);
        }
    }

    /**
     * Processes the transaction and updates related models.
     *
     * @param Transaction $transaction
     * @param array $data
     * @return void
     * @throws Exception
     */
    protected function processTransaction(Transaction $transaction, array $data)
    {
        $amountReceived = $data['amount'] ?? 0;
        $fee = $data['charges'] ?? 0;

        // Credit user wallet
        $user = $transaction->user;
        $user->credit($amountReceived, "Wallet Deposit");

        // Update transaction details
        $transaction->update([
            'balance' => $user->balance,
            'amount' => $amountReceived * 100,
            'status' => TransactionStatus::Completed,
        ]);

        // Update deposit details
        if ($transaction->deposit) {
            $transaction->deposit->update([
                'fee' => $fee * 100,
            ]);
        }
    }
}

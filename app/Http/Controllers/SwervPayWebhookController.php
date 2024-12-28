<?php

namespace App\Http\Controllers;

use App\Enums\TransactionStatus;
use App\Jobs\ProcessDepositTransactionJob;
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

        ProcessDepositTransactionJob::dispatch($transaction, $data);

        Log::info('Transaction job dispatched', [
            'reference' => $transaction->reference,
            'data' => $data,
        ]);

        return response('Transaction processed successfully', 200);
    }
}

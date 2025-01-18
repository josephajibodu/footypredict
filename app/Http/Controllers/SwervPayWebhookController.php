<?php

namespace App\Http\Controllers;

use App\Enums\TransactionStatus;
use App\Jobs\ProcessDepositTransactionJob;
use App\Jobs\ProcessWithdrawalJob;
use App\Models\Deposit;
use App\Models\Transaction;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class SwervPayWebhookController extends Controller
{
    public function __invoke(Request $request)
    {
        $secret = config('services.misc.swervpay.webhook_secret_key');

        Log::info('SwervPay webhook received', [
            'headers' => $request->headers->all(),
            'body' => $request->all(),
        ]);

        $data = $request->input('data', []);
        $event = $request->input('event');
        $collectionId = $data['collection_id'] ?? null;
        $reference = $data['reference'] ?? null;

        if (! $event) {
            Log::warning('Missing event type in SwervPay webhook');
            return response('Event type missing', 400);
        }

        if (! in_array($event, ['collection.completed', 'payout.completed'])) {
            Log::warning('Webhook rejected', ['data' => $data]);
            return response("");
        }

        if (request()->header('X-SWERV-SECRET') !== $secret) {
            Log::warning('Unauthorized request to SwervPay webhook', [
                'provided_secret' => $request->header('X-SWERV-SECRET'),
            ]);
            return response('Unauthorized request', 401);
        }

        if (! $reference && ! $collectionId) {
            Log::warning('Missing reference/collection id in SwervPay webhook');
            return response("");
        }

        $transaction = null;

        switch ($event) {
            case 'collection.completed':
                $deposit = Deposit::query()->where('provider_reference', $collectionId)->first();
                if (!$deposit) {
                    Log::error('Deposit not found for collection_id', ['collection_id' => $collectionId]);
                    return response("");
                }

                $transaction = $deposit->transaction;
                break;

            case 'payout.completed':
                $transaction = Transaction::query()->where('reference', $reference)->first();

                if (!$transaction) {
                    Log::error('Transaction not found for reference', ['reference' => $reference]);
                    return response("");
                }
                break;
            default:

        }

        if ($transaction->status !== TransactionStatus::Pending) {
            Log::info('Transaction already processed', [
                'reference' => $transaction->reference,
                'status' => $transaction->status,
            ]);
            return response('Transaction already processed', 200);
        }

        switch ($event) {
            case 'collection.completed':
                ProcessDepositTransactionJob::dispatch($transaction, $data);
                break;
            case 'payout.completed':
                ProcessWithdrawalJob::dispatch($transaction, $data);
                break;
            default:
                Log::info('Event type not identified', [
                    'reference' => $transaction->reference,
                    'event' => $event,
                    'data' => $data,
                ]);
        }

        Log::info('Transaction job dispatched', [
            'reference' => $transaction->reference,
            'data' => $data,
        ]);

        return response("Processed", 200);
    }
}

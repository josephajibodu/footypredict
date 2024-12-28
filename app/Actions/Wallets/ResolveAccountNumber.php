<?php

namespace App\Actions\Wallets;

use App\Enums\LogChannel;
use App\Integrations\SwervPay\CollectionData;
use App\Integrations\SwervPay\SwervePay;
use Exception;
use Illuminate\Support\Facades\Log;
use Throwable;

class ResolveAccountNumber
{
    /**
     * @throws Exception
     */
    public function __invoke(CollectionData $collectionData)
    {
        try {
            $config = [
                'secret_key' => config('services.swervpay.secret_key'),
                'business_id' => config('services.swervpay.business_id'),
                'sandbox' => config('services.swervpay.sandbox'),
            ];

            $swervpay = new SwervePay();

            $res = $swervpay->createCollection($collectionData->toArray());

            Log::channel(LogChannel::Deposits->value)->info("Response from swervpay", [
                'res' => $res,
                'user' => auth()->user()
            ]);

            return $res;

        } catch (Throwable $ex) {
            report($ex);

            throw new Exception('Error creating a dedicated bank account for you');
        }
    }
}
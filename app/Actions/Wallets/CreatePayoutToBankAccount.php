<?php

namespace App\Actions\Wallets;

use App\Enums\LogChannel;
use App\Integrations\SwervPay\PayoutData;
use App\Integrations\SwervPay\SwervePay;
use Exception;
use Illuminate\Support\Facades\Log;
use Throwable;

class CreatePayoutToBankAccount
{
    /**
     * @throws Exception
     */
    public function __invoke(PayoutData $payoutData)
    {
        try {
            $swervpay = new SwervePay;

            $res = $swervpay->createPayout($payoutData->toArray());

            return $res;

        } catch (Throwable $ex) {
            report($ex);

            throw new Exception('Error initiating withdrawals');
        }
    }
}

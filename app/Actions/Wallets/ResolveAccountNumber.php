<?php

namespace App\Actions\Wallets;

use App\Enums\LogChannel;
use App\Integrations\SwervPay\SwervePay;
use Exception;
use Illuminate\Support\Facades\Log;
use Throwable;

class ResolveAccountNumber
{
    /**
     * @throws Exception
     */
    public function __invoke(array $data)
    {
        try {
            $swervpay = new SwervePay;

            $res = $swervpay->resolveAccount($data);

            return $res;

        } catch (Throwable $ex) {
            report($ex);

            throw new Exception('Error resolving your bank account.');
        }
    }
}

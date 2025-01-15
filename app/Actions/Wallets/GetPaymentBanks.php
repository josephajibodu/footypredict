<?php

namespace App\Actions\Wallets;

use App\Enums\LogChannel;
use App\Integrations\SwervPay\NowPayment;
use Exception;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;
use Throwable;

class GetPaymentBanks
{
    const CACHE_KEY = 'payment_banks';

    const CACHE_TTL = 1440;

    /**
     * @throws Exception
     */
    public function __invoke()
    {
        return Cache::remember(self::CACHE_KEY, self::CACHE_TTL, function () {
            try {
                $swervpay = new NowPayment;
                $banks = $swervpay->getBanks();

                Log::channel(LogChannel::ExternalAPI->value)
                    ->info('Fetched banks from SwervPay API', ['res' => $banks]);

                if (! is_array($banks) || empty($banks)) {
                    throw new Exception('Invalid bank data received');
                }

                return $banks;
            } catch (Throwable $ex) {
                Log::channel(LogChannel::ExternalAPI->value)
                    ->error("Error fetching banks: {$ex->getMessage()}");
                throw new Exception('Could not fetch list of banks');
            }
        });
    }
}

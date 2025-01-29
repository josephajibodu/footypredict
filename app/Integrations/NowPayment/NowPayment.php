<?php

namespace App\Integrations\NowPayment;

use App\Enums\LogChannel;
use App\Integrations\NowPayment\DataObjects\PaymentRequestDTO;
use Exception;
use Illuminate\Http\Client\ConnectionException;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Throwable;

class NowPayment
{
    protected string $apiKey;

    protected string $email;

    protected string $password;

    protected string $baseUrl;

    protected bool $isSandbox;

    protected string $cacheKey = 'nowpayment_access_token';

    public function __construct()
    {
        $this->apiKey = config('services.misc.nowpayment.api_key');
        $this->email = config('services.misc.nowpayment.email');
        $this->password = config('services.misc.nowpayment.password');
        $this->isSandbox = config('services.misc.nowpayment.sandbox');
        $this->baseUrl = 'https://api.nowpayments.io/v1';
    }

    /**
     * Only needed when creating payouts
     *
     * @throws ConnectionException|Throwable
     */
    protected function getAccessToken()
    {
        if ($cachedToken = Cache::get($this->cacheKey)) {
            return $cachedToken;
        }

        $response = Http::withHeaders([
            'Content-Type' => 'application/json',
        ])->post($this->baseUrl.'/auth', [
            'email' => $this->email,
            'password' => $this->password,
        ])->json();

        if (isset($response['token'])) {
            $token = $response['token'];
            $ttl = 4;

            Cache::put($this->cacheKey, $token, now()->addMinutes($ttl));

            return $token;
        } else {
            throw new Exception('Now Payment authentication failed');
        }
    }

    /**
     * @throws Throwable
     */
    protected function makeRequest($method, $endpoint, $data = [])
    {
        try {
            $bearerToken = $this->getAccessToken();

            $headers = [
                'x-api-key' => $this->apiKey,
                'Content-Type' => 'application/json',
                'Accept' => 'application/json',
            ];

            $response = Http::withHeaders($headers)
                ->$method($this->baseUrl.$endpoint, $data);

            Log::channel(LogChannel::ExternalAPI->value)->info('HTTP Request', [
                'method' => $method,
                'endpoint' => $endpoint,
                'data' => $data,
                'response_status' => $response->status(),
                'response_body' => $response->body(),
            ]);

            if ($response->failed()) {
                $errorDetails = [
                    'status' => $response->status(),
                    'body' => $response->json(),
                ];

                Log::channel(LogChannel::ExternalAPI->value)->error('HTTP Error Response', $errorDetails);

                throw new Exception('API request failed: '.$response->status().' - '.json_encode($response->json()));
            }

            return $response->json();
        } catch (ConnectionException $e) {
            Log::channel(LogChannel::ExternalAPI->value)->error('Connection Exception', [
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ]);
            throw new Exception('Connection to API failed. Please try again later.');
        } catch (Throwable $e) {
            report($e);
            Log::channel(LogChannel::ExternalAPI->value)->error('Unhandled Exception', [
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ]);
            throw $e;
        }
    }

    /**
     * @throws Throwable
     */
    public function getCurrencies(bool $fixedRate = true)
    {
        return $this->makeRequest('get', "/currencies", [
            'fixed_rate' => $fixedRate
        ]);
    }

    /**
     * @throws Throwable
     */
    public function createPayment(PaymentRequestDTO $data)
    {
        return $this->makeRequest('post', '/payment', $data->toArray());
    }

    /**
     * @throws Throwable
     */
    public function getPaymentStatus(string $paymentId)
    {
        return $this->makeRequest('get', "/payment/$paymentId");
    }

    /**
     * @throws Throwable
     */
    public function getMinimumPaymentAmount(string $currencyFrom, ?string $currencyTo = null)
    {
        $data = [
            'currency_from' => $currencyFrom,
            'is_fee_paid_by_user' => true,
        ];

        if ($currencyTo) {
            $data['currency_to'] = $currencyTo;
        }

        return $this->makeRequest('get', '/min-amount', $data);
    }

    /**
     * @throws Throwable
     */
    public function getEstimatedPrice(float $amount, string $currencyFrom, string $currencyTo)
    {
        $data = [
            'amount' => $amount,
            'currency_from' => $currencyFrom,
            'currency_to' => $currencyTo,
        ];

        return $this->makeRequest('post', '/min-amount', $data);
    }

    /**
     * @throws Throwable
     */
    public function createPayout(array $data)
    {
        return $this->makeRequest('post', '/payouts', $data);
    }

    /**
     * @throws Throwable
     */
    public function getPayoutStatus(string $payoutId)
    {
        return $this->makeRequest('get', "/payout/$payoutId");
    }

    /**
     * @throws Throwable
     */
    public function validateAddress(string $walletAddress, string $currency, ?string $extraId)
    {
        $data = [
            'address' => $walletAddress,
            'currency' => $currency,
        ];

        if ($extraId) {
            $data['extra_id'] = $extraId;
        }

        return $this->makeRequest('post', '/resolve-account-number', $data);
    }
}

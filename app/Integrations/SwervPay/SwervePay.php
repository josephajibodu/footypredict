<?php

namespace App\Integrations\SwervPay;

use App\Enums\LogChannel;
use Exception;
use Illuminate\Http\Client\ConnectionException;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Throwable;

class SwervePay
{
    protected string $businessId;

    protected string $secretKey;

    protected string $baseUrl;

    protected bool $isSandbox;

    protected string $cacheKey = 'swervpay_access_token';

    public function __construct()
    {
        $this->businessId = config('services.misc.swervpay.business_id');
        $this->secretKey = config('services.misc.swervpay.secret_key');
        $this->isSandbox = config('services.misc.swervpay.sandbox');
        $this->baseUrl = $this->isSandbox ? 'https://sandbox.swervpay.co/api/v1' : 'https://api.swervpay.co/api/v1';
    }

    /**
     * @throws ConnectionException|Throwable
     */
    protected function getAccessToken()
    {
        if ($cachedToken = Cache::get($this->cacheKey)) {
            return $cachedToken;
        }

        $credentials = base64_encode($this->businessId.':'.$this->secretKey);

        $response = Http::withHeaders([
            'Authorization' => 'Basic '.$credentials,
        ])->post($this->baseUrl.'/auth')->json();

        if (isset($response['access_token'])) {
            $token = $response['access_token'];

            $ttl = 55;
            Cache::put($this->cacheKey, $token, now()->addMinutes($ttl));

            return $token;
        } else {
            throw new Exception('Swerve Payment authentication failed');
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
                'Authorization' => 'Bearer ' . $bearerToken,
                'Content-Type' => 'application/json',
                'Accept' => 'application/json',
            ];

            $response = Http::withHeaders($headers)
                ->$method($this->baseUrl . $endpoint, $data);

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

                throw new Exception('API request failed: ' . $response->status() . ' - ' . json_encode($response->json()));
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
    public function createCollection(array $data)
    {
        return $this->makeRequest('post', '/collections', $data);
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
    public function getBanks()
    {
        return $this->makeRequest('get', '/banks');
    }

    /**
     * @throws Throwable
     */
    public function resolveAccount(array $data)
    {
        return $this->makeRequest('post', '/resolve-account-number', $data);
    }
}

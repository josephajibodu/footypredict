<?php

namespace App\Integrations\SwervPay;

use Exception;
use Illuminate\Http\Client\ConnectionException;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Http;
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
        // Check if token exists in cache
        if ($cachedToken = Cache::get($this->cacheKey)) {
            return $cachedToken;
        }

        $credentials = base64_encode($this->businessId.':'.$this->secretKey);

        $response = Http::withHeaders([
            'Authorization' => 'Basic '.$credentials,
        ])->post($this->baseUrl.'/auth')->json();

        if (isset($response['access_token'])) {
            $token = $response['access_token'];
            $expiresAt = $response['token']['expires_at'];
            $issuedAt = $response['token']['issued_at'];

            // Calculate TTL in minutes (55 minutes)
            $ttl = 55;

            // If you want to make it dynamic based on expires_at:
            // $ttl = floor(($expiresAt - $issuedAt) / 1000 / 60) - 5; // Convert to minutes and subtract 5 minutes for safety

            // Cache the token
            Cache::put($this->cacheKey, $token, now()->addMinutes($ttl));

            return $token;
        } else {
            throw new Exception('Payment authentication failed');
        }
    }

    /**
     * @throws Throwable
     */
    protected function makeRequest($method, $endpoint, $data = [])
    {
        $bearerToken = $this->getAccessToken();

        $headers = [
            'Authorization' => 'Bearer '.$bearerToken,
            'Content-Type' => 'application/json',
            'Accept' => 'application/json',
        ];

        return Http::withHeaders($headers)
            ->$method($this->baseUrl.$endpoint, $data)
            ->json();
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

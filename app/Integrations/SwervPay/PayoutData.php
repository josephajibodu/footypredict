<?php

namespace App\Integrations\SwervPay;

use Illuminate\Contracts\Support\Arrayable;

class PayoutData implements Arrayable
{
    public function __construct(
        public string $bank_code,
        public string $account_number,
        public float $amount,
        public string $currency,
        public string $reference,
        public string $narration
    ) {}

    public function toArray(): array
    {
        return [
            'bank_code' => $this->bank_code,
            'account_number' => $this->account_number,
            'amount' => $this->amount,
            'currency' => $this->currency,
            'reference' => $this->reference,
            'narration' => $this->narration,
        ];
    }
}

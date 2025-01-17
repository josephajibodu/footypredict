<?php

namespace App\Integrations\SwervPay;

use Illuminate\Contracts\Support\Arrayable;

class CollectionData implements Arrayable
{
    public function __construct(
        public float $amount,
        public string $reference,
        public string $currency = 'NGN',
        public ?CollectionType $type = CollectionType::Temporary,
        public ?string $merchant_name = 'FootyPredict',
    ) {}

    public function toArray(): array
    {
        return [
            'amount' => $this->amount,
            'type' => $this->type->value,
            'reference' => $this->reference,
            'merchant_name' => $this->merchant_name,
            'currency' => $this->currency,
        ];
    }
}

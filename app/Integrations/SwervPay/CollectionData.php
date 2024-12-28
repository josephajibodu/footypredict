<?php

namespace App\Integrations\SwervPay;

use Illuminate\Contracts\Support\Arrayable;

class CollectionData implements Arrayable
{
    public function __construct(
        public float $amount,
        public string $reference,
        public ?string $customer_id = null,
        public string $currency = 'NGN',
        public ?CollectionType $type = CollectionType::Temporary,
        public ?string $merchant_name = 'FootyPredict',
    )
    {}

    public function toArray(): array
    {
        return [
            "customer_id" => $this->customer_id,
            "currency" => $this->currency,
            "merchant_name" => $this->merchant_name,
            "amount" => $this->amount,
            "type" => $this->type->value,
        ];
    }
}
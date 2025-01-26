<?php

namespace App\Integrations\NowPayment\DataObjects;

use Illuminate\Contracts\Support\Arrayable;

class PaymentRequestDTO implements Arrayable
{
    public function __construct(
        public float $price_amount,
        public string $price_currency,
        public string $pay_currency,
        public string $ipn_callback_url,
        public string $order_id,
        public string $order_description,
        public bool $is_fixed_rate,
        public bool $is_fee_paid_by_user
    ) {}

    /**
     * Convert the DTO to an array.
     */
    public function toArray(): array
    {
        return [
            'price_amount' => $this->price_amount,
            'price_currency' => $this->price_currency,
            'pay_currency' => $this->pay_currency,
            'ipn_callback_url' => $this->ipn_callback_url,
            'order_id' => $this->order_id,
            'order_description' => $this->order_description,
            'is_fixed_rate' => $this->is_fixed_rate,
            'is_fee_paid_by_user' => $this->is_fee_paid_by_user,
        ];
    }

    /**
     * Create an instance from an array.
     *
     * @return static
     */
    public static function fromArray(array $data): self
    {
        return new self(
            price_amount: $data['price_amount'],
            price_currency: $data['price_currency'],
            pay_currency: $data['pay_currency'],
            ipn_callback_url: $data['ipn_callback_url'],
            order_id: $data['order_id'],
            order_description: $data['order_description'],
            is_fixed_rate: $data['is_fixed_rate'],
            is_fee_paid_by_user: $data['is_fee_paid_by_user']
        );
    }
}

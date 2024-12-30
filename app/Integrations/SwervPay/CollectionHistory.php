<?php

namespace App\Integrations\SwervPay;

class CollectionHistory
{
    public mixed $currency;

    public mixed $amount;

    public string $payment_method;

    public float $charges;

    public string $created_at;

    public int $id;

    public string $reference;

    public string $updated_at;
}

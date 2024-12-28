<?php

namespace App\Integrations\SwervPay;

enum CollectionType: string
{
    case Permanent = 'DEFAULT';
    case Temporary = 'ONE_TIME';
}
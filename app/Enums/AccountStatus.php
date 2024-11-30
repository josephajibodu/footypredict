<?php

namespace App\Enums;

use App\Traits\HasValues;

enum AccountStatus: string
{
    use HasValues;

    case Active = 'active';
    case Banned = 'banned';
}
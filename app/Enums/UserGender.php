<?php

namespace App\Enums;

use App\Traits\HasValues;

enum UserGender: string
{
    use HasValues;

    case Male = 'male';
    case Female = 'female';
}

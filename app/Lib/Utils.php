<?php

function to_money(string|int|float $value, int $divideBy = 0, bool $hideSymbol = false): string
{
    $value = is_numeric($value) ? floatval($value) : 0.0;

    if ($divideBy !== 0) {
        $value /= $divideBy;
    }

    $hasDecimal = floor($value) != $value;

    $formattedNumber = $hasDecimal ?
        number_format($value, 2, '.', ',') :
        number_format($value, 0, '.', ',');

    if (! $hideSymbol) {
        $formattedNumber = "₦$formattedNumber";
    }

    return $formattedNumber;
}

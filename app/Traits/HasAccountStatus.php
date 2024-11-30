<?php

namespace App\Traits;

use App\Enums\AccountStatus;

trait HasAccountStatus
{
    public function isBanned(): bool
    {
        return $this->account_status === AccountStatus::Banned;
    }
}
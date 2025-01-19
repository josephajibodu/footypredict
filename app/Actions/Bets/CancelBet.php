<?php

namespace App\Actions\Bets;

use App\Actions\Transactions\CreateRefund;
use App\Enums\BetStatus;
use App\Enums\Currency;
use App\Enums\TransactionStatus;
use App\Enums\TransactionType;
use App\Models\Bet;
use App\Models\Option;
use App\Models\Transaction;
use App\Models\User;
use App\Settings\BetSetting;
use Carbon\Carbon;
use Exception;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class CancelBet
{
    public function __construct(public CreateRefund $createRefund)
    {}

    public function __invoke(Bet $bet): Bet
    {
        return DB::transaction(function () use ($bet) {
            $user = $bet->user;

            $bet->update([
                'status' => BetStatus::Voided
            ]);

            $amount = $bet->stake / 100;
            $this->createRefund->execute($user, $amount, "Bet Refund");

            return $bet->refresh();
        });
    }
}

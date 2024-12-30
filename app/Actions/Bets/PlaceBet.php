<?php

namespace App\Actions\Bets;

use App\Enums\BetStatus;
use App\Enums\TransactionStatus;
use App\Enums\TransactionType;
use App\Models\Bet;
use App\Models\Option;
use App\Models\Transaction;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class PlaceBet
{
    public function __invoke(User $user, float $amount, array $sportEvents): Bet
    {
        return DB::transaction(function () use ($user, $amount, $sportEvents) {
            $amountInUnit = $amount * 100;

            // Debit User
            $user->debit($amount, 'Betting stake');

            // Get multiplier for the type of bet
            $multiplier = 15;

            // Create a transaction record
            $transaction = Transaction::query()->create([
                'reference' => Str::random()."TXN-BET-{$user->id}",
                'user_id' => $user->id,
                'amount' => $amountInUnit,
                'type' => TransactionType::Bet,
                'status' => TransactionStatus::Completed,
                'balance' => $user->balance,
            ]);

            // Create the bet
            $bet = Bet::query()->create([
                'user_id' => $user->id,
                'transaction_id' => $transaction->id,
                'stake' => $amountInUnit,
                'multiplier' => $multiplier,
                'potential_winnings' => $amountInUnit * $multiplier,
                'status' => BetStatus::Pending,
            ]);

            // Attach sport events to the bet
            foreach ($sportEvents as $event) {
                $betOption = Option::query()->where('sport_event_id', $event['event_id'])
                    ->where('type', $event['bet_option'])
                    ->first();

                $bet->sportEvents()->attach($event['event_id'], [
                    'selected_option_id' => $betOption->id,
                    'outcome_option_id' => null,
                    'is_correct' => null,
                ]);
            }

            return $bet;
        });
    }
}

<?php

use App\Enums\BetStatus;
use App\Enums\SportEventStatus;
use App\Jobs\ProcessBet;
use App\Models\Bet;
use App\Models\SportEvent;

it('marks the bet as lost if non-flexed and loses a match', function () {
    // Arrange: Create a mock Bet with a lost match
    $bet = Bet::factory()->create([
        'status' => BetStatus::Pending,
        'is_flexed' => false,
    ]);

    $sportEvent = SportEvent::factory()->create([
        'status' => SportEventStatus::Completed,
    ]);

    $bet->sportEvents()->attach($sportEvent, [
        'selected_option_id' => 1,
        'outcome_option_id' => 2,
    ]);

    $sportEvent = SportEvent::factory()->create([
        'status' => SportEventStatus::Completed,
    ]);

    $bet->sportEvents()->attach($sportEvent, [
        'selected_option_id' => 3,
        'outcome_option_id' => 4,
    ]);

    // Act: Dispatch the job
    ProcessBet::dispatchSync($bet, $sportEvent);

    // Assert: Bet should be marked as lost
    $bet->refresh();
    expect($bet->status)->toBe(BetStatus::Lost);
});
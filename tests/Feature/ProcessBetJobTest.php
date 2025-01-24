<?php

use App\Enums\BetStatus;
use App\Enums\SportEventStatus;
use App\Jobs\ProcessBet;
use App\Models\Bet;
use App\Models\SportEvent;
use App\Models\Team;
use Illuminate\Support\Facades\Log;
use Mockery\MockInterface;

it('marks the bet as lost if non-flexed and loses a match', function () {
    // Arrange: Create a mock Bet with a lost match
    Team::factory()->count(4)->create();

    /** @var Bet $bet */
    $bet = Bet::factory()->create([
        'status' => BetStatus::Pending,
        'is_flexed' => false,
    ]);

    /** @var SportEvent $sportEvent1 */
    $sportEvent1 = SportEvent::factory()->forToday()->create([
        'status' => SportEventStatus::Completed,
        'team1_id' => 1,
        'team2_id' => 2,
    ]);
    $options = $sportEvent1->options;
    $bet->sportEvents()->attach($sportEvent1, [
        'selected_option_id' => $options->first()->id,
        'outcome_option_id' => $options->first()->id,
    ]);

    /** @var SportEvent $sportEvent2 */
    $sportEvent2 = SportEvent::factory()->forToday()->create([
        'status' => SportEventStatus::Completed,
        'team1_id' => 3,
        'team2_id' => 4,
    ]);
    $options = $sportEvent2->options;
    $bet->sportEvents()->attach($sportEvent2, [
        'selected_option_id' => $options->first()->id,
        'outcome_option_id' => $options->last()->id,
    ]);

        // Act: Dispatch the job
    ProcessBet::dispatchSync($bet, $sportEvent1);

    // Assert: Bet should be marked as lost
    $bet->refresh();
    expect($bet->status)->toBe(BetStatus::Lost);
});

it('marks the bet as won if all matches are completed and no loss', function () {
    // Arrange: Create a mock Bet with all matches won
    Team::factory()->count(4)->create();

    /** @var Bet $bet */
    $bet = Bet::factory()->create([
        'status' => BetStatus::Pending,
        'is_flexed' => false,
    ]);

    /** @var SportEvent $sportEvent */
    $sportEvent = SportEvent::factory()->create([
        'status' => SportEventStatus::Completed,
    ]);

    $options = $sportEvent->options;
    $bet->sportEvents()->attach($sportEvent, [
        'selected_option_id' => $options->first()->id,
        'outcome_option_id' => $options->first()->id,
    ]);

    // Act: Dispatch the job
    ProcessBet::dispatchSync($bet, $sportEvent);

    // Assert: Bet should be marked as won
    $bet->refresh();
    expect($bet->status)->toBe(BetStatus::Won);
});

it('does not mark the bet as lost if the allowed flex is not exceeded', function () {
    // Arrange: Create a mock Bet with allowed flex
    Team::factory()->count(4)->create();

    /** @var Bet $bet */
    $bet = Bet::factory()->create([
        'status' => BetStatus::Pending,
        'is_flexed' => true,
        'multiplier_settings' => [
            'selection' => 2,
            'allow_flex' => true,
            'main' => 3,
            'flex_0' => 1.2,
            'flex_1' => 0.75,
            'flex_2' => null,
        ],
    ]);

    $teams = Team::query()->get(['id'])->pluck('id')->toArray();
    /** @var SportEvent $sportEvent1 */
    $sportEvent1 = SportEvent::factory()->create([
        'status' => SportEventStatus::Pending,
        'team1_id' => $teams[0],
        'team2_id' => $teams[1],
    ]);
    /** @var SportEvent $sportEvent2 */
    $sportEvent2 = SportEvent::factory()->create([
        'status' => SportEventStatus::Completed,
        'team1_id' => $teams[2],
        'team2_id' => $teams[3],
    ]);

    $bet->sportEvents()->attach([
        $sportEvent1->id => ['selected_option_id' => $sportEvent1->options->first()->id, 'outcome_option_id' => $sportEvent1->options->first()->id], // Won
        $sportEvent2->id => ['selected_option_id' => $sportEvent2->options->first()->id, 'outcome_option_id' => $sportEvent2->options->last()->id], // Lost
    ]);

    // Act: Dispatch the job
    ProcessBet::dispatchSync($bet, $sportEvent2);

    // Assert: Bet should still be pending
    $bet->refresh();
    expect($bet->status)->toBe(BetStatus::Pending);
});

it('bet is still pending if uncompleted matches exist', function () {
    // Arrange: Mock the logger
    Team::factory()->count(4)->create();

    /** @var Bet $bet */
    $bet = Bet::factory()->create([
        'status' => BetStatus::Pending,
    ]);

    $sportEvent = SportEvent::factory()->create([
        'status' => SportEventStatus::Pending,
    ]);

    $bet->sportEvents()->attach($sportEvent, [
        'selected_option_id' => $sportEvent->options->first()->id
    ]);

    // Act: Dispatch the job
    ProcessBet::dispatchSync($bet, $sportEvent);

    // Assert: Bet should remain pending
    $bet->refresh();
    expect($bet->status)->toBe(BetStatus::Pending);
});

it('correctly calculates winnings based on flex levels', function () {
    $teams = Team::factory()->count(8)->create()->pluck('id');

    /** @var Bet $bet */
    $bet = Bet::factory()->create([
        'status' => BetStatus::Pending,
        'is_flexed' => true,
        'stake' => 1000,
        'multiplier_settings' => [
            'selection' => 4,
            'allow_flex' => true,
            'main' => 2.0,
            'flex_0' => 1.5,
            'flex_1' => 1.2,
            'flex_2' => 0.75,
        ],
    ]);

    for ($i = 0; $i < 4; $i++) {
        $sportEvent = SportEvent::factory()->create([
            'status' => SportEventStatus::Completed,
            'team1_id' => $teams[$i * 2],
            'team2_id' => $teams[($i * 2) + 1],
        ]);

        $bet->sportEvents()->attach($sportEvent, [
            'selected_option_id' => $sportEvent->options->first()->id,
            'outcome_option_id' => $sportEvent->options->first()->id,
        ]);
    }

    // Mark one match as lost
     $bet->sportEvents()->where('sport_event_id', $sportEvent->id)->update([
         'outcome_option_id' => $sportEvent->options->last()->id
     ]);

    // Act: Dispatch the job
    ProcessBet::dispatchSync($bet, $bet->sportEvents->last());

    // Assert: Bet should be marked as won with correct flex multiplier
    $bet->refresh();
    expect($bet->status)->toBe(BetStatus::Won)
        ->and($bet->potential_winnings)->toBe(1200);
});

it('marks the bet as lost early even when there are still matches', function () {
    $teams = Team::factory()->count(8)->create()->pluck('id');

    /** @var Bet $bet */
    $bet = Bet::factory()->create([
        'status' => BetStatus::Pending,
        'is_flexed' => false,
        'multiplier_settings' => [
            'selection' => 4,
            'allow_flex' => true,
            'main' => 2.0,
            'flex_0' => 1.5,
            'flex_1' => 1.2,
            'flex_2' => 0.75,
        ],
    ]);

    for ($i = 0; $i < 4; $i++) {
        /** @var SportEvent $sportEvent */
        $sportEvent = SportEvent::factory()->create([
            'status' => SportEventStatus::Pending,
            'team1_id' => $teams[$i * 2],
            'team2_id' => $teams[($i * 2) + 1],
        ]);

        $bet->sportEvents()->attach($sportEvent, [
            'selected_option_id' => $sportEvent->options->first()->id,
        ]);
    }

    // Mark one match as lost
    $sportEvent->update(['status' => SportEventStatus::Completed]);
    $bet->sportEvents()->where('sport_event_id', $sportEvent->id)->update([
        'outcome_option_id' => $sportEvent->options->last()->id
    ]);

    // Act: Dispatch the job
    ProcessBet::dispatchSync($bet, $sportEvent);

    // Assert: Bet should be marked as won with correct flex multiplier
    $bet->refresh();
    expect($bet->status)->toBe(BetStatus::Lost);
});
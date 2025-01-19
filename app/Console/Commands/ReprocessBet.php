<?php

namespace App\Console\Commands;

use App\Enums\BetStatus;
use App\Jobs\ProcessBet;
use Illuminate\Console\Command;
use App\Models\Bet;

class ReprocessBet extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:reprocess-bet {reference} {--force : Processes the bet even when completed already}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Reprocess a failed bet';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $reference = $this->argument('reference');
        $forced = $this->option('force');

        // Find the bet by reference
        /** @var Bet $bet */
        $bet = Bet::query()
            ->with(['sportEvents'])
            ->where('reference', $reference)->first();

        if (!$bet) {
            $this->error("Bet with reference {$reference} not found.");
            return 1;
        }

        // Check if the bet has already been completed
        if ($bet->status !== BetStatus::Pending && !$forced) {
            $this->warn("Bet with reference {$reference} has already been completed. Use --force to reprocess.");
            return 1;
        }

        // Update the bet status to pending if forced
        if ($forced) {
            $bet->update(['status' => 'pending']);
            $this->info("Bet status updated to 'pending' for reprocessing.");
        }

        $sportEvent = $bet->sportEvents()->first();

        // Call the ProcessBetJob
        ProcessBet::dispatch($bet, $sportEvent);

        $this->info("Bet with reference {$reference} has been queued for reprocessing.");
        return 0;
    }
}
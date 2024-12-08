<?php

use App\Enums\SportEventStatus;
use App\Enums\SportEventType;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('sport_events', function (Blueprint $table) {
            $table->id();

            $table->date('match_date');
            $table->time('kickoff_time');

            $table->foreignId('team1_id')->constrained('teams')->cascadeOnUpdate()->cascadeOnDelete();
            $table->foreignId('team2_id')->constrained('teams')->cascadeOnUpdate()->cascadeOnDelete();
            $table->foreignId('league_id')->nullable()->constrained('leagues')->cascadeOnUpdate()->cascadeOnDelete();

            $table->string('sport')->default(SportEventType::Football);
            $table->string('status')->default(SportEventStatus::Pending);
            $table->integer('team1_score')->nullable();
            $table->integer('team2_score')->nullable();
            $table->string('main_outcome')->nullable();

            $table->string('season')->nullable();
            $table->integer('match_week')->nullable();

            $table->unique(['match_date', 'team1_id', 'team2_id'], 'unique_match_per_day');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('sport_events');
    }
};

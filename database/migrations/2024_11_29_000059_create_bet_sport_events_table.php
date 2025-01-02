<?php

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
        Schema::create('bet_sport_event', function (Blueprint $table) {
            $table->id();

            $table->foreignId('bet_id')
                ->constrained()
                ->cascadeOnUpdate()
                ->cascadeOnDelete();
            $table->foreignId('sport_event_id')
                ->constrained()
                ->cascadeOnUpdate()
                ->cascadeOnDelete();
            $table->foreignId('selected_option_id')->constrained('options')->cascadeOnDelete()->cascadeOnUpdate();
            $table->foreignId('outcome_option_id')->nullable()->constrained('options')->nullOnDelete()->cascadeOnUpdate();
            $table->boolean('is_correct')->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('bet_sport_event');
    }
};

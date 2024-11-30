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
        Schema::create('bet_matches', function (Blueprint $table) {
            $table->id();

            $table->unsignedBigInteger('bet_id');
            $table->unsignedBigInteger('match_id');
            $table->enum('predicted_result', ['win', 'draw', 'loss']);
            $table->enum('actual_result', ['win', 'draw', 'loss'])->nullable();
            $table->boolean('is_correct')->nullable();
            $table->foreign('bet_id')->references('id')->on('bets')->cascadeOnDelete();
            $table->foreign('match_id')->references('id')->on('matches')->cascadeOnDelete();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('bet_matches');
    }
};

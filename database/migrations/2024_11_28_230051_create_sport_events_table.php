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
        Schema::create('sport_events', function (Blueprint $table) {
            $table->id();

            $table->date('match_date');
            $table->string('team1');
            $table->string('team2');
            $table->enum('sport', ['football', 'basketball', 'other']);
            $table->enum('status', ['pending', 'completed']);
            $table->enum('result', ['win', 'draw', 'loss'])->nullable();

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

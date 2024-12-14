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
        Schema::create('bets', function (Blueprint $table) {
            $table->id();

            $table->foreignId('transaction_id')->constrained('transactions')->cascadeOnDelete();
            $table->unsignedBigInteger('stake');
            $table->unsignedInteger('multiplier');
            $table->unsignedBigInteger('potential_winnings');
            $table->string('bet_status');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('bets');
    }
};

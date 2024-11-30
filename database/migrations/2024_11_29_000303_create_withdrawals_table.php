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
        Schema::create('withdrawals', function (Blueprint $table) {
            $table->id();

            $table->unsignedBigInteger('user_id');
            $table->decimal('amount', 10, 2);
            $table->enum('method', ['bank_transfer', 'paypal', 'cryptocurrency']);
            $table->enum('status', ['pending', 'processing', 'completed', 'failed']);
            $table->string('withdrawal_address')->nullable();
            $table->string('transaction_reference')->nullable();
            $table->foreign('user_id')->references('id')->on('users')->cascadeOnDelete();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('withdrawals');
    }
};

<?php

use App\Http\Controllers\AddWithdrawalAccountController;
use App\Http\Controllers\BetController;
use App\Http\Controllers\DepositController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\SettingController;
use App\Http\Controllers\SportEventController;
use App\Http\Controllers\SwervPayWebhookController;
use App\Http\Controllers\TransactionController;
use App\Http\Controllers\VerifyBankAccountController;
use App\Http\Controllers\WalletController;
use App\Http\Controllers\WithdrawalController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return redirect()->route('events');
});

Route::get('/events', [SportEventController::class, 'index'])->name('events');

Route::middleware(['auth'])->group(function () {

    Route::resource('/bets', BetController::class)
        ->only(['index', 'store'])
        ->names([
            'index' => 'bets',
            'store' => 'bets.store',
        ]);

    Route::get('/wallet', [WalletController::class, 'index'])->name('wallet');

    Route::get('/transaction', [TransactionController::class, 'index'])->name('transaction');
    Route::get('/transaction/{transaction:reference}', [TransactionController::class, 'show'])->name('transaction.show');

    Route::post('/deposit', [DepositController::class, 'store'])->name('deposit.store');

    Route::get('/withdraw', [WithdrawalController::class, 'create'])->name('withdraw');
    Route::post('/withdraw', [WithdrawalController::class, 'store'])->name('withdrawal.store');

    Route::get('/add-withdrawal-account', [AddWithdrawalAccountController::class, 'create'])->name('add-withdrawal-account');
    Route::post('/add-withdrawal-account', [AddWithdrawalAccountController::class, 'store'])->name('add-withdrawal-account.store');

    Route::post('/resolve-bank', VerifyBankAccountController::class)->name('resolve-bank');

    Route::prefix('settings')->group(function () {
        Route::get('/', SettingController::class)->name('settings');

        Route::middleware('auth')->group(function () {
            Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
            Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
            Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
        });
    });
});

Route::post('webhook/swervpay', SwervPayWebhookController::class);

require __DIR__.'/auth.php';

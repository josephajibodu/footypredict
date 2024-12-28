<?php

use App\Http\Controllers\BetController;
use App\Http\Controllers\DepositController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\SettingController;
use App\Http\Controllers\SportEventController;
use App\Http\Controllers\WalletController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return redirect()->route('events');
});

Route::get('/events', [SportEventController::class, 'index'])->name('events');

Route::middleware(['auth'])->group(function () {

    Route::resource('/bets', BetController::class)
        ->only(['index', 'store'])
        ->names([
            'index' => 'bets',
            'store' => 'bets.store'
        ]);

    Route::get('/wallet', [WalletController::class, 'index'])->name('wallet');

    Route::get('/deposit', [DepositController::class, 'index'])->name('deposit');
    Route::post('/deposit', [DepositController::class, 'store'])->name('deposit.store');
    Route::get('/deposit/{deposit:reference}', [DepositController::class, 'show'])->name('deposit.show');

    Route::prefix('settings')->group(function () {
        Route::get('/', SettingController::class)->name('settings');

        Route::middleware('auth')->group(function () {
            Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
            Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
            Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
        });
    });
});

require __DIR__.'/auth.php';
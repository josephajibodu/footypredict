<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\SettingController;
use App\Http\Controllers\SportEventController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return redirect()->route('events');
});

Route::get('/events', [SportEventController::class, 'index'])->name('events');

Route::get('/bets', function () {
    return Inertia::render('BetHistory');
})->name('bets');

Route::get('/wallet', function () {
    return Inertia::render('Wallet');
})->name('wallet');

Route::prefix('settings')->group(function () {
    Route::get('/', SettingController::class)->name('settings');

    Route::middleware('auth')->group(function () {
        Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
        Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
        Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    });
});

require __DIR__.'/auth.php';
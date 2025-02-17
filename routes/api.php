<?php


use App\Http\Controllers\API\V1\ShareBetController;
use Illuminate\Support\Facades\Route;

Route::get('/bets/share/{bet:code}', [ShareBetController::class, 'index'])->name('api.bets.share');
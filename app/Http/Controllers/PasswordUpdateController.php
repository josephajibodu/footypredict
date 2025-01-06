<?php

namespace App\Http\Controllers;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PasswordUpdateController extends Controller
{
    public function __invoke()
    {
        return Inertia::render('Profile/Password', [
            'status' => session('status'),
        ]);
    }
}

<?php

namespace App\Http\Controllers;

use App\Http\Middleware\RedirectToEvents;
use Illuminate\Http\Request;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;
use Inertia\Inertia;

class StaticPageController extends Controller implements HasMiddleware
{
    public function index()
    {
        return Inertia::render('Welcome');
    }

    public function faq()
    {
        return Inertia::render('FAQ');
    }

    public function howToPlay()
    {
        return Inertia::render('HowToPlay');
    }

    public static function middleware()
    {
       return [
           RedirectToEvents::class
       ];
    }
}

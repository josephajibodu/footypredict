<?php

namespace App\Http\Middleware;

use App\Enums\BetStatus;
use App\Http\Resources\ApiUserResource;
use App\Models\Bet;
use App\Settings\BetSetting;
use App\Settings\WalletSetting;
use Illuminate\Http\Request;
use Inertia\Middleware;
use Tighten\Ziggy\Ziggy;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        return [
            ...parent::share($request),
            'auth' => [
                'user' => $request->user() ? ApiUserResource::make($request->user()) : null,
            ],
            'stats' => [
                'open_bets' => fn() => $request->user() ? request()->user()->bets()->where('status', BetStatus::Pending)->count() : null,
            ],
            'flash' => [
                'info' => fn () => $request->session()->get('info'),
                'success' => fn () => $request->session()->get('success'),
                'error' => fn () => $request->session()->get('message'),
            ],
            'ziggy' => fn () => [
                ...(new Ziggy)->toArray(),
                'location' => $request->url(),
            ],
            'settings' => [
                'bet' => app(BetSetting::class)->toArray(),
                'wallet' => app(WalletSetting::class)->toArray(),
                'pwa' => [
                    'disabled' => config('pwa.disabled'),
                    'mobileOnly' => config('pwa.mobile_only'),
                ]
            ],
            'configs' => fn() => [
                'firebase' => [
                    'api_key' => config('services.firebase.api_key'),
                    'vapid_public_key' => config('services.firebase.vapid.public_key')
                ]
            ]
        ];
    }
}
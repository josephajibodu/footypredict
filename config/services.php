<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Third Party Services
    |--------------------------------------------------------------------------
    |
    | This file is for storing the credentials for third party services such
    | as Mailgun, Postmark, AWS and more. This file provides the de facto
    | location for this type of information, allowing packages to have
    | a conventional file to locate the various service credentials.
    |
    */

    'postmark' => [
        'token' => env('POSTMARK_TOKEN'),
    ],

    'ses' => [
        'key' => env('AWS_ACCESS_KEY_ID'),
        'secret' => env('AWS_SECRET_ACCESS_KEY'),
        'region' => env('AWS_DEFAULT_REGION', 'us-east-1'),
    ],

    'resend' => [
        'key' => env('RESEND_KEY'),
    ],

    'slack' => [
        'notifications' => [
            'bot_user_oauth_token' => env('SLACK_BOT_USER_OAUTH_TOKEN'),
            'channel' => env('SLACK_BOT_USER_DEFAULT_CHANNEL'),
        ],
    ],

    'firebase' => [
        'vapid' => [
            'public_key' => env('VITE_FIREBASE_VAPID_PUBLIC_KEY'),
            'private_key' => env('FIREBASE_VAPID_PRIVATE_KEY'),
        ],
        'api_key' => env('VITE_FIREBASE_API_KEY')
    ],

    'misc' => [
        'swervpay' => [
            'webhook_secret_key' => env('SWERVPAY_WEBHOOK_SECRET_KEY'),
            'secret_key' => env('SWERVPAY_SECRET_KEY'),
            'business_id' => env('SWERVPAY_BUSINESS_ID'),
            'sandbox' => env('SWERVPAY_SANDBOX'),
        ],
        'nowpayment' => [
            'api_key' => env('NOWPAYMENT_API_KEY'),
            'email' => env('NOWPAYMENT_EMAIL'),
            'password' => env('NOWPAYMENT_PASSWORD'),
            'sandbox' => env('NOWPAYMENT_SANDBOX'),
        ],
    ],
];

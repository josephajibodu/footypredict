<?php

namespace App\Filament\Pages;

use App\Settings\WalletSetting;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Pages\SettingsPage;
use Filament\Support\RawJs;

class ManageWalletSettings extends SettingsPage
{
    protected static ?string $navigationIcon = 'heroicon-o-cog-6-tooth';

    protected static string $settings = WalletSetting::class;

    protected static ?string $navigationGroup = 'Settings';

    public function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Section::make()
                    ->schema([

                        Forms\Components\TextInput::make('minimum_withdrawal_ngn')
                            ->label('Minimum Withdrawal (NGN)')
                            ->inlineLabel()
                            ->mask(RawJs::make('$money($input)'))
                            ->stripCharacters(',')
                            ->numeric()
                            ->required()
                            ->helperText('The minimum amount a user can withdraw.'),

                        Forms\Components\TextInput::make('maximum_withdrawal_ngn')
                            ->label('Maximum Withdrawal (NGN)')
                            ->inlineLabel()
                            ->mask(RawJs::make('$money($input)'))
                            ->stripCharacters(',')
                            ->numeric()
                            ->required()
                            ->helperText('The maximum amount a user can withdraw.'),
                    ]),

                Forms\Components\Section::make()
                    ->schema([
                        Forms\Components\TextInput::make('minimum_deposit_ngn')
                            ->label('Minimum Deposit (NGN)')
                            ->inlineLabel()
                            ->mask(RawJs::make('$money($input)'))
                            ->stripCharacters(',')
                            ->numeric()
                            ->required()
                            ->helperText('The minimum amount a user can deposit.'),

                        Forms\Components\TextInput::make('maximum_deposit_ngn')
                            ->label('Maximum Deposit (NGN)')
                            ->inlineLabel()
                            ->mask(RawJs::make('$money($input)'))
                            ->stripCharacters(',')
                            ->numeric()
                            ->required()
                            ->helperText('The maximum amount a user can deposit.'),
                    ]),
            ]);
    }
}

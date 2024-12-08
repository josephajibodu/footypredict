<?php

namespace App\Filament\Pages;

use App\Settings\BetSetting;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Pages\SettingsPage;
use Filament\Support\RawJs;

class ManageBetSettings extends SettingsPage
{
    protected static ?string $navigationIcon = 'heroicon-o-cog-6-tooth';

    protected static string $settings = BetSetting::class;

    protected static ?string $navigationGroup = 'Settings';

    public function form(Form $form): Form
    {
        return $form
            ->schema([

                Forms\Components\Section::make()
                    ->schema([
                        Forms\Components\TextInput::make('required_selections')
                            ->label('Required Selections')
                            ->numeric()
                            ->required()
                            ->helperText('The minimum number of selections required for a valid bet.'),

                        Forms\Components\TextInput::make('pool_size')
                            ->label('Pool Size')
                            ->numeric()
                            ->required()
                            ->helperText('The maximum number of bets allowed in the pool.'),

                        Forms\Components\TextInput::make('winning_multiplier')
                            ->label('Winning Multiplier')
                            ->numeric()
                            ->required()
                            ->helperText('Multiplier applied to calculate winnings.'),

                        Forms\Components\TextInput::make('min_stake')
                            ->label('Minimum Stake')
                            ->mask(RawJs::make('$money($input)'))
                            ->stripCharacters(',')
                            ->numeric()
                            ->required()
                            ->helperText('The minimum amount a user can bet.'),

                        Forms\Components\TextInput::make('max_stake')
                            ->label('Maximum Stake')
                            ->mask(RawJs::make('$money($input)'))
                            ->stripCharacters(',')
                            ->numeric()
                            ->required()
                            ->helperText('The maximum amount a user can bet.'),
                    ])

            ])->columns(1);
    }
}

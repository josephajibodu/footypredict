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

                        Forms\Components\TextInput::make('min_stake')
                            ->label('Minimum Stake')
                            ->inlineLabel()
                            ->mask(RawJs::make('$money($input)'))
                            ->stripCharacters(',')
                            ->numeric()
                            ->required()
                            ->helperText('The minimum amount a user can bet.'),

                        Forms\Components\TextInput::make('max_stake')
                            ->label('Maximum Stake')
                            ->inlineLabel()
                            ->mask(RawJs::make('$money($input)'))
                            ->stripCharacters(',')
                            ->numeric()
                            ->required()
                            ->helperText('The maximum amount a user can bet.'),

                        Forms\Components\TextInput::make('min_selection')
                            ->label('Minimum Selection')
                            ->inlineLabel()
                            ->numeric()
                            ->minValue(1)
                            ->required()
                            ->helperText('The minimum number of selections required for a valid bet.'),

                        Forms\Components\TextInput::make('max_selection')
                            ->label('Maximum Selection')
                            ->inlineLabel()
                            ->numeric()
                            ->minValue(1)
                            ->required()
                            ->live()
                            ->helperText('The minimum number of selections required for a valid bet.'),

                    ]),

            ])->columns(1);
    }
}

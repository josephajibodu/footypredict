<?php

namespace App\Filament\Pages;

use App\Settings\BetSetting;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Pages\SettingsPage;

class ManageBetMultiplierSettings extends SettingsPage
{
    protected static ?string $navigationIcon = 'heroicon-o-cog-6-tooth';

    protected static string $settings = BetSetting::class;

    protected static ?string $navigationGroup = 'Settings';

    protected static ?int $navigationSort = 2;

    public function form(Form $form): Form
    {
        return $form
            ->schema([

                Forms\Components\Section::make()
                    ->schema([
                        Forms\Components\Repeater::make('selection_config')
                            ->label('Multiplier Rule')
                            ->helperText('Define multiplier rules for each selection. For example, configure the multiplier for exact matches, flex entries, etc.')
                            ->reorderable(false)
                            ->itemLabel(fn (array $state): ?string => (
                                $state['selection']
                                        ? "{$state['selection']} Matches Selection".($state['allow_flex'] ? ' (Flex Enabled)' : ' (Flex Disabled)')
                                        : null
                            ))
                            ->collapsible()
                            ->columns(12)
                            ->minItems(1)
                            ->schema([

                                Forms\Components\TextInput::make('selection')
                                    ->numeric()
                                    ->postfix('Matches')
                                    ->minValue(1)
                                    ->columnSpan(2),

                                Forms\Components\Toggle::make('allow_flex')
                                    ->label('Allow Flex')
                                    ->reactive()
                                    ->default(true)
                                    ->inline(false)
                                    ->columnSpan(2),

                                Forms\Components\Group::make([

                                    Forms\Components\TextInput::make('main')
                                        ->numeric()
                                        ->prefixIcon('heroicon-o-x-mark')
                                        ->reactive()
                                        ->columnSpan(3)
                                        ->minValue(1)
                                        ->step(0.01),

                                    Forms\Components\TextInput::make('flex_all')
                                        ->label('Flex All')
                                        ->prefixIcon('heroicon-o-x-mark')
                                        ->columnSpan(3)
                                        ->numeric()
                                        ->step(0.01)
                                        ->disabled(fn ($get) => ! boolval($get('allow_flex'))),

                                    Forms\Components\TextInput::make('flex_1')
                                        ->label('Flex -1')
                                        ->prefixIcon('heroicon-o-x-mark')
                                        ->columnSpan(3)
                                        ->numeric()
                                        ->step(0.01)
                                        ->disabled(fn ($get) => ! boolval($get('allow_flex'))),

                                    Forms\Components\TextInput::make('flex_2')
                                        ->label('Flex -2')
                                        ->prefixIcon('heroicon-o-x-mark')
                                        ->columnSpan(3)
                                        ->numeric()
                                        ->step(0.01)
                                        ->disabled(fn ($get) => ! boolval($get('allow_flex'))),

                                ])
                                    ->columnSpan(7)
                                    ->columns(12),
                            ]),

                    ]),
            ]);
    }
}

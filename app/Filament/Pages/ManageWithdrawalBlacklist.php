<?php

namespace App\Filament\Pages;

use App\Models\User;
use App\Settings\GeneralSetting;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Pages\SettingsPage;

class ManageWithdrawalBlacklist extends SettingsPage
{
    protected static ?string $navigationIcon = 'heroicon-o-banknotes';

    protected static string $settings = GeneralSetting::class;

    protected static ?string $navigationGroup = 'Settings';

    public function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Select::make('name')
                    ->multiple()
                    ->searchable()
                    ->getSearchResultsUsing(fn (string $search): array => User::query()->where('email', 'like', "%{$search}%")->limit(50)->pluck('first_name', 'id')->toArray())
                    ->getOptionLabelsUsing(fn (array $values): array => User::query()->whereIn('id', $values)->pluck('first_name', 'id')->toArray()),


            ]);
    }
}

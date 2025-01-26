<?php

namespace App\Filament\Pages;

use App\Enums\AvailablePermission;
use App\Filament\Resources\BetResource\Widgets\BetsOverviewStat;
use App\Models\User;
use App\Models\WithdrawalBlacklist;
use Filament\Actions\Action;
use Filament\Forms\Components\MarkdownEditor;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Concerns\InteractsWithForms;
use Filament\Forms\Contracts\HasForms;
use Filament\Forms\Form;
use Filament\Pages\Page;
use Filament\Widgets\StatsOverviewWidget;

class WithdrawalBlacklistPage extends Page implements HasForms
{
    use InteractsWithForms;

    public ?array $data = [];

    protected static ?string $navigationIcon = 'heroicon-o-banknotes';

    protected static ?string $navigationGroup = 'Settings';

    protected static string $view = 'filament.pages.withdrawal-blacklist';

    public function mount(): void
    {
        $this->form->fill($this->data);
    }

    public function form(Form $form): Form
    {
        return $form
            ->schema([
                Select::make('emails')
                    ->label("Enter the email address of the users to be blacklisted")
                    ->multiple()
                    ->searchable()
                    ->getSearchResultsUsing(fn (string $search): array => User::query()->where('email', 'like', "%{$search}%")->limit(50)->pluck('email', 'id')->toArray()),
            ])
            ->statePath('data');
    }

    public function create(): void
    {
        dd($this->form->getState());

        WithdrawalBlacklist::query()->create([]);
    }

    public static function canAccess(): bool
    {
        return auth()->user()->can(AvailablePermission::AccessAdminDashboard);
    }
}

<?php

namespace App\Filament\Resources;

use App\Filament\Resources\WithdrawalBlacklistResource\Pages;
use App\Filament\Resources\WithdrawalBlacklistResource\RelationManagers;
use App\Models\User;
use App\Models\WithdrawalBlacklist;
use Filament\Forms;
use Filament\Forms\Components\Select;
use Filament\Forms\Form;
use Filament\Notifications\Notification;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class WithdrawalBlacklistResource extends Resource
{
    protected static ?string $model = WithdrawalBlacklist::class;

    protected static ?string $navigationIcon = 'heroicon-o-no-symbol';

    protected static ?string $navigationGroup = 'Transactions';

    protected static ?int $navigationSort = 6;

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\ToggleButtons::make('addition_type')
                    ->label('Type')
                    ->reactive()
                    ->options([
                        'single' => 'Single User',
                        'batch' => 'Batch Users',
                    ])
                    ->default('single')
                    ->grouped(),

                Select::make('user_ids')
                    ->label("Search and select the email addresses")
                    ->multiple()
                    ->searchable()
                    ->getSearchResultsUsing(function (string $search): array {
                        return User::query()
                            ->where('email', 'like', "%{$search}%")
                            ->whereNot('email', auth()->user()->email)
                            ->limit(50)
                            ->pluck('email', 'id')
                            ->toArray();
                    })
                    ->visible(fn ($get) => $get('addition_type') === 'batch'),

                Forms\Components\Select::make('user_id')
                    ->label('Enter the email address')
                    ->searchable()
                    ->relationship('user', 'email')
                    ->required()
                    ->visible(fn ($get) => $get('addition_type') === 'single'),

                Forms\Components\Textarea::make('reason')
                    ->columnSpanFull(),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->defaultPaginationPageOption(50)
            ->emptyStateHeading("Withdrawal blacklist empty")
            ->columns([
                Tables\Columns\TextColumn::make('user.full_name')
                    ->label('Name')
                    ->description(fn (WithdrawalBlacklist $record) => $record->user->email)
                    ->searchable(['first_name', 'last_name', 'email']),
                Tables\Columns\TextColumn::make('blacklistedBy.full_name')
                    ->label('Blacklisted By'),
                Tables\Columns\TextColumn::make('created_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
                Tables\Columns\TextColumn::make('updated_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->filters([
                //
            ])
            ->actions([
                // Tables\Actions\EditAction::make(),
                Tables\Actions\Action::make('remove')
                    ->requiresConfirmation()
                    ->action(function (WithdrawalBlacklist $record) {
                        $record->delete();

                        Notification::make()
                            ->success()
                            ->title("User removed from blacklist")
                            ->send();
                    })
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    // Tables\Actions\DeleteBulkAction::make(),
                ]),
            ]);
    }

    public static function getRelations(): array
    {
        return [
            //
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListWithdrawalBlacklists::route('/'),
//            'edit' => Pages\EditWithdrawalBlacklist::route('/{record}/edit'),
        ];
    }
}

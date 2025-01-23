<?php

namespace App\Filament\Resources;

use App\Enums\UserGender;
use App\Filament\Resources\UserResource\Pages;
use App\Filament\Resources\UserResource\RelationManagers\TransactionsRelationManager;
use App\Models\User;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Notifications\Notification;
use Filament\Resources\Resource;
use Filament\Support\RawJs;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Contracts\Support\Htmlable;
use Illuminate\Database\Eloquent\Model;

class UserResource extends Resource
{
    protected static ?string $model = User::class;

    protected static ?string $navigationIcon = 'heroicon-o-users';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Section::make('Personal Information')
                    ->schema([
                        Forms\Components\TextInput::make('first_name')
                            ->label('First Name')
                            ->required(),
                        Forms\Components\TextInput::make('last_name')
                            ->label('Last Name')
                            ->required(),
                        Forms\Components\TextInput::make('username')
                            ->label('Username')
                            ->required(),
                        Forms\Components\DatePicker::make('date_of_birth')
                            ->label('Date of Birth')
                            ->required(),
                        Forms\Components\Select::make('gender')
                            ->label('Gender')
                            ->options(UserGender::class),
                        Forms\Components\TextInput::make('nationality')
                            ->label('Nationality')
                            ->required(),
                    ])
                    ->columns(2),

                Forms\Components\Section::make('Contact Information')
                    ->schema([
                        Forms\Components\TextInput::make('email')
                            ->label('Email Address')
                            ->email()
                            ->required(),
                        Forms\Components\DateTimePicker::make('email_verified_at')
                            ->disabled()
                            ->label('Email Verified At'),
                        Forms\Components\TextInput::make('mobile_number')
                            ->label('Mobile Number'),
                    ])
                    ->columns(2),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->defaultPaginationPageOption(50)
            ->columns([
                Tables\Columns\TextColumn::make('full_name')
                    ->label('Name')
                    ->description(fn (User $record) => $record->email)
                    ->searchable(['first_name', 'last_name', 'email']),
                Tables\Columns\TextColumn::make('username')
                    ->description(fn (User $record) => "Bal: " . to_money($record->balance))
                    ->sortable()
                    ->searchable(),
                Tables\Columns\TextColumn::make('mobile_number'),
                Tables\Columns\IconColumn::make('email_verified_at')
                    ->label('Verified')
                    ->boolean()
                    ->alignCenter(),
                Tables\Columns\TextColumn::make('nationality')
                    ->description(fn (User $record) => "Currency: " . $record->currency->name),
                Tables\Columns\TextColumn::make('date_of_birth')
                    ->date()
                    ->sortable(),
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
                Tables\Actions\ActionGroup::make([
                    Tables\Actions\ViewAction::make(),
                    Tables\Actions\EditAction::make(),
                    Tables\Actions\Action::make('credit_user')
                        ->icon('heroicon-o-banknotes')
                        ->label('Credit User')
                        ->modalSubmitActionLabel('Credit User')
                        ->form([
                            Forms\Components\TextInput::make('amount')
                                ->minValue(1)
                                ->mask(RawJs::make('$money($input)'))
                                ->stripCharacters(',')
                                ->numeric()
                                ->required(),
                            Forms\Components\TextInput::make('reason')
                                ->required(),
                        ])
                        ->action(function (User $record, array $data) {
                            try {
                                $record->credit($data["amount"], $data["reason"]);

                                Notification::make()
                                    ->color("success")
                                    ->success()
                                    ->title("User account credited")
                                    ->send();
                            } catch (\Exception $ex) {
                                report($ex);

                                Notification::make()
                                    ->danger()
                                    ->title($ex->getMessage())
                                    ->send();
                            }
                        }),

                ])
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
            TransactionsRelationManager::class
        ];
    }

    public static function getGloballySearchableAttributes(): array
    {
        return ['first_name', 'last_name', 'username', 'email'];
    }

    public static function getGlobalSearchResultTitle(Model $record): string|Htmlable
    {
        return "$record->first_name $record->last_name";
    }

    public static function getGlobalSearchResultDetails(Model $record): array
    {
        return [
            'Username' => $record->username,
            'Email' => "$record->email",
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListUsers::route('/'),
            'create' => Pages\CreateUser::route('/create'),
            'view' => Pages\ViewUser::route('/{record}/view'),
            'edit' => Pages\EditUser::route('/{record}/edit'),
        ];
    }
}

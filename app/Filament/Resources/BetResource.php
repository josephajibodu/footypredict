<?php

namespace App\Filament\Resources;

use App\Enums\BetStatus;
use App\Filament\Resources\BetResource\Pages;
use App\Filament\Resources\BetResource\RelationManagers\BetSportEventRelationManager;
use App\Filament\Resources\BetResource\RelationManagers\SportEventsRelationManager;
use App\Models\Bet;
use App\Models\Transaction;
use App\Models\User;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;

class BetResource extends Resource
{
    protected static ?string $model = Bet::class;

    protected static ?string $navigationIcon = 'heroicon-o-newspaper';

    protected static ?string $navigationGroup = 'Bet';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\TextInput::make('user_id')
                    ->label("Username")
                    ->formatStateUsing(fn(Bet $record) => $record->user->username)
                    ->disabled(),
                Forms\Components\TextInput::make('stake')
                    ->required()
                    ->disabled()
                    ->formatStateUsing(fn($state) => to_money($state, 100)),
                Forms\Components\TextInput::make('potential_winnings')
                    ->required()
                    ->disabled()
                    ->formatStateUsing(fn($state) => to_money($state, 100)),
                Forms\Components\ToggleButtons::make('status')
                    ->inline()
                    ->grouped()
                    ->options(BetStatus::class)
                    ->disabled(),

                Forms\Components\Section::make('Multiplier Settings')
                    ->schema([

                        Forms\Components\TextInput::make('multiplier_settings.main')
                            ->numeric()
                            ->prefixIcon('heroicon-o-x-mark')
                            ->reactive()
                            ->columnSpan(3)
                            ->minValue(1)
                            ->disabled(),

                        Forms\Components\TextInput::make('multiplier_settings.flex_0')
                            ->label('Flex All')
                            ->prefixIcon('heroicon-o-x-mark')
                            ->columnSpan(3)
                            ->numeric()
                            ->step(0.01)
                            ->disabled(),

                        Forms\Components\TextInput::make('multiplier_settings.flex_1')
                            ->label('Flex -1')
                            ->prefixIcon('heroicon-o-x-mark')
                            ->columnSpan(3)
                            ->numeric()
                            ->step(0.01)
                            ->disabled(),

                        Forms\Components\TextInput::make('flex_2')
                            ->label('Flex -2')
                            ->prefixIcon('heroicon-o-x-mark')
                            ->columnSpan(3)
                            ->numeric()
                            ->step(0.01)
                            ->disabled(),

                    ])
                    ->columns(12)
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('user.username')
                    ->description(fn(Bet $record) => $record->reference)
                    ->searchable(['reference']),
                Tables\Columns\TextColumn::make('stake')
                    ->numeric()
                    ->formatStateUsing(fn(Bet $record) => to_money($record->stake, 100))
                    ->sortable(),
                Tables\Columns\TextColumn::make('potential_winnings')
                    ->numeric()
                    ->formatStateUsing(fn(Bet $record) => to_money($record->potential_winnings, 100))
                    ->sortable(),
                Tables\Columns\TextColumn::make('sport_events_count')
                    ->counts('sportEvents')
                    ->alignCenter(),
                Tables\Columns\IconColumn::make('is_flexed'),
                Tables\Columns\TextColumn::make('status')
                    ->badge()
                    ->searchable(),
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
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                ]),
            ]);
    }

    public static function getRelations(): array
    {
        return [
            BetSportEventRelationManager::class
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListBets::route('/'),
            'create' => Pages\CreateBet::route('/create'),
            'edit' => Pages\EditBet::route('/{record}/edit'),
        ];
    }
}

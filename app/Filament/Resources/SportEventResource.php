<?php

namespace App\Filament\Resources;

use App\Filament\Resources\SportEventResource\Pages;
use App\Filament\Resources\SportEventResource\RelationManagers;
use App\Models\SportEvent;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class SportEventResource extends Resource
{
    protected static ?string $model = SportEvent::class;

    protected static ?string $navigationIcon = 'heroicon-o-rectangle-stack';

    protected static ?string $navigationLabel = 'Matches';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\DatePicker::make('match_date')
                    ->required(),
                Forms\Components\TextInput::make('kickoff_time')
                    ->required(),
                Forms\Components\TextInput::make('team1_id')
                    ->required()
                    ->numeric(),
                Forms\Components\TextInput::make('team2_id')
                    ->required()
                    ->numeric(),
                Forms\Components\TextInput::make('league_id')
                    ->numeric(),
                Forms\Components\TextInput::make('sport')
                    ->required(),
                Forms\Components\TextInput::make('status')
                    ->required(),
                Forms\Components\TextInput::make('team1_score')
                    ->numeric(),
                Forms\Components\TextInput::make('team2_score')
                    ->numeric(),
                Forms\Components\TextInput::make('season'),
                Forms\Components\TextInput::make('match_week')
                    ->numeric(),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('match_date')
                    ->date()
                    ->sortable(),
                Tables\Columns\TextColumn::make('kickoff_time'),
                Tables\Columns\TextColumn::make('team1_id')
                    ->numeric()
                    ->sortable(),
                Tables\Columns\TextColumn::make('team2_id')
                    ->numeric()
                    ->sortable(),
                Tables\Columns\TextColumn::make('league_id')
                    ->numeric()
                    ->sortable(),
                Tables\Columns\TextColumn::make('sport')
                    ->searchable(),
                Tables\Columns\TextColumn::make('status')
                    ->searchable(),
                Tables\Columns\TextColumn::make('team1_score')
                    ->numeric()
                    ->sortable(),
                Tables\Columns\TextColumn::make('team2_score')
                    ->numeric()
                    ->sortable(),
                Tables\Columns\TextColumn::make('season')
                    ->searchable(),
                Tables\Columns\TextColumn::make('match_week')
                    ->numeric()
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
                Tables\Actions\EditAction::make(),
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
            //
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListSportEvents::route('/'),
            'create' => Pages\CreateSportEvent::route('/create'),
            'edit' => Pages\EditSportEvent::route('/{record}/edit'),
        ];
    }
}

<?php

namespace App\Filament\Resources;

use App\Enums\SportEventStatus;
use App\Enums\SportEventType;
use App\Filament\Resources\SportEventResource\Pages;
use App\Filament\Resources\SportEventResource\RelationManagers;
use App\Models\SportEvent;
use Carbon\Carbon;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;
use Illuminate\Support\HtmlString;
use Illuminate\Validation\ValidationException;

class SportEventResource extends Resource
{
    protected static ?string $model = SportEvent::class;

    protected static ?string $navigationIcon = 'heroicon-o-ticket';

    protected static ?string $navigationGroup = 'Match';

    protected static ?string $navigationLabel = 'Matches';

    protected static ?string $label = 'Match';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Section::make()
                    ->schema([

                        Forms\Components\Select::make('team1_id')
                            ->relationship(name: 'team1', titleAttribute: 'short_name')
                            ->searchable(['name', 'short_name', 'short_code'])
                            ->required(),
                        Forms\Components\Select::make('team2_id')
                            ->relationship(name: 'team2', titleAttribute: 'short_name')
                            ->searchable(['name', 'short_name', 'short_code'])
                            ->required(),

                        Forms\Components\TextInput::make('team1_score')
                            ->hidden(fn() => $form->getOperation() === 'create')
                            ->numeric(),

                        Forms\Components\TextInput::make('team2_score')
                            ->hidden(fn() => $form->getOperation() === 'create')
                            ->numeric(),

                    ])->columns(2),

                Forms\Components\Group::make([
                    Forms\Components\Section::make()
                        ->schema([

                            Forms\Components\DatePicker::make('match_date')
                                ->required(),
                            Forms\Components\TimePicker::make('kickoff_time')
                                ->required(),
                            Forms\Components\Select::make('status')
                                ->hidden(fn() => $form->getOperation() === 'create')
                                ->options(SportEventStatus::class)
                                ->required(),

                        ])->columnSpan(6),

                    Forms\Components\Section::make()
                        ->schema([

                            Forms\Components\Select::make('league_id')
                                ->relationship(name: 'league', titleAttribute: 'short_code')
                                ->preload()
                                ->searchable(['name', 'short_code'])
                                ->required(),
                            Forms\Components\Select::make('sport')
                                ->disabled()
                                ->hidden(fn() => $form->getOperation() === 'create')
                                ->options(SportEventType::class)
                                ->required(),
                            Forms\Components\TextInput::make('season')
                                ->hidden(fn() => $form->getOperation() === 'create')
                                ->helperText('Optional'),
                            Forms\Components\TextInput::make('match_week')
                                ->hidden(fn() => $form->getOperation() === 'create')
                                ->helperText('Optional')
                                ->numeric(),

                        ])->columnSpan(6),
                ])->columns(12)
                ->columnSpan(12),

            ])->columns(12);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->defaultPaginationPageOption(50)
            ->columns([
                Tables\Columns\TextColumn::make('match_date')
                    ->date()
                    ->description(fn(SportEvent $record) => Carbon::parse($record->kickoff_time)->format('H:i a'))
                    ->sortable(),
                Tables\Columns\TextColumn::make('team1.short_name')
                    ->numeric()
                    ->sortable(),
                Tables\Columns\TextColumn::make('team2.short_name')
                    ->numeric()
                    ->sortable(),
                Tables\Columns\TextColumn::make('league.short_code')
                    ->numeric()
                    ->sortable(),
                Tables\Columns\TextColumn::make('status')
                    ->badge(),
                Tables\Columns\TextColumn::make('score')
                    ->alignCenter()
                    ->formatStateUsing(fn(SportEvent $record) => "$record->team1_score : $record->team2_score"),
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
                Tables\Filters\Filter::make('match_date')
                    ->form([
                        Forms\Components\DatePicker::make('match_date')
                            ->default(today()),
                    ])
                    ->query(function (Builder $query, array $data): Builder {
                        return $query
                            ->when(
                                $data['match_date'],
                                fn (Builder $query, $date): Builder => $query->whereDate('match_date', $date),
                            );
                    }),

                Tables\Filters\SelectFilter::make('status')
                    ->options(SportEventStatus::class)
            ],  layout: Tables\Enums\FiltersLayout::AboveContent)
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
            RelationManagers\OptionsRelationManager::class
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

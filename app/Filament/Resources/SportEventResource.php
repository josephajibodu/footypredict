<?php

namespace App\Filament\Resources;

use App\Actions\Matches\UpdateScores;
use App\Actions\Matches\UpdateSportEventStatus;
use App\Enums\SportEventStatus;
use App\Enums\SportEventType;
use App\Filament\Resources\SportEventResource\Pages;
use App\Filament\Resources\SportEventResource\RelationManagers;
use App\Models\SportEvent;
use App\Models\Team;
use Carbon\Carbon;
use Exception;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\HtmlString;

class SportEventResource extends Resource
{
    protected static ?string $model = SportEvent::class;

    protected static ?string $navigationIcon = 'heroicon-o-ticket';

    protected static ?string $navigationGroup = 'Match';

    protected static ?string $navigationLabel = 'Matches';

    protected static ?string $label = 'Match';

    protected static ?int $navigationSort = 3;

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Section::make()
                    ->schema([

                        Forms\Components\Select::make('team1_id')
                            ->relationship(name: 'team1', titleAttribute: 'short_name')
                            ->searchable(['name', 'short_name', 'short_code'])
                            ->preload()
                            ->required()
                            ->reactive()
                            ->afterStateUpdated(function ($state, callable $set) {
                                $set('team2_id', null);
                            }),
                        Forms\Components\Select::make('team2_id')
                            ->relationship(name: 'team2', titleAttribute: 'short_name')
                            ->searchable(['name', 'short_name', 'short_code'])
                            ->preload()
                            ->required()
                            ->reactive()
                            ->options(function (callable $get) {
                                $team1Id = $get('team1_id');

                                return Team::query()
                                    ->when($team1Id, function ($query) use ($team1Id) {
                                        $query->where('id', '!=', $team1Id);
                                    })
                                    ->pluck('short_name', 'id')
                                    ->toArray();
                            }),

                        Forms\Components\TextInput::make('team1_score')
                            ->disabled()
                            ->hidden(fn () => $form->getOperation() === 'create')
                            ->numeric(),

                        Forms\Components\TextInput::make('team2_score')
                            ->disabled()
                            ->hidden(fn () => $form->getOperation() === 'create')
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
                                ->disabled()
                                ->hidden(fn () => $form->getOperation() === 'create')
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
                                ->hidden(fn () => $form->getOperation() === 'create')
                                ->options(SportEventType::class)
                                ->required(),
                            Forms\Components\TextInput::make('season')
                                ->hidden(fn () => $form->getOperation() === 'create')
                                ->helperText('Optional'),
                            Forms\Components\TextInput::make('match_week')
                                ->hidden(fn () => $form->getOperation() === 'create')
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
                    ->description(fn (SportEvent $record) => Carbon::parse($record->kickoff_time)->format('h:i A'))
                    ->sortable(),
                Tables\Columns\TextColumn::make('team1.short_name')
                    ->label('Match')
                    ->formatStateUsing(fn(SportEvent $record) => new HtmlString("
                        <div class='flex items-center'>
                            <div class='text-gray-400 text-xs'>vs</div>
                            <div>
                                <div>{$record->team1->name}</div>
                                <div>{$record->team2->name}</div>
                            </div>
                        </div>
                    ")),
                Tables\Columns\TextColumn::make('league.short_code')
                    ->numeric()
                    ->sortable(),
                Tables\Columns\TextColumn::make('status')
                    ->badge(),
                Tables\Columns\TextColumn::make('score')
                    ->alignCenter()
                    ->getStateUsing(fn (SportEvent $record) => "$record->team1_score : $record->team2_score"),
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
                    ->options(SportEventStatus::class),
            ], layout: Tables\Enums\FiltersLayout::AboveContent)
            ->actions([
                Tables\Actions\ActionGroup::make([
                    Tables\Actions\Action::make('update_score')
                        ->label('Update Score')
                        ->icon('heroicon-o-puzzle-piece')
                        ->modalHeading('Score Board')
                        ->modalSubmitActionLabel('Update')
                        ->form([
                            Forms\Components\Split::make([
                                Forms\Components\TextInput::make('team1_score')
                                    ->label(fn (SportEvent $record) => $record->team1->name)
                                    ->numeric()
                                    ->formatStateUsing(fn (SportEvent $record) => $record->team1_score),
                                Forms\Components\TextInput::make('team2_score')
                                    ->label(fn (SportEvent $record) => $record->team2->name)
                                    ->numeric()
                                    ->formatStateUsing(fn (SportEvent $record) => $record->team2_score),
                            ]),
                        ])
                        ->action(function (UpdateScores $updateScores, SportEvent $record, Tables\Actions\Action $action, array $data) {

                            try {
                                $updateScores($record, $data);
                                $action->success();
                            } catch (Exception $ex) {
                                report($ex);
                                $action->failure();
                                $action->halt();
                            }
                        })
                        ->successNotificationTitle('Match score updated'),

                    Tables\Actions\Action::make('update_status')
                        ->label('Update Status')
                        ->icon('heroicon-o-sparkles')
                        ->modalHeading('Update Match Status')
                        ->modalDescription("Once a match is completed, the status can't be changed again.")
                        ->modalSubmitActionLabel('Update')
                        ->form([
                            Forms\Components\ToggleButtons::make('status')
                                ->label('')
                                ->live()
                                ->formatStateUsing(fn(SportEvent $record) => $record->status)
                                ->options(SportEventStatus::class)
                                ->grouped(),

                            Forms\Components\TextInput::make('confirm')
                                ->required()
                                ->hidden(function (Forms\Get $get, Forms\Set $set, SportEvent $record) {

                                    $status = $get('status') ?? $record->status;

                                    if ( $status == SportEventStatus::Completed
                                        || $status == SportEventStatus::Cancelled
                                        || $status == SportEventStatus::Postponed ) {
                                        return false;
                                    }
                                    return true;
                                })
                                ->label(fn() => new HtmlString("To confirm, type \"<b>confirm</b>\" in the box below"))
                        ])
                        ->action(function (UpdateSportEventStatus $updateSportEventStatus, SportEvent $record, Tables\Actions\Action $action, array $data) {
                            if (isset($data['confirm']) && $data['confirm'] !== 'confirm') {
                                $action->failureNotificationTitle('Invalid confirmation text. To confirm, type "confirm" in the box below');
                                $action->failure();
                                $action->halt();
                            }

                            try {
                                $updateSportEventStatus($record, $data['status']);
                                $action->success();
                            } catch (Exception $ex) {
                                report($ex);
                                $action->failure();
                                $action->halt();
                            }
                        })
                        ->successNotificationTitle('Match status updated')
                        ->failureNotificationTitle('Error occurred while updating match status'),

                    Tables\Actions\EditAction::make()
                        ->label('Edit Match'),
                ])->button()
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
            RelationManagers\OptionsRelationManager::class,
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

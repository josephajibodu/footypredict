<?php

namespace App\Filament\Resources;

use App\Actions\Bets\CancelBet;
use App\Enums\BetStatus;
use App\Filament\Resources\BetResource\Pages;
use App\Filament\Resources\BetResource\RelationManagers\BetSportEventRelationManager;
use App\Filament\Resources\BetResource\Widgets\BetsOverviewStat;
use App\Models\Bet;
use Carbon\Carbon;
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

    public static function getEloquentQuery(): Builder
    {
        return parent::getEloquentQuery()->latest();
    }

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\TextInput::make('user_id')
                    ->label('Username')
                    ->formatStateUsing(fn (Bet $record) => $record->user->username)
                    ->disabled(),
                Forms\Components\TextInput::make('stake')
                    ->required()
                    ->disabled()
                    ->formatStateUsing(fn ($state) => to_money($state, 100)),
                Forms\Components\TextInput::make('potential_winnings')
                    ->required()
                    ->disabled()
                    ->formatStateUsing(fn ($state) => to_money($state, 100)),
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

                        Forms\Components\TextInput::make('multiplier_settings.flex_2')
                            ->label('Flex -2')
                            ->prefixIcon('heroicon-o-x-mark')
                            ->columnSpan(3)
                            ->numeric()
                            ->step(0.01)
                            ->disabled(),

                    ])
                    ->columns(12),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->defaultPaginationPageOption(50)
            ->columns([
                Tables\Columns\TextColumn::make('user.username')
                    ->description(fn (Bet $record) => $record->reference)
                    ->searchable(['reference']),
                Tables\Columns\TextColumn::make('stake')
                    ->numeric()
                    ->formatStateUsing(fn (Bet $record) => to_money($record->stake, 100))
                    ->sortable(),
                Tables\Columns\TextColumn::make('potential_winnings')
                    ->numeric()
                    ->formatStateUsing(fn (Bet $record) => to_money($record->potential_winnings, 100))
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
                Tables\Filters\Filter::make('created_at')
                    ->form([
                        Forms\Components\Split::make([
                            Forms\Components\DatePicker::make('from')
                                ->default(now()),
                            Forms\Components\DatePicker::make('until')
                                ->default(now()),
                        ])
                    ])
                    ->indicateUsing(function (array $data): ?array {
                        $indicators = [];

                        if ($data['from'] ?? null) {
                            $indicators[] = Tables\Filters\Indicator::make('From ' . Carbon::parse($data['from'])->toFormattedDateString())
                                ->removeField('from');
                        }

                        if ($data['until'] ?? null) {
                            $indicators[] = Tables\Filters\Indicator::make('To ' . Carbon::parse($data['until'])->toFormattedDateString())
                                ->removeField('until');
                        }

                        return $indicators;
                    })
                    ->query(function (Builder $query, array $data): Builder {
                        return $query
                            ->when(
                                $data['from'],
                                fn (Builder $query, $date): Builder => $query->whereDate('created_at', '>=', $date),
                            )
                            ->when(
                                $data['until'],
                                fn (Builder $query, $date): Builder => $query->whereDate('created_at', '<=', $date),
                            );
                    })
            ], layout: Tables\Enums\FiltersLayout::AboveContentCollapsible)
            ->actions([
                Tables\Actions\ActionGroup::make([
                    // Tables\Actions\EditAction::make(),
                    Tables\Actions\Action::make('view_bet')
                        ->label('View Slip')
                        ->icon('heroicon-o-newspaper')
                        ->url(fn(Bet $record) => route('bets.share', $record))
                        ->openUrlInNewTab(),
                    Tables\Actions\Action::make('cancel_bet')
                        ->label('Cancel Bet')
                        ->icon('heroicon-o-x-mark')
                        ->color('danger')
                        ->action(function (Bet $record, CancelBet $cancelBet, Tables\Actions\Action $action) {
                            $cancelBet($record);

                            $action->success();
                        })
                        ->successNotificationTitle("Bet cancelled successfully and the user refunded.")
                ])
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    // Tables\Actions\DeleteBulkAction::make(),
                ]),
            ]);
    }

    public static function getWidgets(): array
    {
        return [
            BetsOverviewStat::class,
        ];
    }

    public static function getRelations(): array
    {
        return [
            BetSportEventRelationManager::class,
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

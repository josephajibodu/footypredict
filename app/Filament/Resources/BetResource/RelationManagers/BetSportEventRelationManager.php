<?php

namespace App\Filament\Resources\BetResource\RelationManagers;

use App\Models\BetSportEvent;
use App\Models\SportEvent;
use Carbon\Carbon;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\RelationManagers\RelationManager;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Relations\Relation;
use Illuminate\Database\Eloquent\SoftDeletingScope;
use Illuminate\Support\HtmlString;

class BetSportEventRelationManager extends RelationManager
{
    protected static string $relationship = 'betSportEvent';

    public function form(Form $form): Form
    {
        return $form
            ->schema([

            ]);
    }

    public function table(Table $table): Table
    {
        return $table
            ->recordTitleAttribute('id')
            ->heading("Selected Matches")
            ->columns([
                Tables\Columns\TextColumn::make('sportEvent.match_date')
                    ->date()
                    ->description(fn (BetSportEvent $record) => Carbon::parse($record->sportEvent->kickoff_time)->format('h:i A'))
                    ->sortable(),
                Tables\Columns\TextColumn::make('sportEvent')
                    ->label('Match')
                    ->formatStateUsing(fn(BetSportEvent $record) => new HtmlString("
                        <div class='flex items-center'>
                            <div class='text-gray-400 text-xs'>vs</div>
                            <div>
                                <div>{$record->sportEvent->team1->name}</div>
                                <div>{$record->sportEvent->team2->name}</div>
                            </div>
                        </div>
                    ")),
                Tables\Columns\TextColumn::make('sportEvent.status')
                    ->badge(),
                Tables\Columns\TextColumn::make('selectedOption.type')
                    ->badge(),
                Tables\Columns\TextColumn::make('outcomeOption.type')
                    ->badge(),
            ])
            ->filters([
                //
            ])
            ->headerActions([
            ])
            ->actions([
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                ]),
            ]);
    }
}

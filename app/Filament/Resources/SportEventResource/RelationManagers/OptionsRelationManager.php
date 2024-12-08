<?php

namespace App\Filament\Resources\SportEventResource\RelationManagers;

use App\Enums\MatchOption;
use App\Models\Option;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\RelationManagers\RelationManager;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class OptionsRelationManager extends RelationManager
{
    protected static string $relationship = 'options';

    public function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\TextInput::make('type')
                    ->required()
                    ->maxLength(255),
            ]);
    }

    public function table(Table $table): Table
    {
        return $table
            ->recordTitleAttribute('type')
            ->columns([
                Tables\Columns\TextColumn::make('type')
                    ->label('')
                    ->formatStateUsing(fn(MatchOption $state) => $state->label()),
                Tables\Columns\SelectColumn::make('value')
                    ->label('Outcome')
                    ->alignCenter()
                    ->options([
                        true => 'Yes',
                        false => 'No',
                        null => 'Not yet decided'
                    ])
                    ->default(null)
            ])
            ->paginated(false)
            ->filters([
                //
            ])
            ->headerActions([
                // Tables\Actions\CreateAction::make(),
            ])
            ->actions([
                // Tables\Actions\EditAction::make(),
                // Tables\Actions\DeleteAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    // Tables\Actions\DeleteBulkAction::make(),
                ]),
            ]);
    }
}

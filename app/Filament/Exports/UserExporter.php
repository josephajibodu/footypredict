<?php

namespace App\Filament\Exports;

use App\Enums\UserGender;
use App\Models\User;
use Filament\Actions\Exports\Enums\ExportFormat;
use Filament\Actions\Exports\ExportColumn;
use Filament\Actions\Exports\Exporter;
use Filament\Actions\Exports\Models\Export;

class UserExporter extends Exporter
{
    protected static ?string $model = User::class;

    public static function getColumns(): array
    {
        return [
            ExportColumn::make('id')
                ->label('ID'),
            ExportColumn::make('first_name'),
            ExportColumn::make('last_name'),
            ExportColumn::make('username'),
            ExportColumn::make('mobile_number'),
            ExportColumn::make('gender')
                ->formatStateUsing(fn (?UserGender $state) => $state?->value),
            ExportColumn::make('email'),
            ExportColumn::make('email_verified_at')
                ->enabledByDefault(false),
            ExportColumn::make('nationality')
                ->enabledByDefault(false),
            ExportColumn::make('currency')
                ->enabledByDefault(false),
            ExportColumn::make('date_of_birth')
                ->enabledByDefault(false),
            ExportColumn::make('created_at')
                ->label('Reg. Date'),
        ];
    }

    public static function getCompletedNotificationBody(Export $export): string
    {
        $body = 'Your user export has completed and ' . number_format($export->successful_rows) . ' ' . str('row')->plural($export->successful_rows) . ' exported.';

        if ($failedRowsCount = $export->getFailedRowsCount()) {
            $body .= ' ' . number_format($failedRowsCount) . ' ' . str('row')->plural($failedRowsCount) . ' failed to export.';
        }

        return $body;
    }

    public function getFormats(): array
    {
        return [
            ExportFormat::Csv
        ];
    }

    public function getFileName(Export $export): string
    {
        return "users-list-{$export->getKey()}.csv";
    }
}

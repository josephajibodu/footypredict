<?php

namespace App\Filament\Resources\WithdrawalBlacklistResource\Pages;

use App\Filament\Resources\WinningResource\Widgets\WinningStatOverview;
use App\Filament\Resources\WithdrawalBlacklistResource;
use App\Models\WithdrawalBlacklist;
use Filament\Actions;
use Filament\Resources\Pages\ListRecords;

class ListWithdrawalBlacklists extends ListRecords
{
    protected static string $resource = WithdrawalBlacklistResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\CreateAction::make()
                ->icon('heroicon-o-plus')
                ->modalSubmitActionLabel('Add to Blacklist')
                ->modalHeading('Add User(s) to Withdrawal Blacklist')
                ->createAnother(false)
                ->label('Add User')
                ->using(function (array $data, Actions\Action $action) {
                    if ($data['addition_type'] === 'single') {
                        $userIds = [$data['user_id']];
                    } else {
                        $userIds = $data['user_ids'];
                    }

                    foreach ($userIds as $userId) {
                        WithdrawalBlacklist::query()->create([
                            'user_id' => $userId,
                            'reason' => $data['reason'],
                            'blacklisted_by' => auth()->id(),
                        ]);
                    }

                })
                ->successNotificationTitle("User added to withdrawal blacklist")

        ];
    }
}

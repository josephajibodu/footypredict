<?php

namespace App\Http\Resources;

use App\Models\Withdrawal;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * @mixin Withdrawal
 */
class ApiWithdrawalResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'transaction_id' => $this->transaction_id,
            'type' => $this->type->value,
            'withdrawal_address' => $this->withdrawal_address,
            'account_name' => $this->account_name,
            'bank_name' => $this->bank_name,
            'account_number' => $this->account_number,
            'created_at' => $this->created_at?->toIso8601String(),
            'updated_at' => $this->updated_at?->toIso8601String(),

            'transaction' => ApiTransactionResource::make($this->whenLoaded('transaction')),
        ];
    }
}

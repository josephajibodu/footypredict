<?php

namespace App\Http\Resources;

use App\Models\WithdrawalAccount;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * @mixin WithdrawalAccount
 */
class ApiWithdrawalAccountResource extends JsonResource
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
            'account_name' => $this->account_name,
            'bank_name' => $this->bank_name,
            'account_number' => $this->account_number,
            'payment_provider' => $this->payment_provider,
            'type' => $this->type->value,
            'bank_code' => $this->bank_code,
            'is_default' => $this->is_default,
            'metadata' => $this->metadata,
            'created_at' => $this->created_at?->toIso8601String(),
            'updated_at' => $this->updated_at?->toIso8601String(),
        ];
    }
}

<?php

namespace App\Http\Resources;

use App\Models\Transaction;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * @mixin Transaction
 */
class ApiTransactionResource extends JsonResource
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
            'user_id' => $this->user_id,
            'description' => $this->description,
            'reference' => $this->reference,
            'amount' => $this->amount / 100,
            'balance' => $this->balance / 100,
            'type' => $this->type->value,
            'status' => $this->status->value,

            'bet' => $this->whenLoaded('bet'),
            'winning' => $this->whenLoaded('winning'),
            'withdrawal' => $this->whenLoaded('withdrawal'),
            'deposit' => ApiDepositResource::make($this->whenLoaded('deposit')),
            'refund' => $this->whenLoaded('refund'),

            'created_at' => $this->created_at?->toIso8601String(),
            'updated_at' => $this->updated_at?->toIso8601String(),
        ];
    }
}

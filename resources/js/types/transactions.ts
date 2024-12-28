export interface Transaction {
    id: number;
    user_id: number;
    reference: string;
    amount: number;
    balance: number;
    type: TransactionType;
    status: TransactionStatus;
    created_at: string;
    updated_at: string;
    deposit?: Deposit;
}

export interface Deposit {
    id: number;
    transaction_id: number;
    method: "bank_transfer" | "card" | "crypto" | string;
    metadata: SwervPayDepositMetadata;
    created_at: string;
    updated_at: string;
}

export interface SwervPayDepositMetadata {
    id: string;
    reference: string;
    address: string | null;
    account_number: string;
    account_name: string;
    bank_code: string;
    bank_name: string;
    bank_address: string | null;
    account_type: string | null;
    routing_number: string | null;
    balance: number;
    total_received: number;
    pending_balance: number;
    status: string;
    created_at: string;
    updated_at: string;
}

export enum TransactionStatus {
    Pending = "pending",
    Completed = "completed",
    Failed = "failed",
    Cancelled = "cancelled",
}

export enum TransactionType {
    Bet = "bet",
    Winning = "winning",
    Withdrawal = "withdrawal",
    Deposit = "deposit",
    Refunds = "refunds",
}
import {Bet, User} from "@/types/index";
import {TransactionStatus, TransactionType, WithdrawalAccountType} from "@/types/enums";

export interface Transaction {
    id: number;
    user_id: number;
    description: string;
    reference: string;
    amount: number;
    balance: number;
    type: TransactionType;
    status: TransactionStatus;
    created_at: string;
    updated_at: string;

    deposit?: Deposit;
    bet?: Bet,
    withdrawal?: Withdrawal;
}

export interface Deposit {
    id: number;
    transaction_id: number;
    method: "bank_transfer" | "card" | "crypto" | string;
    metadata: SwervPayDepositMetadata;
    amount_received: number;
    fee: number;
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

export interface WithdrawalAccount {
    id: number;

    account_name?: string;
    bank_name?: string;
    account_number: string;
    payment_provider?: string;
    type: WithdrawalAccountType;
    bank_code?: string;
    is_default: boolean;
    metadata: Record<string, any>;

    created_at?: string;
    updated_at?: string;

    user?: User;
}

export interface Withdrawal {
    id: number;

    transaction_id: string | number;
    type: WithdrawalAccountType;

    withdrawal_address?: string | null;

    account_name?: string | null;
    bank_name?: string | null;
    account_number?: string | null;

    created_at?: string | null;
    updated_at?: string | null;

    transaction?: Transaction;
}
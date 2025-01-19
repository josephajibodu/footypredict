import {SelectedSportEvent} from "@/types/index";

export enum BetStatus {
    Pending = "pending",
    Won = "won",
    Lost = "lost",
    Canceled = "canceled",
}

export enum SportEventStatus {
    Pending = "pending",
    InProgress = "progressing",
    Completed = "completed",
    Postponed = "postponed",
    Canceled = "cancelled",
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

export enum WithdrawalAccountType {
    FiatBank = 'bank',
    CryptoWalletAddress = 'crypto-wallet-address',
}
export enum BetStatus {
    Pending = "pending",
    Won = "won",
    Lost = "lost",
    Canceled = "canceled",
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
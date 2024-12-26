import { Config } from 'ziggy-js';
import {MatchOption} from "@/enums/MatchOption";

export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at?: string;
}

export interface SportEvent {
    id: number;
    match_date: string;
    kickoff_time: string;
    sport: string;
    status: "Pending" | "Completed" | "Cancelled";
    team1_score?: number | null;
    team2_score?: number | null;
    main_outcome?: string | null;
    season?: string | null;
    match_week?: number | null;

    team1: Team,
    team2: Team
}

export interface SelectedSportEvent extends SportEvent {
    betOption: MatchOption;
}

export interface Team {
    id: number;
    name: string;
    short_name: string;
    short_code: string;
    logo_url: string;
    country: string;
}

export interface BetSetting {
    required_selections : number;
    pool_size : number;
    winning_multiplier : number;
    min_stake : number;
    max_stake : number;
}


export interface WalletSetting {
    minimum_deposit_ngn : number;
    minimum_deposit_usdt : number;
}

export interface Bet {
    id: number;
    user_id: number;
    transaction_id: number;
    stake: number;
    multiplier: number;
    potential_winnings: number;
    status: BetStatus;
    created_at: Date | null;
    updated_at: Date | null;

    user: User;
    transaction: Transaction;
    sportEvents: SportEvent[];
}

export interface Transaction {
    id: number;
    user_id: number;
    reference: string;
    amount: string;
    type: TransactionType;
    status: TransactionStatus;
    balance: number;
    created_at: Date | null;
    updated_at: Date | null;

    user: User;
    bet: Bet | null;
    winning: Winning | null;
    withdrawal: Withdrawal | null;
    deposit: Deposit | null;
    refund: Refund | null;
}

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
}

export enum TransactionType {
    Stake = "stake",
    Winnings = "winnings",
    Deposit = "deposit",
    Withdrawal = "withdrawal",
    Refund = "refund",
}

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>,
> = T & {
    auth: {
        user: User;
    };
    ziggy: Config & { location: string };
    settings: {
        bet: BetSetting,
        wallet: WalletSetting
    }
};

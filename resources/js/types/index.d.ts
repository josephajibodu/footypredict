import { Config } from 'ziggy-js';
import {MatchOptionEnum} from "@/enums/MatchOptionEnum";
import { Transaction } from "@/types/transactions";
import {BetStatus, SportEventStatus} from "@/types/enums";

export interface User {
    id: number;
    first_name: string;
    last_name: string;
    full_name: string;
    username: string;
    email: string;
    mobile_number: string | null;
    gender: string | null;
    nationality: string | null;
    currency: string | null;
    balance: number;
    date_of_birth: string | null;
    email_verified_at: string | null;
    avatar: string,
    created_at: string;
    updated_at: string;
}

export interface SportEvent {
    id: number;
    match_date: string;
    kickoff_time: string;
    sport: string;
    status: SportEventStatus;
    team1_score?: number | null;
    team2_score?: number | null;
    main_outcome?: string | null;
    season?: string | null;
    match_week?: number | null;

    transaction?: Transaction;

    team1: Team;
    team2: Team;

    options?: MatchOption[];
    selected_option?: MatchOption;
    outcome_option?: MatchOption;
    is_correct?: boolean;
}

export interface SelectedSportEvent extends SportEvent {
    betOption: MatchOptionEnum;
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
    pool_size : number;
    winning_multiplier : number;
    min_stake : number;
    max_stake : number;
    min_selection : number;
    max_selection : number;
    selection_config: BetMultiplier[]
}

export interface BetMultiplier {
    selection: number,
    main: number,
    allow_flex: boolean,
    flex_0: number,
    flex_1: number,
    flex_2: number,
}


export interface WalletSetting {
    minimum_deposit_ngn : number;
    minimum_deposit_usdt : number;
}

export interface Bet {
    id: number;

    reference: string;
    code: number;

    user_id: number;
    transaction_id: number;
    stake: number;
    multiplier_settings: BetMultiplier;
    is_flexed: boolean;
    potential_winnings: number;
    status: BetStatus;
    created_at: Date | null;
    updated_at: Date | null;

    user: User;
    transaction: Transaction;
    sport_events?: SportEvent[];
    short_sport_events?: { fixture: string }[];
}

export interface MatchOption {
    id: string,
    sport_event_id: number,
    type: MatchOptionEnum,
    value: string,
}

interface PaginatedData<T> {
    data: T[];
    links: {
        first: string | null;
        last: string | null;
        prev: string | null;
        next: string | null;
    };
    meta: {
        current_page: number;
        from: number | null;
        last_page: number;
        links: {
            url: string | null;
            label: string;
            active: boolean;
        }[];
        path: string;
        per_page: number;
        to: number | null;
        total: number;
    };
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
    },
    flash: {
        info?: string,
        error?: string,
        success?: string
    }
};

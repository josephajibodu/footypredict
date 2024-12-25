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

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>,
> = T & {
    auth: {
        user: User;
    };
    ziggy: Config & { location: string };
    settings: {
        bet: BetSetting
    }
};

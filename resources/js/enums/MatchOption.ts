export enum MatchOption {
    HOME_WIN = "home_win",
    DRAW = "draw",
    AWAY_WIN = "away_win",
}

export const MatchOptionLabels: Record<MatchOption, string> = {
    [MatchOption.HOME_WIN]: "Home Win",
    [MatchOption.AWAY_WIN]: "Away Win",
    [MatchOption.DRAW]: "Draw"
};

export const MatchOptionShortCodes: Record<MatchOption, string> = {
    [MatchOption.HOME_WIN]: "1",
    [MatchOption.AWAY_WIN]: "2",
    [MatchOption.DRAW]: "X"
};
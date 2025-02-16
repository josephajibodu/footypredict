export enum MatchOptionEnum {
    HOME_WIN = 'home_win',
    DRAW = 'draw',
    AWAY_WIN = 'away_win',
}

export const MatchOptionLabels: Record<MatchOptionEnum, string> = {
    [MatchOptionEnum.HOME_WIN]: 'Home Win',
    [MatchOptionEnum.AWAY_WIN]: 'Away Win',
    [MatchOptionEnum.DRAW]: 'Draw',
};

export const MatchOptionShortCodes: Record<MatchOptionEnum, string> = {
    [MatchOptionEnum.HOME_WIN]: '1',
    [MatchOptionEnum.AWAY_WIN]: '2',
    [MatchOptionEnum.DRAW]: 'X',
};

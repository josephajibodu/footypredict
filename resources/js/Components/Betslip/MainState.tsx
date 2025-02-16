import Checkbox from '@/Components/Checkbox';
import { Button } from '@/Components/ui/button';
import { DrawerFooter } from '@/Components/ui/drawer';
import { Input } from '@/Components/ui/input';
import { MatchOptionLabels } from '@/enums/MatchOptionEnum';
import { cn, toMoney } from '@/lib/utils';
import { deselectSportEvent } from '@/store/eventSlice';
import { useAppDispatch } from '@/store/hooks';
import type { BetMultiplier, BetSetting, SelectedSportEvent } from '@/types';
import { Loader, X } from 'lucide-react';
import { useEffect, useState } from 'react';

interface MainStateProps {
    events: SelectedSportEvent[];
    stake: string;
    setStake: (stake: string) => void;
    isFlexed: boolean;
    setIsFlexed: (isFlexed: boolean) => void;
    processing: boolean;
    handlePlaceBet: () => void;
    betSettings: BetSetting;
}

export default function MainState({
    events,
    stake,
    setStake,
    isFlexed,
    setIsFlexed,
    processing,
    handlePlaceBet,
    betSettings,
}: MainStateProps) {
    const dispatch = useAppDispatch();
    const [multiplierSetting, setMultiplierSetting] = useState<BetMultiplier>();
    const [multiplier, setMultiplier] = useState<number>();

    useEffect(() => {
        if (events.length >= betSettings.min_selection) {
            const matchedMultiplier = betSettings.selection_config.find(
                (config) => config.selection === events.length,
            );

            if (matchedMultiplier) {
                setMultiplierSetting(matchedMultiplier);
                const bestMultiplier =
                    matchedMultiplier.allow_flex && isFlexed
                        ? matchedMultiplier.flex_0
                        : matchedMultiplier.main;
                setMultiplier(bestMultiplier);
            }
        } else {
            setMultiplierSetting(undefined);
        }
    }, [
        events,
        isFlexed,
        betSettings.min_selection,
        betSettings.selection_config,
    ]);

    const handleRemoveEvent = (sportEventId: number) =>
        dispatch(deselectSportEvent(sportEventId));

    const renderEventItem = (event: SelectedSportEvent) => (
        <div
            key={event.id}
            className="flex items-center justify-between rounded-lg border bg-primary/20 px-2 py-2"
        >
            <div className="flex flex-col">
                <span className="text-sm text-gray-300">
                    {MatchOptionLabels[event.betOption]}
                </span>
                <span className="line-clamp-1">
                    {event.team1.name} vs {event.team2.name}
                </span>
            </div>
            <Button
                onClick={() => handleRemoveEvent(event.id)}
                variant="ghost"
                className="text-red-600 active:bg-red-100"
                aria-label={`Remove ${event.team1.name} vs ${event.team2.name}`}
            >
                <X />
            </Button>
        </div>
    );

    const renderMultiplierDetails = () => {
        if (!multiplierSetting) return null;

        return (
            <div className="flex w-full items-start justify-between py-2 text-sm">
                <div className="flex flex-col whitespace-nowrap">
                    <span>Multiplier</span>
                    {!multiplierSetting.allow_flex && (
                        <div className="mt-1 flex items-center gap-2">
                            <span
                                className={cn({
                                    'opacity-25': !multiplierSetting.allow_flex,
                                })}
                            >
                                Flex
                            </span>
                            <Checkbox
                                disabled={!multiplierSetting.allow_flex}
                                checked={isFlexed}
                                onChange={(e) => setIsFlexed(e.target.checked)}
                            />
                        </div>
                    )}
                </div>
                <div className="flex flex-col items-end">
                    <p>
                        <span className="text-xs text-gray-300">
                            Get all {events.length} correct for{' '}
                        </span>
                        x{multiplier}
                    </p>
                    {isFlexed && multiplierSetting.allow_flex && (
                        <>
                            {multiplierSetting.flex_1 && (
                                <div className="flex items-end gap-1 text-xs">
                                    <span className="text-gray-300">
                                        Get {events.length - 1} correct for
                                    </span>
                                    x{multiplierSetting.flex_1}
                                </div>
                            )}
                            {multiplierSetting.flex_2 && (
                                <div className="flex items-end gap-1 text-xs">
                                    <span className="text-gray-300">
                                        Get {events.length - 2} correct for
                                    </span>
                                    x{multiplierSetting.flex_2}
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
        );
    };

    return (
        <>
            <div className="flex-1 overflow-y-auto p-4">
                <div className="mx-auto max-w-md space-y-4">
                    {events.map(renderEventItem)}
                </div>
            </div>

            <DrawerFooter className="border-t px-0 pb-0">
                <div className="space-y-2 px-4">
                    <div className={'flex w-full items-center justify-between'}>
                        <span className={'whitespace-nowrap'}>Total Stake</span>
                        <Input
                            type="number"
                            step="0.01"
                            value={stake}
                            onChange={(e) => setStake(e.target.value)}
                            required
                            placeholder={betSettings.default_amount.toString()}
                            aria-label="Enter stake amount"
                            className={
                                'w-fit rounded-none focus-visible:ring-1 focus-visible:ring-offset-0'
                            }
                        />
                    </div>

                    {renderMultiplierDetails()}

                    <div
                        className={
                            'flex w-full items-center justify-between py-2 text-lg'
                        }
                    >
                        <span className={'whitespace-nowrap'}>
                            Potential Win
                        </span>
                        <span>
                            {toMoney((Number(stake) || 0) * (multiplier || 0))}
                        </span>
                    </div>
                </div>

                <Button
                    disabled={
                        processing ||
                        events.length < betSettings.min_selection ||
                        events.length > betSettings.max_selection
                    }
                    onClick={handlePlaceBet}
                    aria-label="Place your bet"
                    className={'h-16 w-full rounded-none text-lg'}
                >
                    {processing && <Loader className={'animate-spin'} />}
                    Place Bet
                </Button>
            </DrawerFooter>
        </>
    );
}

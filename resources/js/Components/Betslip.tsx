import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
} from '@/Components/ui/drawer';
import {useEffect, useState} from 'react';
import { Button } from './ui/button';
import {Input} from "@/Components/ui/input";
import {useAppDispatch, useAppSelector} from "@/store/hooks";
import {Loader, Trash, X} from "lucide-react";
import {MatchOptionLabels} from "@/enums/MatchOption";
import {clearSelectedSportEvents, deselectSportEvent} from "@/store/eventSlice";
import {Link, router, usePage} from "@inertiajs/react";
import {useToast} from "@/hooks/use-toast";
import {ToastAction} from "@/Components/ui/toast";
import Checkbox from "@/Components/Checkbox";
import {BetMultiplier, SelectedSportEvent, SportEvent} from "@/types";
import {cn, toMoney} from "@/lib/utils";

const DEFAULT_AMOUNT = 500;

export default function Betslip() {

    const { auth, settings: { bet: betSettings } } = usePage().props;
    const {toast} = useToast();
    const events = useAppSelector(state => state.event.selectedEvents);
    const dispatch = useAppDispatch();

    const [stake, setStake] = useState<string>();
    const [processing, setProcessing] = useState(false);
    const [multiplierSetting, setMultiplierSetting] = useState<BetMultiplier>();
    const [multiplier, setMultiplier] = useState<number>();
    const [isFlexed, setIsFlexed] = useState<boolean>(false);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        if (events.length >= betSettings.min_selection) {
            const matchedMultiplier = betSettings.selection_config.find(
                (config) => config.selection === events.length
            );

            if (matchedMultiplier) {
                console.log()
                setMultiplierSetting(matchedMultiplier);
                const bestMultiplier = matchedMultiplier.allow_flex ? matchedMultiplier.flex_all : matchedMultiplier.main;
                setMultiplier(bestMultiplier)
            }

        } else {
            setMultiplierSetting(undefined);
        }
    }, [events, betSettings.min_selection, betSettings.selection_config])

    const handleRemoveEvent = (sportEventId: number) => dispatch(deselectSportEvent(sportEventId));
    const handleClearAllEvents = () => dispatch(clearSelectedSportEvents());

    const handlePlaceBet = () => {
        if (! auth.user) {
            return router.get(route('login'))
        }

        const data = {
            amount: stake,
            events: events.map((event, index) => ({
                event_id: event.id,
                bet_option: event.betOption
            }))
        }

        router.post(route('bets'), data, {
            onStart: () => setProcessing(true),
            onSuccess: page => {
                dispatch(clearSelectedSportEvents());
                setOpen(false);
                setStake(DEFAULT_AMOUNT.toString());

                toast({
                    title: "Bet Successfully Placed",
                    description: "Your bet has been placed successfully. You can view the details in your bet history.",
                    variant: "success",
                    action: (
                        <ToastAction altText="View Bet">
                            <Link href={route('bets')}>View Bet</Link>
                        </ToastAction>
                    ),
                });
            },
            onError: page => {
                toast({
                    title: "Error Placing Bet",
                    description: "There was an issue placing your bet. Try again or contact support.",
                    variant: 'destructive',
                });
            },
            onFinish: () => setProcessing(false),
        });
    };

    const renderEventItem = (event: SelectedSportEvent) => (
        <div key={event.id} className="flex items-center justify-between py-2 border-b">
            <div className="flex flex-col">
                <span className="text-sm text-gray-500">{MatchOptionLabels[event.betOption]}</span>
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
            <div className="flex justify-between w-full items-start py-2 text-sm">
                <div className="whitespace-nowrap flex flex-col">
                    <span>Multiplier</span>
                    <div className="mt-1 flex gap-2 items-center">
                        <span className={cn({"opacity-25": !multiplierSetting.allow_flex})}>Flex</span>
                        <Checkbox disabled={!multiplierSetting.allow_flex} checked={isFlexed} onChange={(e) => setIsFlexed(e.target.checked)} />
                    </div>
                </div>
                <div className="flex flex-col items-end">
                    <p>
                        <span className="text-gray-500 text-xs">Get all {events.length} correct for </span>
                        x{(isFlexed && multiplierSetting.allow_flex) ? multiplierSetting.flex_all : multiplierSetting.main}
                    </p>
                    {(isFlexed && multiplierSetting.allow_flex )&& (
                        <>
                            {multiplierSetting.flex_1 && (
                                <span className="text-gray-500 text-xs">
                                    Get {events.length - 1} correct for x{multiplierSetting.flex_1}
                                </span>
                            )}
                            {multiplierSetting.flex_2 && (
                                <span className="text-gray-500 text-xs">
                                    Get {events.length - 2} correct for x{multiplierSetting.flex_2}
                                </span>
                            )}
                        </>
                    )}
                </div>
            </div>
        );
    };

    return (
        <>
            <div
                className="fixed right-0 bottom-[60px] flex flex-col items-center justify-center w-12 h-16 bg-gray-900 rounded-l cursor-pointer"
                onClick={() => setOpen(true)}
                aria-label="Open bet slip"
            >
                <span className="flex items-center justify-center w-6 h-6 text-sm text-white rounded-full bg-destructive">
                    {events.length}
                </span>
                <span className="text-sm text-white">Slip</span>
            </div>

            <Drawer open={open} onOpenChange={setOpen}>
                <DrawerContent className="h-[90%]">
                    <DrawerHeader className={"justify-start flex flex-col"}>
                        <div className="flex justify-between items-center w-full">
                            <DrawerTitle>Bet Slip</DrawerTitle>
                            <Button
                                variant="link"
                                onClick={handleClearAllEvents}
                                aria-label="Remove all events"
                                className="flex items-center gap-1 text-red-500 hover:bg-red-100"
                            >
                                <Trash className="w-4 h-4" />
                                <span>Clear All</span>
                            </Button>
                        </div>
                    </DrawerHeader>

                    <div className="flex-1 p-4 overflow-y-auto bg-white">
                        <div className="max-w-md mx-auto space-y-4">
                            {events.map(renderEventItem)}
                        </div>
                    </div>

                    <DrawerFooter className="px-0 pb-0 border-t">
                        <div className="px-4 space-y-2">

                            <div className={"flex justify-between w-full items-center"}>
                                <span className={"whitespace-nowrap"}>Total Stake</span>
                                <Input
                                    type="number"
                                    step="0.01"
                                    value={stake}
                                    onChange={(e) => setStake(e.target.value)}
                                    required
                                    placeholder={DEFAULT_AMOUNT.toString()}
                                    aria-label="Enter stake amount"
                                    className={"w-fit rounded-none focus-visible:ring-offset-0 focus-visible:ring-1"}
                                />
                            </div>

                            {renderMultiplierDetails()}

                            <div className={"flex justify-between w-full items-center text-lg py-2"}>
                                <span className={"whitespace-nowrap"}>Potential Win</span>
                                <span>
                                    {toMoney((Number(stake) || 0) * (multiplier || 0))}
                                </span>
                            </div>

                        </div>

                        <Button
                            disabled={processing || events.length < betSettings.min_selection || events.length > betSettings.max_selection}
                            onClick={handlePlaceBet}
                            aria-label="Place your bet"
                            className={"rounded-none w-full text-lg h-16"}
                        >
                            {processing && <Loader className={"animate-spin"}/>}
                            Place Bet
                        </Button>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </>
    );
}

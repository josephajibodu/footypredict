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
import {Info, Loader, Trash, X} from "lucide-react";
import {MatchOptionLabels} from "@/enums/MatchOptionEnum";
import {clearSelectedSportEvents, deselectSportEvent} from "@/store/eventSlice";
import {Link, router, usePage} from "@inertiajs/react";
import {useToast} from "@/hooks/use-toast";
import {ToastAction} from "@/Components/ui/toast";
import Checkbox from "@/Components/Checkbox";
import {BetMultiplier, SelectedSportEvent, SportEvent} from "@/types";
import {cn, extractErrorMessage, toMoney} from "@/lib/utils";
import {AnimatePresence, motion} from "framer-motion";
import {toast} from "sonner";

const DEFAULT_AMOUNT = 500;

export default function Betslip() {

    const { auth, settings: { bet: betSettings } } = usePage().props;
    const events = useAppSelector(state => state.event.selectedEvents);
    const dispatch = useAppDispatch();

    const [stake, setStake] = useState<string>();
    const [processing, setProcessing] = useState(false);
    const [multiplierSetting, setMultiplierSetting] = useState<BetMultiplier>();
    const [multiplier, setMultiplier] = useState<number>();
    const [isFlexed, setIsFlexed] = useState<boolean>(false);
    const [open, setOpen] = useState(false);

    const infoVariants = {
        hidden: { x: "100%", opacity: 0 },
        visible: { x: 0, opacity: 1 },
    };

    const slipVariants = {
        hidden: { x: "100%", opacity: 0 },
        visible: { x: 0, opacity: 1 },
    };

    useEffect(() => {
        if (events.length >= betSettings.min_selection) {
            const matchedMultiplier = betSettings.selection_config.find(
                (config) => config.selection === events.length
            );

            if (matchedMultiplier) {
                setMultiplierSetting(matchedMultiplier);
                const bestMultiplier = (matchedMultiplier.allow_flex && isFlexed) ? matchedMultiplier.flex_0 : matchedMultiplier.main;
                setMultiplier(bestMultiplier)
            }

        } else {
            setMultiplierSetting(undefined);
        }
    }, [events, isFlexed, betSettings.min_selection, betSettings.selection_config])

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
                bet_option: event.betOption,
            })),
            is_flexed: isFlexed
        }

        router.post(route('bets'), data, {
            onStart: () => setProcessing(true),
            onSuccess: page => {
                dispatch(clearSelectedSportEvents());
                setOpen(false);
                setStake("");
                setIsFlexed(false);

                toast.success("Bet Successfully Placed", {
                    description: "Your bet has been placed successfully. You can view the details in your bet history.",
                    action: (
                        <Button aria-label="View Bet" size={"sm"}>
                            <Link href={route('bets.open-bets')}>View Bet</Link>
                        </Button>
                    ),
                });
            },
            onError: error => {
                const errorMessage = extractErrorMessage(error)
                toast.error("Error Placing Bet", {
                    description: errorMessage ?? "There was an issue placing your bet. Try again or contact support.",
                });
            },
            onFinish: () => setProcessing(false),
        });
    };

    const renderEventItem = (event: SelectedSportEvent) => (
        <div key={event.id} className="flex items-center justify-between py-2 bg-primary/20 border px-2 rounded-lg">
            <div className="flex flex-col">
                <span className="text-sm text-gray-300">{MatchOptionLabels[event.betOption]}</span>
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
                    {!multiplierSetting.allow_flex && (
                        <div className="mt-1 flex gap-2 items-center">
                        <span className={cn({"opacity-25": !multiplierSetting.allow_flex})}>Flex</span>
                        <Checkbox disabled={!multiplierSetting.allow_flex} checked={isFlexed}
                                  onChange={(e) => setIsFlexed(e.target.checked)}/>
                        </div>
                    )}
                </div>
                <div className="flex flex-col items-end">
                    <p>
                        <span className="text-gray-300 text-xs">Get all {events.length} correct for </span>
                        x{multiplier}
                    </p>
                    {(isFlexed && multiplierSetting.allow_flex )&& (
                        <>
                            {multiplierSetting.flex_1 && (
                                <div className="flex items-end gap-1 text-xs">
                                    <span className="text-gray-300">
                                        Get {events.length - 1} correct for
                                    </span>x{multiplierSetting.flex_1}
                                </div>
                            )}
                            {multiplierSetting.flex_2 && (
                                <div className="flex items-end gap-1 text-xs">
                                    <span className="text-gray-300">
                                        Get {events.length - 2} correct for
                                    </span>x{multiplierSetting.flex_2}
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

            <AnimatePresence>
                {events.length > 0 && events.length < betSettings.min_selection && (
                    <motion.div
                        variants={infoVariants}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        transition={{ duration: 0.3 }}
                        className="fixed right-0 flex gap-2 items-center justify-center ps-8 pe-2 h-8 bg-card text-white border rounded-l cursor-pointer"
                        style={{
                            bottom: 'calc(70px + env(safe-area-inset-bottom,16px))'
                        }}
                    >
                        <Info className="size-4" />
                        <span className="text-xs">Select at least {betSettings.min_selection} matches</span>
                    </motion.div>
                )}
            </AnimatePresence>


            <AnimatePresence>
                {events.length >= betSettings.min_selection && (
                    <motion.div
                        variants={slipVariants}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        transition={{ duration: 0.3 }}
                        className="fixed right-0 flex flex-col items-center justify-center w-12 h-16 bg-primary rounded-l cursor-pointer"
                        style={{
                            bottom: 'calc(70px + env(safe-area-inset-bottom,16px))'
                        }}
                        onClick={() => setOpen(true)}
                        aria-label="Open bet slip"
                    >
                    <span className="flex items-center justify-center w-6 h-6 text-sm text-white rounded-full bg-gradient-to-r from-secondary to-accent">
                        {events.length}
                    </span>
                        <span className="text-sm text-white">Slip</span>
                    </motion.div>
                )}
            </AnimatePresence>

            <Drawer open={open} onOpenChange={setOpen}>
                <DrawerContent className="h-[90%] bg-card">
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

                    <div className="flex-1 p-4 overflow-y-auto">
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

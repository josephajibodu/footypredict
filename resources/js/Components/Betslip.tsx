import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
} from '@/Components/ui/drawer';
import { useState } from 'react';
import { Button } from './ui/button';
import {Input} from "@/Components/ui/input";
import {useAppDispatch, useAppSelector} from "@/store/hooks";
import {Trash} from "lucide-react";
import {MatchOptionLabels} from "@/enums/MatchOption";
import {clearSelectedSportEvents, deselectSportEvent} from "@/store/eventSlice";
import {Link, router, usePage} from "@inertiajs/react";
import {useToast} from "@/hooks/use-toast";
import {ToastAction} from "@/Components/ui/toast";

const DEFAULT_AMOUNT = 500;

export default function Betslip() {
    const { auth } = usePage().props;
    const [stake, setStake] = useState(500);
    const [processing, setProcessing] = useState(false);
    const events = useAppSelector(state => state.event.selectedEvents);
    const dispatch = useAppDispatch();

    const {toast} = useToast();
    const [open, setOpen] = useState(false);

    const handleRemoveSportEvent = (sportEventId: number) => {
        dispatch(deselectSportEvent(sportEventId))
    };

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
                setStake(DEFAULT_AMOUNT);

                toast({
                    title: "Bet Successfully Placed",
                    description: "Your bet has been placed successfully. You can view the details in your bet history.",
                    action: <ToastAction altText="View Bet">
                        <Link href={route('bets')}>View Bet</Link>
                    </ToastAction>,
                });
            },
            onError: page => {
                toast({
                    title: "Error Placing Bet",
                    description: "There was an issue placing your bet. Please try again or contact support if the problem persists.",
                    variant: 'destructive',
                    action: (
                        <ToastAction altText="View Bet">
                            <Link href={route('bets')}>View Bet History</Link>
                        </ToastAction>
                    ),
                });
            },
            onFinish: () => setProcessing(false),
        });
    };

    return (
        <>
            <div
                className="fixed right-0 flex flex-col items-center justify-center w-12 h-16 bg-gray-900 rounded-l bottom-20 cursor-pointer"
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
                    <DrawerHeader>
                        <DrawerTitle>Bet Slip</DrawerTitle>
                        <DrawerDescription>
                            Selected matches will appear here.
                        </DrawerDescription>
                    </DrawerHeader>

                    <div className="flex-1 p-4 overflow-y-auto bg-white">
                        <div className="max-w-md mx-auto space-y-4">
                            {events.map((sportEvent) => (
                                <div key={sportEvent.id} className="flex items-center justify-between py-2 border-b">
                                    <div className="flex flex-col">
                                        <span className="text-sm text-gray-500">
                                            {MatchOptionLabels[sportEvent.betOption]}
                                        </span>
                                        <span className="line-clamp-1">
                                            {sportEvent.team1.name} vs {sportEvent.team2.name}
                                        </span>
                                    </div>

                                    <div className="w-12 flex justify-between gap-2 h-full">
                                        <Button
                                            onClick={() => handleRemoveSportEvent(sportEvent.id)}
                                            variant="ghost"
                                            className="text-red-600 active:bg-red-100 active:text-red-600"
                                            aria-label={`Remove ${sportEvent.team1.name} vs ${sportEvent.team2.name}`}
                                        >
                                            <Trash />
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <DrawerFooter>
                        <div className="flex gap-4">
                            <Input
                                type="number"
                                step="0.01"
                                value={stake}
                                onChange={(e) => setStake(Number(e.target.value))}
                                required
                                placeholder={DEFAULT_AMOUNT.toString()}
                                aria-label="Enter stake amount"
                            />
                            <Button
                                disabled={processing}
                                onClick={handlePlaceBet}
                                aria-label="Place your bet"
                            >
                                Place Bet
                            </Button>
                        </div>
                        <DrawerClose>
                            <Button variant="outline">Close</Button>
                        </DrawerClose>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </>
    );
}

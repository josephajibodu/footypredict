import EmptyState from '@/Components/Betslip/EmptyState';
import MainState from '@/Components/Betslip/MainState';
import { Button } from '@/Components/ui/button';
import {
    Drawer,
    DrawerContent,
    DrawerHeader,
    DrawerTitle,
} from '@/Components/ui/drawer';
import { extractErrorMessage } from '@/lib/utils';
import { clearSelectedSportEvents } from '@/store/eventSlice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { Link, router, usePage } from '@inertiajs/react';
import { AnimatePresence, motion } from 'framer-motion';
import { Info, Trash } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

export default function Index() {
    const {
        auth,
        settings: { bet: betSettings },
    } = usePage().props;
    const events = useAppSelector((state) => state.event.selectedEvents);
    const dispatch = useAppDispatch();

    const [stake, setStake] = useState<string>('');
    const [processing, setProcessing] = useState(false);
    const [isFlexed, setIsFlexed] = useState<boolean>(false);
    const [open, setOpen] = useState(false);
    const [bookingCode, setBookingCode] = useState<string | null>(null);

    const infoVariants = {
        hidden: { x: '100%', opacity: 0 },
        visible: { x: 0, opacity: 1 },
    };

    const slipVariants = {
        hidden: { x: '100%', opacity: 0 },
        visible: { x: 0, opacity: 1 },
    };

    const handleClearAllEvents = () => dispatch(clearSelectedSportEvents());

    const handlePlaceBet = () => {
        if (!auth.user) {
            return router.get(route('login'));
        }

        const data = {
            amount: stake,
            events: events.map((event) => ({
                event_id: event.id,
                bet_option: event.betOption,
            })),
            is_flexed: isFlexed,
        };

        router.post(route('bets'), data, {
            onStart: () => setProcessing(true),
            onSuccess: () => {
                dispatch(clearSelectedSportEvents());
                setOpen(false);
                setStake('');
                setIsFlexed(false);

                toast.success('Bet Successfully Placed', {
                    description:
                        'Your bet has been placed successfully. You can view the details in your bet history.',
                    action: (
                        <Button aria-label="View Bet" size={'sm'}>
                            <Link href={route('bets.open-bets')}>View Bet</Link>
                        </Button>
                    ),
                });
            },
            onError: (error) => {
                const errorMessage = extractErrorMessage(error);
                toast.error('Error Placing Bet', {
                    description:
                        errorMessage ??
                        'There was an issue placing your bet. Try again or contact support.',
                });
            },
            onFinish: () => {
                setProcessing(false);
            },
        });
    };

    useEffect(() => {
        const bookingCode = route().queryParams?.code;

        if (bookingCode) {
            setOpen(true);
            setBookingCode(bookingCode);
        }
    }, []);

    return (
        <>
            <AnimatePresence>
                {events.length > 0 &&
                    events.length < betSettings.min_selection && (
                        <motion.div
                            variants={infoVariants}
                            initial="hidden"
                            animate="visible"
                            exit="hidden"
                            transition={{ duration: 0.3 }}
                            className="fixed right-0 flex h-8 cursor-pointer items-center justify-center gap-2 rounded-l border bg-card pe-2 ps-8 text-white"
                            style={{
                                bottom: 'calc(70px + 64px + 4px + env(safe-area-inset-bottom,16px))',
                            }}
                        >
                            <Info className="size-4" />
                            <span className="text-xs">
                                Select at least {betSettings.min_selection}{' '}
                                matches
                            </span>
                        </motion.div>
                    )}
            </AnimatePresence>

            <AnimatePresence>
                <motion.div
                    variants={slipVariants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    transition={{ duration: 0.3 }}
                    className="fixed right-0 flex h-16 w-12 cursor-pointer flex-col items-center justify-center rounded-l bg-primary"
                    style={{
                        bottom: 'calc(70px + env(safe-area-inset-bottom,16px))',
                    }}
                    onClick={() => setOpen(true)}
                    aria-label="Open bet slip"
                >
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-r from-secondary to-accent text-sm text-white">
                        {events.length}
                    </span>
                    <span className="text-sm text-white">Slip</span>
                </motion.div>
            </AnimatePresence>

            <Drawer open={open} onOpenChange={setOpen}>
                <DrawerContent className="h-[90%] bg-card">
                    <DrawerHeader className={'flex flex-col justify-start'}>
                        <div className="flex w-full items-center justify-between">
                            <DrawerTitle>Bet Slip</DrawerTitle>
                            {events.length > 0 && (
                                <Button
                                    variant="link"
                                    onClick={handleClearAllEvents}
                                    aria-label="Remove all events"
                                    className="flex items-center gap-1 text-red-500 hover:bg-red-100"
                                >
                                    <Trash className="h-4 w-4" />
                                    <span>Clear All</span>
                                </Button>
                            )}
                        </div>
                    </DrawerHeader>

                    {events.length > 0 ? (
                        <MainState
                            events={events}
                            stake={stake}
                            setStake={setStake}
                            isFlexed={isFlexed}
                            setIsFlexed={setIsFlexed}
                            processing={processing}
                            handlePlaceBet={handlePlaceBet}
                            betSettings={betSettings}
                        />
                    ) : (
                        <EmptyState bookingCode={bookingCode} />
                    )}
                </DrawerContent>
            </Drawer>
        </>
    );
}

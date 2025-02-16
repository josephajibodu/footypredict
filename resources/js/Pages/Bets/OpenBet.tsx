import { BetsLoader } from '@/Components/Loaders/BetsLoader';
import Paginator from '@/Components/Paginator';
import { Button } from '@/Components/ui/button';
import emptyBettingIcon from '@/Images/betting.png';
import Authenticated from '@/Layouts/AuthenticatedLayout';
import { cn, toMoney } from '@/lib/utils';
import { Bet, PageProps, PaginatedData } from '@/types';
import { BetStatus } from '@/types/enums';
import { Deferred, Head, Link } from '@inertiajs/react';
import dayjs from 'dayjs';
import { ChevronDown } from 'lucide-react';
import { ReactNode } from 'react';

interface BetHistoryProps extends PageProps {
    bets: PaginatedData<Bet>;
}

export default function OpenBet({ bets, settings }: BetHistoryProps) {
    return (
        <>
            <Head title="BetHistory" />

            <div className="flex h-full">
                <div className="flex-1">
                    <Deferred fallback={<BetsLoader />} data="bets">
                        <>
                            {(!bets ||
                                (bets.data && bets.data.length === 0)) && (
                                <div className="flex h-full flex-col items-center justify-center px-8">
                                    <img
                                        src={emptyBettingIcon}
                                        className="w-16"
                                        alt="you have no bet"
                                    />
                                    <h3 className="text-lg font-bold">
                                        You have no bets
                                    </h3>
                                    <p className="text-center">
                                        Try Web4 again, you can win!
                                    </p>
                                    <Button asChild>
                                        <Link
                                            href={route('bets')}
                                            className="mt-4"
                                        >
                                            View Bet History
                                        </Link>
                                    </Button>
                                </div>
                            )}

                            {bets && bets.data.length > 0 && (
                                <section className="px-4">
                                    <div className="mt-4 flex items-center justify-between">
                                        <h2 className="px-4 text-lg font-bold">
                                            Open Bets
                                        </h2>

                                        <Button asChild>
                                            <Link
                                                href={route('bets')}
                                                className=""
                                            >
                                                View Bet History
                                            </Link>
                                        </Button>
                                    </div>

                                    <div className="flex flex-col gap-4 py-4">
                                        {bets.data.map((bet, index) => (
                                            <div
                                                key={bet.id}
                                                className="overflow-hidden rounded-lg bg-card text-card-foreground"
                                            >
                                                <div
                                                    className={cn(
                                                        'flex justify-between bg-primary/60 px-4 py-2 text-primary text-primary-foreground',
                                                    )}
                                                >
                                                    <div className="flex">
                                                        <span
                                                            className={cn(
                                                                'font-bold capitalize',
                                                                {
                                                                    'text-green-500':
                                                                        bet.status ===
                                                                        BetStatus.Won,
                                                                    'text-destructive':
                                                                        [
                                                                            BetStatus.Lost,
                                                                            BetStatus.Canceled,
                                                                        ].includes(
                                                                            bet.status,
                                                                        ),
                                                                },
                                                            )}
                                                        >
                                                            {bet.status}
                                                        </span>
                                                    </div>
                                                    <span className="">
                                                        - {toMoney(bet.stake)}
                                                    </span>
                                                </div>
                                                <div className="px-4 py-2">
                                                    <Link
                                                        href={route(
                                                            'bets.show',
                                                            {
                                                                bet: bet.reference,
                                                            },
                                                        )}
                                                    >
                                                        <div className="flex justify-between">
                                                            <span className="text-sm text-gray-400">
                                                                {dayjs(
                                                                    bet.created_at,
                                                                ).format(
                                                                    'D MMM YYYY ・ HH:mA',
                                                                )}
                                                            </span>
                                                            <ChevronDown />
                                                        </div>
                                                    </Link>

                                                    <Link
                                                        href={route(
                                                            'bets.show',
                                                            {
                                                                bet: bet.reference,
                                                            },
                                                        )}
                                                    >
                                                        <div className="flex flex-col text-sm">
                                                            {bet.short_sport_events
                                                                ?.slice(0, 3)
                                                                .map(
                                                                    (
                                                                        event,
                                                                        index,
                                                                    ) => (
                                                                        <span
                                                                            key={
                                                                                index
                                                                            }
                                                                        >
                                                                            {
                                                                                event.fixture
                                                                            }
                                                                        </span>
                                                                    ),
                                                                )}
                                                            {bet.short_sport_events &&
                                                                bet
                                                                    .short_sport_events
                                                                    .length >
                                                                    3 && (
                                                                    <span className="italic text-gray-300">
                                                                        and{' '}
                                                                        {bet
                                                                            .short_sport_events
                                                                            ?.length -
                                                                            3}{' '}
                                                                        others
                                                                        ...
                                                                    </span>
                                                                )}
                                                        </div>
                                                    </Link>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </section>
                            )}

                            {bets && bets.data.length > 0 && (
                                <Paginator
                                    meta={bets.meta}
                                    links={bets.links}
                                />
                            )}
                        </>
                    </Deferred>
                </div>
            </div>
        </>
    );
}

OpenBet.layout = (page: ReactNode) => <Authenticated>{page}</Authenticated>;

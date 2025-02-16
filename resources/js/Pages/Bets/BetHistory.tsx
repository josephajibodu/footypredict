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
import { ReactNode, useState } from 'react';

interface BetHistoryProps extends PageProps {
    bets: PaginatedData<Bet>;
}

const filters = ['all', 'unsettled', 'settled'] as const;

type Filter = (typeof filters)[number];

export default function BetHistory({ bets, settings }: BetHistoryProps) {
    const queryParams = new URLSearchParams(new URL(location.href).search);
    const urlStatus = queryParams.get('status') as Filter;

    const [filter, setFilter] = useState<Filter>(urlStatus ?? null);

    return (
        <>
            <Head title="BetHistory" />

            <div className="flex h-full">
                <div className="flex-1">
                    <div className="mt-4 grid h-10 w-full grid-cols-3 overflow-hidden rounded-lg rounded-none p-0 px-4 text-card-foreground">
                        <Link
                            className={cn(
                                'flex h-full items-center justify-center rounded-none rounded-s-lg bg-card hover:bg-primary',
                                {
                                    'bg-gradient-to-r from-secondary to-accent text-primary-foreground':
                                        filter === null,
                                },
                            )}
                            href={route('bets', { status: null })}
                        >
                            All
                        </Link>

                        <Link
                            className={cn(
                                'flex h-full items-center justify-center rounded-none bg-card hover:bg-primary',
                                {
                                    'bg-gradient-to-r from-secondary to-accent text-primary-foreground':
                                        filter === 'unsettled',
                                },
                            )}
                            href={route('bets', { status: 'unsettled' })}
                        >
                            Unsettled
                        </Link>

                        <Link
                            className={cn(
                                'flex h-full items-center justify-center rounded-none rounded-e-lg bg-card hover:bg-primary',
                                {
                                    'bg-gradient-to-r from-secondary to-accent text-primary-foreground':
                                        filter === 'settled',
                                },
                            )}
                            href={route('bets', { status: 'settled' })}
                        >
                            Settled
                        </Link>
                    </div>

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
                                        Get started by selecting some matches
                                        now!
                                    </p>

                                    <Button asChild>
                                        <Link
                                            href={route('events')}
                                            className="mt-4"
                                        >
                                            View Available Matches
                                        </Link>
                                    </Button>
                                </div>
                            )}

                            {bets && bets.data.length > 0 && (
                                <section className="px-4">
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

BetHistory.layout = (page: ReactNode) => <Authenticated>{page}</Authenticated>;

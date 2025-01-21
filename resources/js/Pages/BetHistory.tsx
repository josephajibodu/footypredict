import Authenticated from '@/Layouts/AuthenticatedLayout';
import {Deferred, Head, Link} from '@inertiajs/react';
import {ReactNode, useState} from 'react';
import {ChevronDown, ReceiptText} from "lucide-react";
import {Tabs, TabsContent, TabsList, TabsTrigger,} from "@/Components/ui/tabs"
import {Bet, PageProps, PaginatedData} from "@/types";
import {cn, toMoney} from "@/lib/utils";
import dayjs from "dayjs";
import {BetStatus} from "@/types/enums";
import {Button} from "@/Components/ui/button";
import {BetsLoader} from "@/Components/Loaders/BetsLoader";
import Paginator from "@/Components/Paginator";

interface BetHistoryProps extends PageProps {
    bets: PaginatedData<Bet>
}

const filters = ['all', 'unsettled', 'settled'] as const;

type Filter = typeof filters[number];

export default function BetHistory({ bets, settings } : BetHistoryProps) {
    const [filter, setFilter] = useState<Filter>("all");

    return (
        <>
            <Head title="BetHistory" />

            <div className="flex h-full">
                <div className="flex-1">
                    <div className="grid px-4 w-full grid-cols-3 p-0 rounded-none mt-4 text-card-foreground rounded-lg overflow-hidden">
                        <Button className={cn("h-full rounded-none rounded-s-lg", {
                            "bg-gradient-to-r from-secondary to-accent text-primary-foreground": filter === "all"
                        })} value="all">
                            <Link href={route('bets', {status: null})}>All</Link>
                        </Button>
                        <Button className={cn("h-full rounded-none", {
                            "bg-gradient-to-r from-secondary to-accent text-primary-foreground": filter === "unsettled"
                        })} value="unsettled">
                            <Link href={route('bets', {status: 'unsettled'})}>Unsettled</Link>
                        </Button>
                        <Button className={cn("h-full rounded-none rounded-e-lg", {
                            "bg-gradient-to-r from-secondary to-accent text-primary-foreground": filter === "settled"
                        })} value="settled">
                            <Link href={route('bets', {status: 'settled'})}>Settled</Link>
                        </Button>
                    </div>

                    <Deferred fallback={<BetsLoader />} data="bets">
                        <>
                            {(!bets || (bets.data && bets.data.length === 0)) && (
                                <div className="h-full flex flex-col items-center justify-center px-8">
                                    <ReceiptText size={56} />
                                    <h3 className="font-bold text-lg">You have no bets</h3>
                                    <p className="text-center">Get started by selecting games now.</p>
                                </div>
                            )}

                            {(bets && bets.data.length > 0) && (
                                <section className="px-4">

                                    <div className="flex flex-col gap-4 py-4">
                                        {bets.data.map((bet, index) => (
                                            <div key={bet.id} className="bg-card text-card-foreground rounded-lg overflow-hidden">
                                                <div className={cn("flex justify-between text-primary bg-primary/60 text-primary-foreground py-2 px-4", {
                                                    // "bg-green-100": bet.status === BetStatus.Won,
                                                    // "bg-destructive": bet.status === BetStatus.Lost || BetStatus.Canceled,
                                                    // "bg-orange-100": bet.status === BetStatus.Pending,
                                                })}>
                                                    <div className="flex ">
                                                        <span className="font-bold capitalize">{bet.status}</span>
                                                    </div>
                                                    <span className="">- {toMoney(bet.stake)}</span>
                                                </div>
                                                <div className="py-2 px-4">
                                                    <Link href={route('bets.show', {bet: bet.reference})}>
                                                        <div className="flex justify-between">
                                                            <span className="text-sm text-gray-400">{dayjs(bet.created_at).format('D MMM YYYY ・ HH:mA')}</span>
                                                            <ChevronDown />
                                                        </div>
                                                    </Link>

                                                    <Link href={route('bets.show', {bet: bet.reference})}>
                                                        <div className="flex flex-col text-sm">
                                                            {bet.short_sport_events?.slice(0, 3).map((event, index) => (
                                                                <span key={index}>{event.fixture}</span>
                                                            ))}
                                                            {bet.short_sport_events && bet.short_sport_events.length > 3 && (
                                                                <span className="text-gray-300 italic">and {bet.short_sport_events?.length - 3} others ...</span>
                                                            )}
                                                        </div>
                                                    </Link>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </section>
                            )}

                            {(bets && bets.data.length > 0) && (
                                <Paginator
                                    meta={bets.meta}
                                    links={bets.links}
                                    onPageChange={console.log}
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

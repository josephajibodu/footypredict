import Authenticated from '@/Layouts/AuthenticatedLayout';
import {Deferred, Head, Link, usePage} from '@inertiajs/react';
import {ReactNode, useState} from 'react';
import {ChevronDown, ReceiptText} from "lucide-react";
import {Bet, PageProps, PaginatedData} from "@/types";
import {cn, toMoney} from "@/lib/utils";
import dayjs from "dayjs";
import {Button} from "@/Components/ui/button";
import {BetsLoader} from "@/Components/Loaders/BetsLoader";
import Paginator from "@/Components/Paginator";
import {BetStatus} from "@/types/enums";

interface BetHistoryProps extends PageProps {
    bets: PaginatedData<Bet>
}

export default function OpenBet({ bets, settings } : BetHistoryProps) {

    return (
        <>
            <Head title="BetHistory" />

            <div className="flex h-full">
                <div className="flex-1">

                    <Deferred fallback={<BetsLoader />} data="bets">
                        <>
                            {(!bets || (bets.data && bets.data.length === 0)) && (
                                <div className="h-full flex flex-col items-center justify-center px-8">
                                    <img src="/images/betting.png" className="w-16" alt="you have no bet"/>
                                    <h3 className="font-bold text-lg">You have no bets</h3>
                                    <p className="text-center">Try Web4 again, you can win!</p>
                                    <Button asChild>
                                        <Link href={route('bets')} className="mt-4">View Bet History</Link>
                                    </Button>
                                </div>
                            )}

                            {(bets && bets.data.length > 0) && (
                                <section className="px-4">

                                    <div className="flex flex-col gap-4 py-4">
                                        {bets.data.map((bet, index) => (
                                            <div key={bet.id} className="bg-card text-card-foreground rounded-lg overflow-hidden">
                                                <div className={cn("flex justify-between text-primary bg-primary/60 text-primary-foreground py-2 px-4")}>
                                                    <div className="flex ">
                                                        <span className={cn("font-bold capitalize", {
                                                            "text-green-500": bet.status === BetStatus.Won,
                                                            "text-destructive": [BetStatus.Lost, BetStatus.Canceled].includes(bet.status),
                                                        })}>{bet.status}</span>
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

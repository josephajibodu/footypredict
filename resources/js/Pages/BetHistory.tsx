import Authenticated from '@/Layouts/AuthenticatedLayout';
import {Head, Link} from '@inertiajs/react';
import {ReactNode} from 'react';
import {ChevronDown, ReceiptText} from "lucide-react";
import {Tabs, TabsContent, TabsList, TabsTrigger,} from "@/Components/ui/tabs"
import {Bet, PageProps} from "@/types";
import {cn, toMoney} from "@/lib/utils";
import dayjs from "dayjs";
import {BetStatus} from "@/types/enums";

interface BetHistoryProps extends PageProps {
    bets: Bet[]
}

export default function BetHistory({ bets, settings } : BetHistoryProps) {

    return (
        <>
            <Head title="BetHistory" />

            <div className="flex h-full">
                <div className="flex-1">

                    {bets.length === 0 && (
                        <div className="h-full flex flex-col items-center justify-center px-8">
                            <ReceiptText size={56} />
                            <h3 className="font-bold text-lg">You have no bets</h3>
                            <p className="text-center">Get started by selecting games now.</p>
                        </div>
                    )}

                    {bets.length > 0 && (
                        <Tabs defaultValue="all" className="px-4">
                            <TabsList className="grid w-full grid-cols-3 p-0 rounded-none bg-white mt-4">
                                <TabsTrigger className="h-full rounded-none data-[state=active]:bg-primary data-[state=active]:text-primary-foreground" value="all">All</TabsTrigger>
                                <TabsTrigger className="h-full rounded-none data-[state=active]:bg-primary data-[state=active]:text-primary-foreground" value="unsettled">Unsettled</TabsTrigger>
                                <TabsTrigger className="h-full rounded-none data-[state=active]:bg-primary data-[state=active]:text-primary-foreground" value="settled">Settled</TabsTrigger>
                            </TabsList>

                            <TabsContent value="all" className="mt-0 py-0">
                                <div className="flex flex-col gap-4 py-4">
                                    {bets.map((bet, index) => (
                                        <div key={bet.id} className="bg-white">
                                            <div className={cn("flex justify-between py-2 border-b px-4", {
                                                "bg-green-500": bet.status === BetStatus.Won,
                                                "bg-destructive": bet.status === BetStatus.Lost || BetStatus.Canceled,
                                                "bg-orange-500": bet.status === BetStatus.Pending,
                                            })}>
                                                <div className="flex ">
                                                    <span className="font-bold capitalize">{bet.status}</span>
                                                </div>
                                                <span className="">- {toMoney(bet.stake)}</span>
                                            </div>
                                            <div className="py-2 px-4">
                                                <Link href={route('bets.show', {bet: bet.reference})}>
                                                    <div className="flex justify-between">
                                                        <span className="text-sm">{dayjs(bet.created_at).format('D MMM YYYY ・ HH:mA')}</span>
                                                        <ChevronDown />
                                                    </div>
                                                </Link>

                                                <Link href={route('bets.show', {bet: bet.reference})}>
                                                    <div className="flex flex-col">
                                                            {bet.short_sport_events?.slice(0, 3).map((event, index) => (
                                                                <span key={index}>{event.fixture}</span>
                                                            ))}
                                                            {bet.short_sport_events && bet.short_sport_events.length > 3 && (
                                                                <span className="text-gray-500 italic">and {bet.short_sport_events?.length - 3} others ...</span>
                                                            )}
                                                    </div>
                                                </Link>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </TabsContent>
                            <TabsContent value="unsettled" className="mt-0">
                                <div>Tab 2 content</div>
                            </TabsContent>
                            <TabsContent value="settled" className="mt-0">
                                <div>Tab 3 content</div>
                            </TabsContent>
                        </Tabs>
                    )}

                </div>
            </div>
        </>
    );
}

BetHistory.layout = (page: ReactNode) => <Authenticated>{page}</Authenticated>;

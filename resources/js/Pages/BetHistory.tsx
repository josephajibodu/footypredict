import Authenticated from '@/Layouts/AuthenticatedLayout';
import {Head, usePage} from '@inertiajs/react';
import { ReactNode } from 'react';
import {ArrowUp, ChevronDown, ReceiptText, TicketSlash} from "lucide-react";
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/Components/ui/tabs"
import {Bet, PageProps} from "@/types";

interface BetHistoryProps extends PageProps {
    bets: Bet[]
}

export default function BetHistory({ bets } : BetHistoryProps) {

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

                    <Tabs defaultValue="all">
                        <TabsList className="grid w-full grid-cols-3 p-0 rounded-none">
                            <TabsTrigger className="h-full rounded-none" value="all">All</TabsTrigger>
                            <TabsTrigger className="h-full rounded-none" value="unsettled">Unsettled</TabsTrigger>
                            <TabsTrigger className="h-full rounded-none" value="settled">Settled</TabsTrigger>
                        </TabsList>

                        <TabsContent value="all" className="mt-0">
                            <div className="space-y-2">
                                {bets.map((bet, index) => (
                                    <div key={bet.id} className="bg-white py-4 px-4">
                                        <div className="flex justify-between py-2 border-b">
                                            <div className="flex ">
                                                <ArrowUp size={18} className="text-red-500 me-2" />
                                                <span className="font-bold">Loss</span>
                                            </div>
                                            <span className="">- 5,000.00</span>
                                        </div>
                                        <div className="py-2">
                                            <div className="flex justify-between">
                                                <span className="text-sm"> Date & Time</span>
                                                <ChevronDown />
                                            </div>
                                            <div className="flex flex-col">
                                                <span>List of matches</span>
                                                <span>List of matches</span>
                                                <span>List of matches</span>
                                                <span>and 4 others ...</span>
                                            </div>
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

                </div>
            </div>
        </>
    );
}

BetHistory.layout = (page: ReactNode) => <Authenticated>{page}</Authenticated>;

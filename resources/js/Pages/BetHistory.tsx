import Authenticated from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { ReactNode } from 'react';
import {ReceiptText, TicketSlash} from "lucide-react";

export default function BetHistory() {
    return (
        <>
            <Head title="BetHistory" />

            <div className="flex h-full">
                <div className="flex-1">

                    <div className="h-full flex flex-col items-center justify-center px-8">
                        <ReceiptText size={56} />
                        <h3 className="font-bold text-lg">You have no bets</h3>
                        <p className="text-center">Get started by selecting games now.</p>
                    </div>
                </div>
            </div>
        </>
    );
}

BetHistory.layout = (page: ReactNode) => <Authenticated>{page}</Authenticated>;

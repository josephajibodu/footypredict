import Betslip from '@/Components/Betslip';
import SingleEvent from '@/Components/SingleEvent';
import Authenticated from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { ReactNode } from 'react';
import {Button} from "@/Components/ui/button";
import {HandCoins, TicketSlash, TicketsPlane, Wallet2} from "lucide-react";

export default function Wallet() {
    const events = Array.from({ length: 20 }, (_, i) => i + 1);

    return (
        <>
            <Head title="Events" />

            <div className="flex flex-col h-full">
                {/* Header */}
                <div className="bg-primary text-primary-foreground px-4 py-4">
                    <div className="flex justify-between py-4">
                        <h3 className="font-bold">Wallet Balance</h3>
                        <span className="">&#8358; 7,867.54</span>
                    </div>

                    <div className="flex justify-center items-center py-4 gap-4">
                        <Button variant="secondary" size="lg" className="text-base">
                            <Wallet2 />
                            Deposit
                        </Button>
                        <Button variant="secondary" size="lg" className="text-base">
                            <HandCoins size={12} />
                            Withdraw
                        </Button>
                    </div>
                </div>

                {/* Body: Transaction History */}
                <div className="flex-1">

                    <div className="h-full flex flex-col items-center justify-center px-8">
                        <TicketSlash size={56} />
                        <h3 className="font-bold text-lg">No transactions yet</h3>
                        <p className="text-center">Once you make you first deposit, you will be able to view it here.</p>
                    </div>
                </div>
            </div>

        </>
    );
}

Wallet.layout = (page: ReactNode) => <Authenticated showHeader={false}>{page}</Authenticated>;

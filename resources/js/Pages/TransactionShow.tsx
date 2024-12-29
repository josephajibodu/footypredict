import Authenticated from '@/Layouts/AuthenticatedLayout';
import {Head} from '@inertiajs/react';
import {ReactNode} from 'react';
import {PageProps} from '@/types';
import {Transaction, TransactionStatus, TransactionType} from "@/types/transactions";
import {cn, toMoney} from "@/lib/utils";
import {Separator} from "@/Components/ui/separator";
import {Button} from "@/Components/ui/button";
import {Phone} from "lucide-react";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat"

dayjs.extend(localizedFormat);

interface TransactionDetailProps extends PageProps {
    transaction: Transaction
}

export default function TransactionShow({ transaction }: TransactionDetailProps) {

    return (
        <>
            <Head title="Transaction Details" />

            {transaction && (
                <div className="flex flex-col h-full px-4 py-4 bg-white">
                    <div className="flex-1 space-y-8">

                        {/* Amount Section */}
                        <div className="p-6 space-y-2">
                            <div className="text-sm text-muted-foreground">Amount (NGN)</div>
                            <div className="text-4xl font-bold">
                                {transaction.amount > 0 ? '+' : ''}{toMoney(transaction.amount)}
                            </div>
                        </div>

                        <Separator />

                        {/* Transaction Details */}
                        <div className="p-6 space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="col-span-full">
                                    <div className="text-sm text-muted-foreground">Reference</div>
                                    <div className="font-medium break-all">{transaction.reference}</div>
                                </div>
                                <div>
                                    <div className="text-sm text-muted-foreground">Status</div>
                                    <div className="font-medium">
                                        <span className={cn("capitalize", {
                                                'text-green-600': transaction.status === TransactionStatus.Completed,
                                                'text-yellow-600': transaction.status === TransactionStatus.Pending,
                                                'text-red-600': transaction.status === TransactionStatus.Failed
                                            })}>
                                            {transaction.status}
                                        </span>
                                    </div>
                                </div>
                                <div>
                                    <div className="text-sm text-muted-foreground">Time</div>
                                    <div className="font-medium">{dayjs(transaction.created_at).format('ll LT')}</div>
                                </div>
                                <div>
                                    <div className="text-sm text-muted-foreground">Type</div>
                                    <div className="font-medium capitalize">{transaction.type}</div>
                                </div>

                                {/* For Deposits */}
                                {(transaction.type === TransactionType.Deposit && transaction.deposit) && (
                                    <>
                                        <div>
                                            <div className="text-sm text-muted-foreground">Amount Received</div>
                                            <div className="font-medium">{toMoney(transaction.deposit?.amount_received ?? 0)}</div>
                                        </div>

                                        <div>
                                            <div className="text-sm text-muted-foreground">Fee</div>
                                            <div className="font-medium">{toMoney(transaction.deposit?.fee ?? 0)}</div>
                                        </div>

                                    </>
                                )}
                            </div>
                        </div>


                    </div>
                </div>
            )}
        </>
    );
}

TransactionShow.layout = (page: ReactNode) => (
    <Authenticated
        backUrl={route('wallet')}
        showHeader={false}
        title="Transaction Details"
        hideBottomNav={true}
    >
        {page}
    </Authenticated>
);
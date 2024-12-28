import Authenticated from '@/Layouts/AuthenticatedLayout';
import {Head} from '@inertiajs/react';
import { ReactNode } from 'react';
import { PageProps } from '@/types';
import {Transaction} from "@/types/transactions";
import {toMoney} from "@/lib/utils";

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

                        {/* Transfer Information */}
                        <section>
                            <h2 className="text-lg font-medium text-gray-800">
                                Transfer {toMoney(transaction.amount)} into the account number displayed below.
                            </h2>
                            <p className="text-sm text-gray-600 mt-2">
                                This account expires in 30 minutes. Any transfer to the account details below will reflect in your wallet within 10 minutes.
                            </p>
                        </section>

                    </div>
                </div>
            )}
        </>
    );
}

TransactionShow.layout = (page: ReactNode) => (
    <Authenticated canGoBack showHeader={false} title="Transaction Details">
        {page}
    </Authenticated>
);
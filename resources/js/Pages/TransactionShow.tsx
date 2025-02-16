import { Separator } from '@/Components/ui/separator';
import Authenticated from '@/Layouts/AuthenticatedLayout';
import { cn, toMoney } from '@/lib/utils';
import { PageProps } from '@/types';
import { TransactionStatus, TransactionType } from '@/types/enums';
import { Transaction } from '@/types/transactions';
import { Head } from '@inertiajs/react';
import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import { ReactNode } from 'react';

dayjs.extend(localizedFormat);

interface TransactionDetailProps extends PageProps {
    transaction: Transaction;
}

export default function TransactionShow({
    transaction,
}: TransactionDetailProps) {
    return (
        <>
            <Head title="Transaction Details" />

            {transaction && (
                <div className="flex h-full flex-col px-4 py-4 text-primary-foreground">
                    <div className="flex-1 space-y-8">
                        {/* Amount Section */}
                        <div className="space-y-2 p-6">
                            <div className="text-sm">Amount (NGN)</div>
                            <div className="text-4xl font-bold">
                                {transaction.amount > 0 ? '+' : ''}
                                {toMoney(transaction.amount)}
                            </div>
                        </div>

                        <Separator />

                        {/* Transaction Details */}
                        <div className="space-y-4 p-6">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="col-span-full">
                                    <div className="text-sm text-foreground/80">
                                        Reference
                                    </div>
                                    <div className="break-all font-medium">
                                        {transaction.reference}
                                    </div>
                                </div>
                                <div>
                                    <div className="text-sm text-foreground/80">
                                        Status
                                    </div>
                                    <div className="font-medium">
                                        <span
                                            className={cn('capitalize', {
                                                'text-green-600':
                                                    transaction.status ===
                                                    TransactionStatus.Completed,
                                                'text-yellow-600':
                                                    transaction.status ===
                                                    TransactionStatus.Pending,
                                                'text-red-600':
                                                    transaction.status ===
                                                    TransactionStatus.Failed,
                                            })}
                                        >
                                            {transaction.status}
                                        </span>
                                    </div>
                                </div>
                                <div>
                                    <div className="text-sm text-foreground/80">
                                        Time
                                    </div>
                                    <div className="font-medium">
                                        {dayjs(transaction.created_at).format(
                                            'll LT',
                                        )}
                                    </div>
                                </div>
                                <div>
                                    <div className="text-sm text-foreground/80">
                                        Type
                                    </div>
                                    <div className="font-medium capitalize">
                                        {transaction.type}
                                    </div>
                                </div>

                                {/* For Deposits */}
                                {transaction.type === TransactionType.Deposit &&
                                    transaction.deposit && (
                                        <>
                                            <div>
                                                <div className="text-sm text-foreground/80">
                                                    Amount Received
                                                </div>
                                                <div className="font-medium">
                                                    {toMoney(
                                                        transaction.deposit
                                                            ?.amount_received ??
                                                            0,
                                                    )}
                                                </div>
                                            </div>

                                            <div>
                                                <div className="text-sm text-foreground/80">
                                                    Fee
                                                </div>
                                                <div className="font-medium">
                                                    {toMoney(
                                                        transaction.deposit
                                                            ?.fee ?? 0,
                                                    )}
                                                </div>
                                            </div>
                                        </>
                                    )}

                                {/* For Withdrawals */}
                                {transaction.type ===
                                    TransactionType.Withdrawal &&
                                    transaction.withdrawal && (
                                        <>
                                            <div>
                                                <div className="text-sm text-foreground/80">
                                                    Account Name
                                                </div>
                                                <div className="font-medium">
                                                    {transaction.withdrawal
                                                        .account_name ?? '-'}
                                                </div>
                                            </div>

                                            <div>
                                                <div className="text-sm text-foreground/80">
                                                    Account Number
                                                </div>
                                                <div className="font-medium">
                                                    {transaction.withdrawal
                                                        .account_number ?? '-'}
                                                </div>
                                            </div>

                                            <div>
                                                <div className="text-sm text-foreground/80">
                                                    Bank Name
                                                </div>
                                                <div className="line-clamp-1 font-medium">
                                                    {transaction.withdrawal
                                                        .bank_name ?? '-'}
                                                </div>
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

import { Button } from '@/Components/ui/button';
import emptyTransactionIcon from '@/Images/transaction.png';
import Authenticated from '@/Layouts/AuthenticatedLayout';
import { Deferred, Head, Link, useForm } from '@inertiajs/react';
import { HandCoins, Loader, Wallet2 } from 'lucide-react';
import { FormEvent, ReactNode, useState } from 'react';

import { WalletTransactionLoader } from '@/Components/Loaders/WalletTransactionLoader';
import {
    Drawer,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
} from '@/Components/ui/drawer';
import { Input } from '@/Components/ui/input';
import { cn, toMoney } from '@/lib/utils';
import { PageProps } from '@/types';
import { TransactionStatus } from '@/types/enums';
import { Transaction } from '@/types/transactions';
import dayjs from 'dayjs';

interface WalletPageProps extends PageProps {
    transactions: Transaction[];
}

const depositFee = 50;

export default function Wallet({
    transactions,
    settings,
    auth,
}: WalletPageProps) {
    const [openWalletInput, setOpenWalletInput] = useState(false);
    const { post, data, setData, processing, errors } = useForm({ amount: '' });

    const handleContinue = (e: FormEvent) => {
        e.preventDefault();
        post(route('deposit.store'));
    };

    return (
        <>
            <Head title="Events" />

            <div className="flex h-full flex-col bg-primary">
                {/* Header */}
                <div className="bg-primary px-4 py-4 text-primary-foreground">
                    <div className="flex justify-between py-4 text-lg">
                        <h3 className="font-bold">Wallet Balance</h3>
                        <span className="">{toMoney(auth.user.balance)}</span>
                    </div>

                    <div className="flex items-center justify-center gap-4 py-4">
                        <Button
                            onClick={() => setOpenWalletInput(true)}
                            variant="secondary"
                            size="lg"
                            className="bg-gradient-to-r from-secondary to-accent text-base"
                        >
                            <Wallet2 />
                            Deposit
                        </Button>

                        <Button
                            variant="secondary"
                            size="lg"
                            className="bg-gradient-to-r from-secondary to-accent text-base text-secondary-foreground"
                            asChild
                        >
                            <Link href={route('withdraw')}>
                                <HandCoins size={12} />
                                Withdraw
                            </Link>
                        </Button>
                    </div>
                </div>

                <h2 className="px-4 pb-2 text-lg font-bold">Transactions</h2>

                {/* Body: Transaction History */}
                <div className="flex-1 overflow-y-auto rounded-t-[24px] bg-background">
                    <Deferred
                        fallback={<WalletTransactionLoader />}
                        data="transactions"
                    >
                        <>
                            {transactions && transactions.length === 0 && (
                                <div className="flex h-full flex-col items-center justify-center px-8">
                                    <img
                                        src={emptyTransactionIcon}
                                        className="mb-2 w-16"
                                        alt="you have no transaction"
                                    />
                                    <h3 className="text-lg font-bold">
                                        No transactions yet
                                    </h3>
                                    <p className="text-center">
                                        Your transactions will appear here once
                                        you get started
                                    </p>
                                </div>
                            )}

                            {transactions && transactions.length > 0 && (
                                <div className="flex w-full flex-col gap-2 px-4 pt-8">
                                    {transactions.map((transaction) => (
                                        <div
                                            key={transaction.id}
                                            className="flex items-center justify-between rounded-lg bg-card p-4 shadow-sm"
                                        >
                                            <Link
                                                href={route(
                                                    'transaction.show',
                                                    { transaction },
                                                )}
                                                className="flex-1"
                                            >
                                                <div
                                                    className={cn(
                                                        'border-l-4 pl-2',
                                                        {
                                                            'border-green-400':
                                                                transaction.trend_up,
                                                            'border-red-400':
                                                                !transaction.trend_up,
                                                        },
                                                    )}
                                                >
                                                    <p className="line-clamp-1 text-sm">
                                                        {
                                                            transaction.description
                                                        }
                                                    </p>
                                                    <p className="text-base font-medium">
                                                        {toMoney(
                                                            Number(
                                                                transaction.amount,
                                                            ),
                                                        )}
                                                    </p>
                                                </div>
                                            </Link>
                                            <Link
                                                href={route(
                                                    'transaction.show',
                                                    { transaction },
                                                )}
                                                className="flex flex-col items-end justify-between gap-2"
                                            >
                                                <p className="text-xs">
                                                    {dayjs(
                                                        transaction.created_at,
                                                    ).format(
                                                        'D MMM YYYY ・ HH:mA',
                                                    )}
                                                </p>
                                                <p
                                                    className={cn(
                                                        'w-fit rounded px-2 text-xs font-bold',
                                                        {
                                                            'bg-red-500/20 text-red-500':
                                                                [
                                                                    TransactionStatus.Failed,
                                                                    TransactionStatus.Cancelled,
                                                                ].includes(
                                                                    transaction.status,
                                                                ),
                                                            'bg-green-500/50 text-green-500':
                                                                transaction.status ===
                                                                TransactionStatus.Completed,
                                                            'bg-orange-500/20 text-orange-500':
                                                                transaction.status ===
                                                                TransactionStatus.Pending,
                                                        },
                                                    )}
                                                >
                                                    {transaction.status}
                                                </p>
                                            </Link>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </>
                    </Deferred>
                </div>
            </div>

            <Drawer open={openWalletInput} onOpenChange={setOpenWalletInput}>
                <DrawerContent className="bg-card">
                    <DrawerHeader>
                        <DrawerTitle>Fund Wallet</DrawerTitle>
                        <DrawerDescription>
                            How much do you to add?
                        </DrawerDescription>
                    </DrawerHeader>
                    <form onSubmit={handleContinue} className="px-4">
                        <div className="space-y-2 pb-8">
                            <Input
                                type="number"
                                placeholder="Minimum of 100"
                                step={0.01}
                                min={settings.wallet.minimum_deposit_ngn}
                                value={data.amount}
                                onChange={(e) =>
                                    setData('amount', e.target.value)
                                }
                            />
                            <small className="text-destructive">
                                {errors && errors.amount}
                            </small>

                            <p className="text-end text-sm">
                                Deposit Fee: {toMoney(depositFee)}
                            </p>
                            <p className="text-end text-sm">
                                You Receive:{' '}
                                {data.amount
                                    ? toMoney(Number(data.amount) - depositFee)
                                    : '0.00'}
                            </p>
                        </div>

                        <DrawerFooter className="px-0 pb-8">
                            <Button
                                disabled={processing}
                                type={'submit'}
                                size={'lg'}
                            >
                                {processing && (
                                    <Loader className="animate-spin" />
                                )}
                                Continue to Payment
                            </Button>
                            {/*<DrawerClose>*/}
                            {/*    <Button variant="outline">Cancel</Button>*/}
                            {/*</DrawerClose>*/}
                        </DrawerFooter>
                    </form>
                </DrawerContent>
            </Drawer>
        </>
    );
}

Wallet.layout = (page: ReactNode) => (
    <Authenticated showHeader={false}>{page}</Authenticated>
);

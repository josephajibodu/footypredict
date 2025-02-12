import Authenticated from '@/Layouts/AuthenticatedLayout';
import {Deferred, Head, Link, useForm} from '@inertiajs/react';
import {FormEvent, ReactNode, useState} from 'react';
import {Button} from "@/Components/ui/button";
import {ArrowDown, ArrowUp, HandCoins, Loader, TicketSlash, Wallet2} from "lucide-react";
import emptyTransactionIcon from "@/Images/transaction.png"

import {
    Drawer,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
} from "@/Components/ui/drawer"
import {Input} from "@/Components/ui/input";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow,} from "@/Components/ui/table"
import {cn, toMoney} from "@/lib/utils";
import dayjs from "dayjs";
import {PageProps} from "@/types";
import {Transaction} from "@/types/transactions";
import {TransactionStatus} from "@/types/enums";
import {WalletTransactionLoader} from "@/Components/Loaders/WalletTransactionLoader";


interface WalletPageProps extends PageProps {
    transactions: Transaction[]
}

const depositFee = 50;

export default function Wallet({ transactions, settings, auth }: WalletPageProps) {

    const [openWalletInput, setOpenWalletInput] = useState(false);
    const { post, data, setData, processing, errors } = useForm({ amount: "" })

    const handleContinue = (e: FormEvent) => {
        e.preventDefault();
        post(route('deposit.store'));
    }

    return (
        <>
            <Head title="Events" />

            <div className="flex flex-col h-full bg-primary">
                {/* Header */}
                <div className="bg-primary text-primary-foreground px-4 py-4">
                    <div className="flex justify-between py-4 text-lg">
                        <h3 className="font-bold">Wallet Balance</h3>
                        <span className="">{toMoney(auth.user.balance)}</span>
                    </div>

                    <div className="flex justify-center items-center py-4 gap-4">
                        <Button
                            onClick={() => setOpenWalletInput(true)}
                            variant="secondary"
                            size="lg"
                            className="text-base bg-gradient-to-r from-secondary to-accent"
                        >
                            <Wallet2 />
                            Deposit
                        </Button>

                        <Button
                            variant="secondary"
                            size="lg"
                            className="text-base bg-gradient-to-r from-secondary to-accent text-secondary-foreground"
                            asChild
                        >
                            <Link href={route('withdraw')}>
                                <HandCoins size={12} />
                                Withdraw
                            </Link>
                        </Button>
                    </div>
                </div>

                <h2 className="px-4 pb-2 font-bold text-lg">Transactions</h2>

                {/* Body: Transaction History */}
                <div className="flex-1 rounded-t-[24px] bg-background overflow-y-auto">
                    <Deferred fallback={<WalletTransactionLoader />} data="transactions">
                        <>
                            {(transactions && transactions.length === 0) && (
                                <div className="h-full flex flex-col items-center justify-center px-8">
                                    <img src={emptyTransactionIcon} className="w-16 mb-2" alt="you have no transaction"/>
                                    <h3 className="font-bold text-lg">No transactions yet</h3>
                                    <p className="text-center">Your transactions will appear here once you get started</p>
                                </div>
                            )}

                            {
                                (transactions && transactions.length > 0)  && (
                                    <div className="w-full flex flex-col gap-2 px-4 pt-8">

                                        {transactions.map((transaction) => (
                                            <div key={transaction.id} className="flex justify-between items-center p-4 bg-card rounded-lg shadow-sm">
                                                <Link href={route('transaction.show', { transaction })} className="flex-1">
                                                    <div className={cn("border-l-4 pl-2", {
                                                        "border-green-400": transaction.trend_up,
                                                        "border-red-400": !transaction.trend_up,
                                                    })}>
                                                        <p className="text-sm line-clamp-1">{transaction.description}</p>
                                                        <p className="text-base font-medium">{toMoney(Number(transaction.amount))}</p>
                                                    </div>
                                                </Link>
                                                <Link href={route('transaction.show', { transaction })} className="flex flex-col items-end justify-between gap-2">
                                                    <p className="text-xs">{dayjs(transaction.created_at).format('D MMM YYYY ・ HH:mA')}</p>
                                                    <p className={cn("text-xs w-fit px-2 rounded font-bold", {
                                                        "bg-red-500/20 text-red-500": [TransactionStatus.Failed, TransactionStatus.Cancelled].includes(transaction.status),
                                                        "bg-green-500/50 text-green-500": transaction.status === TransactionStatus.Completed,
                                                        "bg-orange-500/20 text-orange-500": transaction.status === TransactionStatus.Pending,
                                                    })}>{transaction.status}</p>
                                                </Link>
                                            </div>
                                        ))}

                                    </div>
                                )
                            }

                        </>
                    </Deferred>
                </div>
            </div>

            <Drawer open={openWalletInput} onOpenChange={setOpenWalletInput}>
                <DrawerContent className="bg-card">
                    <DrawerHeader>
                        <DrawerTitle>Fund Wallet</DrawerTitle>
                        <DrawerDescription>How much do you to add?</DrawerDescription>
                    </DrawerHeader>
                    <form onSubmit={handleContinue} className="px-4">
                        <div className="pb-8 space-y-2">
                            <Input
                                type="number"
                                placeholder="Minimum of 100"
                                step={0.01}
                                min={settings.wallet.minimum_deposit_ngn}
                                value={data.amount}
                                onChange={e => setData('amount', e.target.value)}
                            />
                            <small className="text-destructive">{errors && errors.amount}</small>

                            <p className="text-end text-sm">Deposit Fee: {toMoney(depositFee)}</p>
                            <p className="text-end text-sm">
                                You Receive: {data.amount ? toMoney(Number(data.amount) - depositFee) : '0.00'}
                            </p>
                        </div>

                        <DrawerFooter className="pb-8 px-0">
                            <Button disabled={processing} type={"submit"} size={'lg'}>
                                {processing && <Loader className="animate-spin" /> }
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

Wallet.layout = (page: ReactNode) => <Authenticated showHeader={false}>{page}</Authenticated>;

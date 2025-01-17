import Authenticated from '@/Layouts/AuthenticatedLayout';
import {Deferred, Head, Link, useForm} from '@inertiajs/react';
import {FormEvent, ReactNode, useState} from 'react';
import {Button} from "@/Components/ui/button";
import {ArrowDown, ArrowUp, HandCoins, Loader, TicketSlash, Wallet2} from "lucide-react";

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

    console.log("deferred: ", transactions)

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

                {/* Body: Transaction History */}
                <Deferred fallback={<div>Loading...</div>} data="transactions">
                    <div className="flex-1 rounded-t-[24px] bg-background overflow-y-auto">

                        {(transactions && transactions.length === 0) && (
                            <div className="h-full flex flex-col items-center justify-center px-8">
                                <TicketSlash size={56} />
                                <h3 className="font-bold text-lg">No transactions yet</h3>
                                <p className="text-center">Once you make you first deposit, you will be able to view it here.</p>
                            </div>
                        )}

                        {(transactions && transactions.length > 0) && (
                            <>
                                <h2 className="px-4 pt-4 font-bold text-lg">Transactions</h2>

                                <Table>
                                    <TableHeader>
                                        <TableRow className="h-1">
                                            <TableHead className="h-4" aria-description="Description and Amount"></TableHead>
                                            <TableHead className="h-4 w-40" aria-description="Date"></TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {transactions.map((transaction, index) => (

                                            <TableRow key={transaction.id} className="bg-card text-card-foreground mt-4 hover:bg-primary/50">
                                                <TableCell className={cn("font-medium border-s-green-500 border-l-4", {
                                                    "border-s-green-400": transaction.trend_up,
                                                    "border-s-red-400": !transaction.trend_up,
                                                })}>
                                                    <Link href={route('transaction.show', {transaction})}>
                                                        <div className="flex items-center">
                                                            <span className="text-sm line-clamp-1">{transaction.description}</span>
                                                        </div>
                                                        <div className="text-base">
                                                            <span>{toMoney(Number(transaction.amount))}</span>
                                                        </div>
                                                    </Link>
                                                </TableCell>
                                                <TableCell className={'text-right ps-0'}>
                                                    <Link href={route('transaction.show', {transaction})} className="flex flex-col items-end gap-1">
                                                        <span className="text-xs">{dayjs(transaction.created_at).format('D MMM YYYY ・ HH:mA')}</span>
                                                        <span className={cn("text-xs w-fit px-2 rounded font-bold", {
                                                            "bg-destructive/20 text-red-500": [TransactionStatus.Failed,TransactionStatus.Cancelled].includes(transaction.status),
                                                            "bg-green-500/50 text-green-500": transaction.status === TransactionStatus.Completed,
                                                            "bg-orange-500/20 text-orange-500": transaction.status === TransactionStatus.Pending,
                                                        })}>{transaction.status}</span>
                                                    </Link>
                                                </TableCell>
                                            </TableRow>

                                        ))}
                                    </TableBody>
                                </Table>
                            </>
                        )}


                    </div>
                </Deferred>
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

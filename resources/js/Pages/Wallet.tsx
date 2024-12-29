import Authenticated from '@/Layouts/AuthenticatedLayout';
import {Head, Link, useForm} from '@inertiajs/react';
import {FormEvent, ReactNode, useState} from 'react';
import {Button} from "@/Components/ui/button";
import {HandCoins, TicketSlash, Wallet2} from "lucide-react";

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
import {toMoney} from "@/lib/utils";
import dayjs from "dayjs";
import {PageProps} from "@/types";
import {Transaction, TransactionStatus} from "@/types/transactions";


interface WalletPageProps extends PageProps {
    transactions: Transaction[]
}

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

            <div className="flex flex-col h-full">
                {/* Header */}
                <div className="bg-primary text-primary-foreground px-4 py-4">
                    <div className="flex justify-between py-4">
                        <h3 className="font-bold">Wallet Balance</h3>
                        <span className="">{toMoney(auth.user.balance)}</span>
                    </div>

                    <div className="flex justify-center items-center py-4 gap-4">
                        <Button onClick={() => setOpenWalletInput(true)} variant="secondary" size="lg" className="text-base">
                            <Wallet2 />
                            Deposit
                        </Button>

                        <Button variant="secondary" size="lg" className="text-base" asChild>
                            <Link href={route('withdraw')}>
                                <HandCoins size={12} />
                                Withdraw
                            </Link>
                        </Button>
                    </div>
                </div>

                {/* Body: Transaction History */}
                <div className="flex-1">

                    {transactions.length === 0 && (
                        <div className="h-full flex flex-col items-center justify-center px-8">
                            <TicketSlash size={56} />
                            <h3 className="font-bold text-lg">No transactions yet</h3>
                            <p className="text-center">Once you make you first deposit, you will be able to view it here.</p>
                        </div>
                    )}

                    <h2 className="px-4 pt-4 font-bold text-lg">Transactions</h2>

                    <Table>
                        <TableHeader>
                            <TableRow className="h-1">
                                <TableHead className="h-4" aria-description="Description and Amount"></TableHead>
                                <TableHead className="h-4" aria-description="Date"></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {transactions.map((transaction, index) => (

                                <TableRow key={transaction.id}>
                                    <TableCell className="font-medium">
                                        <Link href={route('transaction.show', {transaction})}>
                                            <span className="text-sm text-primary/70">{transaction.description}</span>
                                            <div className="">{toMoney(Number(transaction.amount))}</div>
                                        </Link>
                                    </TableCell>
                                    <TableCell className={'text-right'}>
                                        <span className="text-xs text-primary/70">{dayjs(transaction.created_at).format('D MMM YYYY ・ HH:mA')}</span>
                                    </TableCell>
                                </TableRow>

                            ))}
                        </TableBody>
                    </Table>


                </div>
            </div>

            <Drawer open={openWalletInput} onOpenChange={setOpenWalletInput}>
                <DrawerContent>
                    <DrawerHeader>
                        <DrawerTitle>Fund Wallet</DrawerTitle>
                        <DrawerDescription>How much do you to add?</DrawerDescription>
                    </DrawerHeader>
                    <form onSubmit={handleContinue}>
                        <div className="px-4 pb-8">
                            <Input
                                type="number"
                                placeholder="Minimum of 100"
                                step={0.01}
                                min={settings.wallet.minimum_deposit_ngn}
                                value={data.amount}
                                onChange={e => setData('amount', e.target.value)}
                            />
                            <small className="text-destructive">{errors && errors.amount}</small>
                        </div>

                        <DrawerFooter className="pb-8">
                            <Button disabled={processing} type={"submit"} size={'lg'}>
                                {processing ? "Processing..." : "Continue to Payment"}
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

import Betslip from '@/Components/Betslip';
import SingleEvent from '@/Components/SingleEvent';
import Authenticated from '@/Layouts/AuthenticatedLayout';
import {Head, Link, router, useForm, usePage} from '@inertiajs/react';
import {FormEvent, ReactNode, useState} from 'react';
import {Button} from "@/Components/ui/button";
import {HandCoins, TicketSlash, Wallet2} from "lucide-react";
import {PageProps, Transaction} from "@/types";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/Components/ui/drawer"
import {Input} from "@/Components/ui/input";


interface WalletPageProps extends PageProps {
    transactions: Transaction[]
}

export default function Wallet({ transactions, settings }: WalletPageProps) {

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
                        <span className="">&#8358; 7,867.54</span>
                    </div>

                    <div className="flex justify-center items-center py-4 gap-4">
                        <Button onClick={() => setOpenWalletInput(true)} variant="secondary" size="lg" className="text-base">
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

                    {transactions.length === 0 && (
                        <div className="h-full flex flex-col items-center justify-center px-8">
                            <TicketSlash size={56} />
                            <h3 className="font-bold text-lg">No transactions yet</h3>
                            <p className="text-center">Once you make you first deposit, you will be able to view it here.</p>
                        </div>
                    )}

                    {transactions.map((transaction, index) => (
                        <div className="py-2 px-4">
                            <a href={route('deposit.show', { deposit: transaction })}>{transaction.reference}</a>
                        </div>
                    ))}
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
                                min={settings.wallet.minimum_deposit_ngn}
                                value={data.amount}
                                onChange={e => setData('amount', e.target.value)}
                            />
                            <small className="text-destructive">{errors && errors.amount}</small>
                        </div>

                        <DrawerFooter className="pb-8">
                            <Button disabled={processing} type={"submit"} size={'lg'}>Continue</Button>
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

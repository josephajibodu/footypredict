import Betslip from '@/Components/Betslip';
import SingleEvent from '@/Components/SingleEvent';
import Authenticated from '@/Layouts/AuthenticatedLayout';
import {Head, Link, router, usePage} from '@inertiajs/react';
import {ReactNode, useState} from 'react';
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
    const [depositAmount, setDepositAmount] = useState<number>();

    const handleContinue = () => {
        if (!depositAmount) {
            setOpenWalletInput(false);
            return;
        }

        router.get(route('deposit', { amount: depositAmount }));
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
                        <div>Transaction</div>
                    ))}
                </div>
            </div>

            <Drawer open={openWalletInput} onOpenChange={setOpenWalletInput}>
                <DrawerContent>
                    <DrawerHeader>
                        <DrawerTitle>Fund Wallet</DrawerTitle>
                        <DrawerDescription>How much do you to add?</DrawerDescription>
                    </DrawerHeader>
                    <div className="px-4 pb-8">
                        <Input value={depositAmount} onChange={(e) => setDepositAmount(Number(e.target.value))} placeholder="Minimum of 100" min={settings.wallet.minimum_deposit_ngn}  />
                    </div>
                    <DrawerFooter className="pb-8">
                        <Button onClick={handleContinue} size={'lg'}>Continue</Button>
                        {/*<DrawerClose>*/}
                        {/*    <Button variant="outline">Cancel</Button>*/}
                        {/*</DrawerClose>*/}
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>

        </>
    );
}

Wallet.layout = (page: ReactNode) => <Authenticated showHeader={false}>{page}</Authenticated>;

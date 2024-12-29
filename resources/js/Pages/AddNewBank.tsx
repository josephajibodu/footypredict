import Authenticated from '@/Layouts/AuthenticatedLayout';
import {Head, router} from '@inertiajs/react';
import {ReactNode, useState} from 'react';
import {PageProps} from '@/types';
import {Transaction, TransactionStatus, TransactionType} from "@/types/transactions";
import {cn, toMoney} from "@/lib/utils";
import {Separator} from "@/Components/ui/separator";
import {Button} from "@/Components/ui/button";
import {Landmark, Phone, UserCircle, Wallet} from "lucide-react";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat"
import {Input} from "@/Components/ui/input";
import {Label} from "@headlessui/react";
import {
    Drawer, DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle
} from "@/Components/ui/drawer";

dayjs.extend(localizedFormat);

interface Bank {
    bank_name: string,
    bank_code: string
}

interface WithdrawPageProps extends PageProps {
    banks: Bank[]
}

export default function Withdraw({ transaction, auth, banks }: WithdrawPageProps) {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [selectedBank, setSelectedBank] = useState<Bank | undefined>();

    const [defaultBank, setDefaultBank] = useState();
    const [availableBanks, setAvailableBanks] = useState();

    const openDrawer = () => setDrawerOpen(true);
    const closeDrawer = () => setDrawerOpen(false);

    const handleBankSelect = (bank: Bank) => {
        setSelectedBank(bank);
        closeDrawer();
    };

    const handleWithdraw = () => {
        router.post(route('resolve-bank'), {
            account_number: '0040987133',
            bank_code: selectedBank?.bank_code
        }, {
            onSuccess: params => {
                console.log("success:", params)
            },
            onError: params => {
                console.log("error occurred:", params)
            }
        })
    }

    return (
        <>
            <Head title="Withdraw" />

            <div className="flex flex-col px-4 py-4">
                <div className="relative mb-4">
                    <label htmlFor="bank">
                        <Landmark className="absolute size-8 top-3 start-3 text-gray-400" />
                    </label>
                    <Input
                        id="bank"
                        className="h-14 ps-[3.75rem] cursor-pointer placeholder:text-gray-900"
                        readOnly
                        onClick={openDrawer}
                        placeholder={"Select Bank"}
                        value={selectedBank?.bank_name}
                    />
                </div>

                <div className="relative">
                    <label htmlFor='account_number'>
                        <UserCircle className="absolute size-8 top-3 start-3 text-gray-400" />
                    </label>
                    <Input id="account_number" placeholder="Account Number"  className={'h-14 ps-[3.75rem]'} />
                </div>


                <div className="mt-12">
                    <p className="mb-2 text-end">Balance: {toMoney(auth.user.balance)}</p>
                    <div className="relative">
                        <label htmlFor='amount'>
                            <Wallet className="absolute size-8 top-3 start-3 text-gray-400" />
                        </label>
                        <Input
                            id="amount"
                            placeholder="Amount to Withdraw"
                            className={'h-14 ps-[3.75rem]'}
                            type="number"
                            step="0.01"
                        />
                    </div>
                </div>

                <Button onClick={handleWithdraw} className="text-lg h-14 mt-8">Withdraw</Button>
            </div>

            <Drawer
                open={drawerOpen}
                onOpenChange={setDrawerOpen}
                dismissible={true}
            >
                <DrawerContent>
                    <DrawerHeader>
                        <DrawerTitle>Fund Wallet</DrawerTitle>
                        <DrawerDescription>How much do you to add?</DrawerDescription>
                    </DrawerHeader>
                    <div className="h-[65vh] overflow-y-auto">
                        <ul className="divide-y divide-gray-200">
                            {banks.map((bank) => (
                                <li
                                    key={bank.bank_code}
                                    className="p-4 cursor-pointer hover:bg-gray-100"
                                    onClick={() => handleBankSelect(bank)}
                                >
                                    {bank.bank_name}
                                </li>
                            ))}
                        </ul>
                    </div>
                </DrawerContent>
            </Drawer>
        </>
    );
}

Withdraw.layout = (page: ReactNode) => (
    <Authenticated
        backUrl={route('wallet')}
        showHeader={false}
        hideBottomNav={true}
        title="Withdraw"
    >
        {page}
    </Authenticated>
);
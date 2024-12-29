import Authenticated from '@/Layouts/AuthenticatedLayout';
import {Head} from '@inertiajs/react';
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

interface WithdrawPageProps extends PageProps {
    banks: []
}

const banks = [
    {"name": "Bank 1", "code": "500"},
    {"name": "Bank 2", "code": "810"},
    {"name": "Bank 3", "code": "245"},
    {"name": "Bank 4", "code": "414"},
    {"name": "Bank 5", "code": "207"},
    {"name": "Bank 6", "code": "488"},
    {"name": "Bank 7", "code": "709"},
    {"name": "Bank 8", "code": "987"},
    {"name": "Bank 9", "code": "227"},
    {"name": "Bank 10", "code": "607"},
    {"name": "Bank 11", "code": "833"},
    {"name": "Bank 12", "code": "826"},
    {"name": "Bank 13", "code": "898"},
    {"name": "Bank 14", "code": "276"},
    {"name": "Bank 15", "code": "317"},
    {"name": "Bank 16", "code": "269"},
    {"name": "Bank 17", "code": "908"},
    {"name": "Bank 18", "code": "472"},
    {"name": "Bank 19", "code": "991"},
    {"name": "Bank 20", "code": "827"},
    {"name": "Bank 21", "code": "701"},
    {"name": "Bank 22", "code": "763"},
    {"name": "Bank 23", "code": "188"},
    {"name": "Bank 24", "code": "962"},
    {"name": "Bank 25", "code": "784"},
    {"name": "Bank 26", "code": "699"},
    {"name": "Bank 27", "code": "795"},
    {"name": "Bank 28", "code": "727"},
    {"name": "Bank 29", "code": "270"},
    {"name": "Bank 30", "code": "167"},
    {"name": "Bank 31", "code": "475"},
    {"name": "Bank 32", "code": "508"},
    {"name": "Bank 33", "code": "375"},
    {"name": "Bank 34", "code": "303"},
    {"name": "Bank 35", "code": "237"},
    {"name": "Bank 36", "code": "834"},
    {"name": "Bank 37", "code": "790"},
    {"name": "Bank 38", "code": "599"},
    {"name": "Bank 39", "code": "195"},
    {"name": "Bank 40", "code": "330"}
];

export default function Withdraw({ transaction, auth }: WithdrawPageProps) {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [selectedBank, setSelectedBank] = useState<string | undefined>();

    const openDrawer = () => setDrawerOpen(true);
    const closeDrawer = () => setDrawerOpen(false);

    const handleBankSelect = (bankName: string) => {
        setSelectedBank(bankName);
        closeDrawer();
    };


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
                        value={selectedBank}
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

                <Button className="text-lg h-14 mt-8">Withdraw</Button>
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
                                    key={bank.code}
                                    className="p-4 cursor-pointer hover:bg-gray-100"
                                    onClick={() => handleBankSelect(bank.name)}
                                >
                                    {bank.name}
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
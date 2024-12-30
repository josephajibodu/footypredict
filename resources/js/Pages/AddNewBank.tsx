import Authenticated from '@/Layouts/AuthenticatedLayout';
import {Head, router} from '@inertiajs/react';
import {ReactNode, useState} from 'react';
import {PageProps} from '@/types';
import {Transaction, TransactionStatus, TransactionType} from "@/types/transactions";
import {cn, toMoney} from "@/lib/utils";
import {Separator} from "@/Components/ui/separator";
import {Button} from "@/Components/ui/button";
import {Ban, Landmark, Phone, UserCircle, Wallet} from "lucide-react";
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
import axios from "axios";
import {useToast} from "@/hooks/use-toast";

interface Bank {
    bank_name: string,
    bank_code: string
}

interface BankDetails extends Bank {
    account_number: string,
    account_name: string
}

interface WithdrawPageProps extends PageProps {
    banks: Bank[]
}

export default function Withdraw({ transaction, auth, banks }: WithdrawPageProps) {
    const {toast} = useToast();
    const [loading, setLoading] = useState(false);
    const [drawerOpen, setDrawerOpen] = useState(false);

    const [accountNumber, setAccountNumber] = useState<string>();
    const [selectedBank, setSelectedBank] = useState<Bank | undefined>();
    const [resolvedBankDetails, setResolvedBankDetails] = useState<BankDetails>();

    const openDrawer = () => setDrawerOpen(true);
    const closeDrawer = () => setDrawerOpen(false);

    const handleBankSelect = (bank: Bank) => {
        setSelectedBank(bank);
        closeDrawer();
    };

    const handleResolveAccountNumber = () => {

        if (! selectedBank) {
            return toast({
                title: 'Please select an account',
                variant: 'destructive'
            })
        }

        if (! accountNumber) {
            return toast({
                title: 'Please enter your account number',
                variant: 'destructive'
            })
        }

        axios.post(route('resolve-bank'), {
            account_number: accountNumber,
            bank_code: selectedBank?.bank_code
        }).then(res => {
            setResolvedBankDetails(res.data as BankDetails)
        })
        .catch(error => {
            let message = error.response.data.message

            toast({
                title: message,
                variant: 'destructive'
            })
        })
    }

    const saveBankAccount = () => {
        const data = {  };
        router.post(route('add-withdrawal-account.store'), data)
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
                    <Input
                        id="account_number"
                        placeholder="Account Number"
                        className={'h-14 ps-[3.75rem]'}
                        value={accountNumber}
                        onChange={e => setAccountNumber(e.target.value)}
                    />
                </div>

                <Button onClick={handleResolveAccountNumber} className="text-lg h-14 mt-8">Add Bank</Button>
            </div>

            <Drawer
                open={drawerOpen}
                onOpenChange={setDrawerOpen}
                dismissible={true}
            >
                <DrawerContent>
                    <DrawerHeader>
                        <DrawerTitle>Select Bank</DrawerTitle>
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

            <Drawer
                open={!!resolvedBankDetails}
                onOpenChange={(value) => {
                    if (! value) {
                        setResolvedBankDetails(undefined)
                    }
                }}
                dismissible={false}
            >
                <DrawerContent>
                    <DrawerHeader className="py-4 px-4">
                        <DrawerTitle className="font-bold text-xl">Confirm to Add Bank</DrawerTitle>
                        <DrawerDescription className="sr-only">Resolved bank details</DrawerDescription>
                    </DrawerHeader>

                    <div className="px-4 py-2">
                        {resolvedBankDetails ? (
                            <>
                                <div className="mb-4 mt-4 flex flex-col gap-2">
                                    <div className="flex flex-row-reverse justify-between items-center">
                                        <span className="font-medium">{resolvedBankDetails.account_name}</span>
                                        <span className="text-gray-500 text-sm">Account Name</span>
                                    </div>
                                    <div className="flex flex-row-reverse justify-between items-center">
                                        <span className="font-medium">{resolvedBankDetails.bank_name}</span>
                                        <span className="text-gray-500 text-sm">Bank Name</span>
                                    </div>
                                    <div className="flex flex-row-reverse justify-between items-center">
                                        <span className="font-medium">{resolvedBankDetails.account_number}</span>
                                        <span className="text-gray-500 text-sm">Account Number</span>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <p className="text-center text-gray-500">No details available.</p>
                        )}
                    </div>

                    <DrawerFooter className="flex flex-row px-0 pb-0 gap-0 ">
                        <Button
                            variant="destructive"
                            onClick={() => setResolvedBankDetails(undefined)}
                            className="rounded-none"
                        >
                            <Ban className="w-full" />
                            Cancel
                        </Button>
                        <Button
                            variant="default"
                            onClick={() => {
                                toast({
                                    title: "Bank added successfully!",
                                    variant: "default",
                                });
                                setResolvedBankDetails(undefined);
                            }}
                            className="w-full rounded-none"
                        >
                            Add Bank
                        </Button>
                    </DrawerFooter>
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
        title="Add New Bank Account"
    >
        {page}
    </Authenticated>
);
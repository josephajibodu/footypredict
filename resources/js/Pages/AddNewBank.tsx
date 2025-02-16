import { Button } from '@/Components/ui/button';
import {
    Drawer,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
} from '@/Components/ui/drawer';
import { Input } from '@/Components/ui/input';
import { useToast } from '@/hooks/use-toast';
import Authenticated from '@/Layouts/AuthenticatedLayout';
import { extractErrorMessage } from '@/lib/utils';
import { PageProps } from '@/types';
import { Head, router } from '@inertiajs/react';
import axios from 'axios';
import { Check, Landmark, Loader, UserCircle } from 'lucide-react';
import { ReactNode, useState } from 'react';

interface Bank {
    bank_name: string;
    bank_code: string;
}

interface BankDetails extends Bank {
    account_number: string;
    account_name: string;
}

interface AddNewBankProps extends PageProps {
    banks: Bank[];
}

export default function Withdraw({
    transaction,
    auth,
    banks,
}: AddNewBankProps) {
    const { toast } = useToast();
    const [loading, setLoading] = useState(false);
    const [drawerOpen, setDrawerOpen] = useState(false);

    const [accountNumber, setAccountNumber] = useState<string>();
    const [selectedBank, setSelectedBank] = useState<Bank | undefined>();
    const [resolvedBankDetails, setResolvedBankDetails] =
        useState<BankDetails>();

    const openDrawer = () => setDrawerOpen(true);
    const closeDrawer = () => setDrawerOpen(false);

    const handleBankSelect = (bank: Bank) => {
        setSelectedBank(bank);
        closeDrawer();
    };

    const handleResolveAccountNumber = () => {
        if (!selectedBank) {
            return toast({
                title: 'Please select an account',
                variant: 'destructive',
            });
        }

        if (!accountNumber) {
            return toast({
                title: 'Please enter your account number',
                variant: 'destructive',
            });
        }

        setLoading(true);
        axios
            .post(route('resolve-bank'), {
                account_number: accountNumber,
                bank_code: selectedBank?.bank_code,
            })
            .then((res) => {
                setResolvedBankDetails(res.data as BankDetails);
            })
            .catch((error) => {
                const message = error.response.data.message;

                toast({
                    title: message,
                    variant: 'destructive',
                });
            })
            .finally(() => setLoading(false));
    };

    const saveBankAccount = () => {
        if (!resolvedBankDetails) {
            return toast({
                title: 'Invalid bank details',
                variant: 'destructive',
            });
        }

        const data = {
            ...resolvedBankDetails,
        };

        router.post(route('add-withdrawal-account.store'), data, {
            onStart: () => {
                setLoading(true);
            },
            onFinish: () => {
                setLoading(false);
            },
            onError: (error) => {
                const errorMessage = extractErrorMessage(error);

                toast({
                    title: errorMessage ?? 'Error adding bank',
                    variant: 'destructive',
                });
            },
            onSuccess: (page) => {
                toast({
                    title:
                        page.props.flash.success ??
                        'Bank account added successfully',
                    variant: 'success',
                });
            },
        });
    };

    return (
        <>
            <Head title="Withdraw" />

            <div className="flex flex-col px-4 py-4">
                <div className="relative mb-4">
                    <label htmlFor="bank">
                        <Landmark className="absolute start-3 top-3 size-8 text-gray-300" />
                    </label>
                    <Input
                        id="bank"
                        className="h-14 cursor-pointer ps-[3.75rem] placeholder:text-gray-400"
                        readOnly
                        onClick={openDrawer}
                        placeholder={'Select Bank'}
                        value={selectedBank?.bank_name}
                    />
                </div>

                <div className="relative">
                    <label htmlFor="account_number">
                        <UserCircle className="absolute start-3 top-3 size-8 text-gray-300" />
                    </label>
                    <Input
                        id="account_number"
                        placeholder="Account Number"
                        className={
                            'h-14 ps-[3.75rem] placeholder:text-gray-400'
                        }
                        value={accountNumber}
                        onChange={(e) => setAccountNumber(e.target.value)}
                    />
                </div>

                <Button
                    onClick={handleResolveAccountNumber}
                    className="mt-8 h-14 text-lg"
                    disabled={loading}
                >
                    {loading && <Loader className="animate-spin" />}
                    Add Bank
                </Button>
            </div>

            <Drawer
                open={drawerOpen}
                onOpenChange={setDrawerOpen}
                dismissible={true}
            >
                <DrawerContent className="bg-card">
                    <DrawerHeader>
                        <DrawerTitle>Select Bank</DrawerTitle>
                    </DrawerHeader>

                    <div className="h-[65vh] overflow-y-auto">
                        <ul className="divide-y divide-gray-200">
                            {banks.map((bank) => (
                                <li
                                    key={bank.bank_code}
                                    className="flex cursor-pointer justify-between p-4 hover:bg-primary"
                                    onClick={() => handleBankSelect(bank)}
                                >
                                    {bank.bank_name}
                                    {bank.bank_code ===
                                        selectedBank?.bank_code && (
                                        <Check className="text-secondary" />
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>
                </DrawerContent>
            </Drawer>

            <Drawer
                open={!!resolvedBankDetails}
                onOpenChange={(value) => {
                    if (!value) {
                        setResolvedBankDetails(undefined);
                    }
                }}
                dismissible={false}
            >
                <DrawerContent className="bg-card">
                    <DrawerHeader className="px-4 py-4">
                        <DrawerTitle className="text-xl font-bold">
                            Confirm to Add Bank
                        </DrawerTitle>
                        <DrawerDescription className="sr-only">
                            Resolved bank details
                        </DrawerDescription>
                    </DrawerHeader>

                    <div className="px-4 py-2">
                        {resolvedBankDetails ? (
                            <>
                                <div className="mb-4 mt-4 flex flex-col gap-2">
                                    <div className="flex flex-row-reverse items-center justify-between">
                                        <span className="font-medium">
                                            {resolvedBankDetails.account_name}
                                        </span>
                                        <span className="text-sm text-gray-300">
                                            Account Name
                                        </span>
                                    </div>
                                    <div className="flex flex-row-reverse items-center justify-between">
                                        <span className="font-medium">
                                            {resolvedBankDetails.bank_name}
                                        </span>
                                        <span className="text-sm text-gray-300">
                                            Bank Name
                                        </span>
                                    </div>
                                    <div className="flex flex-row-reverse items-center justify-between">
                                        <span className="font-medium">
                                            {resolvedBankDetails.account_number}
                                        </span>
                                        <span className="text-sm text-gray-300">
                                            Account Number
                                        </span>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <p className="text-center text-gray-500">
                                No details available.
                            </p>
                        )}
                    </div>

                    <DrawerFooter className="flex flex-row gap-0 px-0 pb-0">
                        <Button
                            variant="destructive"
                            onClick={() => setResolvedBankDetails(undefined)}
                            className="h-12 rounded-none text-base"
                            disabled={loading}
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="default"
                            onClick={saveBankAccount}
                            className="h-12 w-full rounded-none text-base"
                            disabled={loading}
                        >
                            {loading && <Loader className="animate-spin" />}
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
        backUrl={route('withdraw')}
        showHeader={false}
        hideBottomNav={true}
        title="Add New Bank Account"
    >
        {page}
    </Authenticated>
);

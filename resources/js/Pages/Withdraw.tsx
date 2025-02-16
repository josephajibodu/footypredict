import { Button } from '@/Components/ui/button';
import {
    Drawer,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
} from '@/Components/ui/drawer';
import { Input } from '@/Components/ui/input';
import { useToast } from '@/hooks/use-toast';
import Authenticated from '@/Layouts/AuthenticatedLayout';
import { cn, extractErrorMessage, toMoney } from '@/lib/utils';
import { PageProps } from '@/types';
import { WithdrawalAccount } from '@/types/transactions';
import { Head, Link, router } from '@inertiajs/react';
import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import { Check, Landmark, Loader, Plus, Wallet, XIcon } from 'lucide-react';
import { ReactNode, useState } from 'react';

dayjs.extend(localizedFormat);

interface WithdrawPageProps extends PageProps {
    accounts: WithdrawalAccount[];
    defaultAccount?: WithdrawalAccount;
    can_withdraw: boolean;
}

export default function Withdraw({
    defaultAccount,
    can_withdraw,
    auth,
    accounts,
}: WithdrawPageProps) {
    const { toast } = useToast();
    const [drawerOpen, setDrawerOpen] = useState(false);

    const [loading, setLoading] = useState(false);
    const [selectedBank, setSelectedBank] = useState<
        WithdrawalAccount | undefined
    >(defaultAccount);
    const [amount, setAmount] = useState<string>();

    const openDrawer = () => setDrawerOpen(true);
    const closeDrawer = () => setDrawerOpen(false);

    const handleBankSelect = (account: WithdrawalAccount) => {
        setSelectedBank(account);
        closeDrawer();
    };

    const handleWithdraw = () => {
        if (!can_withdraw) {
            return toast({
                title: 'You are currently unable to process withdrawal.',
                variant: 'destructive',
            });
        }

        if (!amount) {
            return toast({
                title: 'Amount to withdraw is required',
                variant: 'destructive',
            });
        }

        if (!selectedBank) {
            return toast({
                title: 'Please select an account',
                variant: 'destructive',
            });
        }

        router.post(
            route('withdrawal.store'),
            {
                amount: Number(amount),
                account_id: selectedBank.id,
            },
            {
                onStart: () => setLoading(true),
                onFinish: () => setLoading(false),
                onSuccess: (page) => {
                    toast({
                        title: 'Withdrawal successful',
                        description: page.props.flash.success,
                        variant: 'success',
                    });
                },
                onError: (error) => {
                    const message = extractErrorMessage(error);

                    toast({
                        title: message ?? 'Withdrawal failed',
                        variant: 'destructive',
                    });
                },
            },
        );
    };

    return (
        <>
            <Head title="Withdraw" />

            <div className="flex flex-col px-4 py-4">
                <div className="mb-4">
                    <p className="mb-2 text-end">
                        Balance: {toMoney(auth.user.balance)}
                    </p>
                    <div className="relative">
                        <label htmlFor="amount">
                            <Wallet className="absolute start-3 top-3 size-8 text-gray-300" />
                        </label>
                        <Input
                            id="amount"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            placeholder="Amount to Withdraw"
                            className={
                                'h-14 ps-[3.75rem] placeholder:text-gray-400'
                            }
                            type="number"
                            step="0.01"
                        />
                    </div>
                </div>

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

                <Button
                    disabled={loading}
                    onClick={handleWithdraw}
                    className="mt-8 h-14 text-lg"
                >
                    {loading && <Loader className={'animate-spin'} />}
                    Withdraw
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
                    <div className="min-h-[30vh] overflow-y-auto">
                        <ul className="divide-y divide-gray-200">
                            {accounts.length > 0 ? (
                                <ul className="divide-y divide-gray-200">
                                    {accounts.map((account, index) => (
                                        <li
                                            key={account.bank_code}
                                            className={cn(
                                                'flex cursor-pointer items-center justify-between p-4 hover:bg-primary',
                                                {
                                                    'border-t': index === 0,
                                                    'border-b':
                                                        index ===
                                                        accounts.length - 1,
                                                    'bg-primary/10':
                                                        account.id ===
                                                        selectedBank?.id,
                                                },
                                            )}
                                            onClick={() =>
                                                handleBankSelect(account)
                                            }
                                        >
                                            <div className="flex flex-col">
                                                <span>{account.bank_name}</span>
                                                <span className="text-sm text-gray-300">
                                                    {account.account_number}
                                                </span>
                                            </div>
                                            {account.id ===
                                                selectedBank?.id && (
                                                <Check className="text-secondary" />
                                            )}
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <div className="flex flex-col items-center justify-center py-16 text-center">
                                    <XIcon className="mb-4 size-8" />
                                    <p>No accounts found</p>
                                    <Button variant="link" asChild>
                                        <Link
                                            href={route(
                                                'add-withdrawal-account',
                                            )}
                                            className="mt-4 text-secondary underline"
                                        >
                                            <Plus className="mr-2" />
                                            Add a New Account
                                        </Link>
                                    </Button>
                                </div>
                            )}
                        </ul>
                    </div>

                    <DrawerFooter>
                        {accounts.length > 0 && (
                            <DrawerFooter>
                                <Button asChild>
                                    <Link
                                        href={route('add-withdrawal-account')}
                                    >
                                        <Plus />
                                        Add a New Account
                                    </Link>
                                </Button>
                            </DrawerFooter>
                        )}
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
        title="Withdraw"
    >
        {page}
    </Authenticated>
);

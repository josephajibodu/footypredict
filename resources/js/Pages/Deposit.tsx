import { Button } from '@/Components/ui/button';
import { ToastAction } from '@/Components/ui/toast';
import { useToast } from '@/hooks/use-toast';
import { useCopyToClipboard } from '@/hooks/useCopyToClipboard';
import Authenticated from '@/Layouts/AuthenticatedLayout';
import { toMoney } from '@/lib/utils';
import { PageProps } from '@/types';
import { Transaction } from '@/types/transactions';
import { Head, Link } from '@inertiajs/react';
import { ClipboardCopy, Wallet2 } from 'lucide-react';
import { ReactNode } from 'react';

interface DepositPageProps extends PageProps {
    transaction: Transaction;
}

export default function Deposit({
    settings,
    transaction,
    auth,
}: DepositPageProps) {
    const [, copyToClipBoard] = useCopyToClipboard();
    const { toast } = useToast();

    const deposit = transaction.deposit;

    const handleTransferConfirmation = () => {
        toast({
            title: 'Deposit in Progress',
            description:
                "Your deposit is being processed. Funds will be credited to your wallet within 10 minutes. If your wallet isn't updated within an hour, please contact support for assistance.",
            action: (
                <ToastAction altText="Go to wallets" asChild>
                    <Link href={route('wallet')}>Continue</Link>
                </ToastAction>
            ),
        });
    };

    return (
        <>
            <Head title="Deposit Funds" />

            {deposit && (
                <div className="flex h-full flex-col px-4 py-4">
                    <div className="flex-1 space-y-8">
                        {/* Wallet Information */}
                        <section className="flex items-center gap-4">
                            <Wallet2 size={48} />
                            <div>
                                <p className="text-sm text-gray-200">
                                    Wallet Balance
                                </p>
                                <p className="text-xl font-bold text-gray-200">
                                    {toMoney(auth.user.balance)}
                                </p>
                            </div>
                        </section>

                        {/* Transfer Information */}
                        <section>
                            <h2 className="text-lg font-medium text-gray-200">
                                Transfer {toMoney(transaction.amount)} into the
                                account number displayed below.
                            </h2>
                            <p className="mt-2 text-sm text-gray-300">
                                This account expires in 30 minutes. Any transfer
                                to the account details below will reflect in
                                your wallet within 10 minutes.
                            </p>
                        </section>

                        {/* Bank Details Card */}
                        <section className="space-y-6 rounded-lg bg-card p-6 text-primary">
                            <div className="flex justify-between">
                                <div>
                                    <p className="text-sm text-gray-400">
                                        Bank
                                    </p>
                                    <p className="font-bold text-gray-200">
                                        {deposit.metadata.bank_name}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-400">
                                        Account Number
                                    </p>
                                    <p className="font-bold text-gray-200">
                                        {deposit.metadata.account_number}
                                    </p>
                                </div>
                                <Button
                                    size="sm"
                                    variant="outline"
                                    className="rounded-full text-white hover:bg-primary"
                                    onClick={() => {
                                        copyToClipBoard(
                                            deposit.metadata.account_number ??
                                                '',
                                        ).then(() => {
                                            toast({
                                                title: 'Account number copied to clipboard',
                                            });
                                        });
                                    }}
                                >
                                    <ClipboardCopy className="mr-2" /> Copy
                                </Button>
                            </div>
                            <div className="flex justify-between">
                                <div>
                                    <p className="text-sm text-gray-400">
                                        Account Name
                                    </p>
                                    <p className="font-bold text-gray-200">
                                        {deposit.metadata.account_name}
                                    </p>
                                </div>
                            </div>
                        </section>

                        {/* Transfer Confirmation Button */}
                        <Button
                            size="lg"
                            className="hover:bg-primary-dark w-full bg-primary text-white"
                            onClick={handleTransferConfirmation}
                        >
                            I've made the transfer
                        </Button>
                    </div>
                </div>
            )}
        </>
    );
}

Deposit.layout = (page: ReactNode) => (
    <Authenticated
        backUrl={route('wallet')}
        showHeader={false}
        title="Deposit Funds"
    >
        {page}
    </Authenticated>
);

import Authenticated from '@/Layouts/AuthenticatedLayout';
import {Head, Link, router} from '@inertiajs/react';
import { ReactNode } from 'react';
import { Button } from '@/Components/ui/button';
import { ClipboardCopy, Wallet2 } from 'lucide-react';
import { PageProps } from '@/types';
import {useCopyToClipboard} from "@/hooks/useCopyToClipboard";
import {useToast} from "@/hooks/use-toast";
import {Transaction} from "@/types/transactions";
import {toMoney} from "@/lib/utils";
import {ToastAction} from "@/Components/ui/toast";

interface DepositPageProps extends PageProps {
    transaction: Transaction
}

export default function Deposit({ settings, transaction, auth }: DepositPageProps) {
    const [,copyToClipBoard] = useCopyToClipboard();
    const { toast } = useToast();

    const deposit = transaction.deposit;

    const handleTransferConfirmation = () => {
        toast({
            title: "Deposit in Progress",
            description: "Your deposit is being processed. Funds will be credited to your wallet within 10 minutes. If your wallet isn't updated within an hour, please contact support for assistance.",
            action: <ToastAction altText="Go to wallets" asChild><Link href={route('wallet')}>Continue</Link></ToastAction>
        })
    };

    return (
        <>
            <Head title="Deposit Funds" />

            {deposit && (
                <div className="flex flex-col h-full px-4 py-4 bg-white">
                    <div className="flex-1 space-y-8">
                        {/* Wallet Information */}
                        <section className="flex items-center gap-4">
                            <Wallet2 size={48} />
                            <div>
                                <p className="text-sm text-gray-600">Wallet Balance</p>
                                <p className="text-xl font-bold text-gray-800">{toMoney(auth.user.balance)}</p>
                            </div>
                        </section>

                        {/* Transfer Information */}
                        <section>
                            <h2 className="text-lg font-medium text-gray-800">
                                Transfer {toMoney(transaction.amount)} into the account number displayed below.
                            </h2>
                            <p className="text-sm text-gray-600 mt-2">
                                This account expires in 30 minutes. Any transfer to the account details below will reflect in your wallet within 10 minutes.
                            </p>
                        </section>

                        {/* Bank Details Card */}
                        <section className="bg-secondary rounded-lg p-6 text-primary space-y-6">
                            <div className="flex justify-between">
                                <div>
                                    <p className="text-sm text-gray-600">Bank</p>
                                    <p className="font-bold text-gray-800">{deposit.metadata.bank_name}</p>
                                </div>
                            </div>

                            <div className="flex justify-between items-center">
                                <div>
                                    <p className="text-sm text-gray-600">Account Number</p>
                                    <p className="font-bold text-gray-800">{deposit.metadata.account_number}</p>
                                </div>
                                <Button size="sm" variant="outline" className="rounded-full" onClick={() => {
                                    copyToClipBoard(deposit.metadata.account_number ?? '').then(() => {
                                        toast({
                                            title: "Account number copied to clipboard"
                                        })
                                    })
                                }}>
                                    <ClipboardCopy className="mr-2" /> Copy
                                </Button>
                            </div>
                            <div className="flex justify-between">
                                <div>
                                    <p className="text-sm text-gray-600">Account Name</p>
                                    <p className="font-bold text-gray-800">{deposit.metadata.account_name}</p>
                                </div>
                            </div>
                        </section>

                        {/* Transfer Confirmation Button */}
                        <Button
                            size="lg"
                            className="w-full bg-primary text-white hover:bg-primary-dark"
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
    <Authenticated canGoBack showHeader={false} title="Deposit Funds">
        {page}
    </Authenticated>
);
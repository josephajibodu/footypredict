import Betslip from '@/Components/Betslip';
import SingleEvent from '@/Components/SingleEvent';
import Authenticated from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { ReactNode } from 'react';
import { Button } from '@/Components/ui/button';
import { ClipboardCopy, Wallet2 } from 'lucide-react';
import { PageProps } from '@/types';
import {useCopyToClipboard} from "@/hooks/useCopyToClipboard";
import {useToast} from "@/hooks/use-toast";

interface DepositPageProps extends PageProps {
    amount: number;
}

export default function Deposit({ settings, amount }: DepositPageProps) {
    const [,copyToClipBoard] = useCopyToClipboard();
    const { toast } = useToast();

    const handleTransferConfirmation = () => {
        console.log('Transfer confirmation clicked');
    };

    return (
        <>
            <Head title="Deposit Funds" />

            <div className="flex flex-col h-full px-4 py-4 bg-white">
                <div className="flex-1 space-y-8">
                    {/* Wallet Information */}
                    <section className="flex items-center gap-4">
                        <Wallet2 size={48} />
                        <div>
                            <p className="text-sm text-gray-600">Wallet Balance</p>
                            <p className="text-xl font-bold text-gray-800">&#8358;0</p>
                        </div>
                    </section>

                    {/* Transfer Information */}
                    <section>
                        <h2 className="text-lg font-medium text-gray-800">
                            Transfer &#8358;{amount} into your FootyPredict wallet
                        </h2>
                        <p className="text-sm text-gray-600 mt-2">
                            Any transfer to the account details below will reflect in your wallet within 10 minutes.
                        </p>
                    </section>

                    {/* Bank Details Card */}
                    <section className="bg-secondary rounded-lg p-6 text-primary space-y-6">
                        <div className="flex justify-between">
                            <div>
                                <p className="text-sm text-gray-600">Bank</p>
                                <p className="font-bold text-gray-800">VFD Microfinance Bank</p>
                            </div>
                        </div>

                        <div className="flex justify-between items-center">
                            <div>
                                <p className="text-sm text-gray-600">Account Number</p>
                                <p className="font-bold text-gray-800">8787873652</p>
                            </div>
                            <Button size="sm" variant="outline" className="rounded-full" onClick={() => {
                                copyToClipBoard('8787873652').then(() => {
                                    toast({
                                        title: "Account number copied to clipboard"
                                    })
                                })
                            }}>
                                <ClipboardCopy className="mr-2" /> Copy
                            </Button>
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
        </>
    );
}

Deposit.layout = (page: ReactNode) => (
    <Authenticated canGoBack showHeader={false} title="Deposit Funds">
        {page}
    </Authenticated>
);
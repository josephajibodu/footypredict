import { Button } from '@/Components/ui/button';
import {Link, router, usePage} from '@inertiajs/react';
import clsx from 'clsx';
import { PropsWithChildren, ReactNode } from 'react';
import {ChevronLeft} from "lucide-react";

export default function Authenticated({
    children,
    showHeader = true,
    canGoBack = false,
    title
}: PropsWithChildren<{ showHeader?: boolean, canGoBack?: boolean, title?: string }>) {
    const { url } = usePage();

    const gotoWallet = () => {
        router.visit(route('wallet'));
    }

    return (
        <div className="flex flex-col h-screen bg-gray-100 dark:bg-gray-900">
            {canGoBack && <header className="fixed left-0 right-0 z-10 h-14 flex items-center gap-4 px-2 py-2 bg-white">
                <span onClick={() => window.history.back()}><ChevronLeft /></span>
                <h2 className="text-lg">{title}</h2>
            </header>}

            {showHeader && <header className="fixed left-0 right-0 z-10 flex items-center justify-between px-2 py-2 bg-white">
                <h3 className="font-bold">FootyPredict</h3>
                <div>
                    <Button variant={'outline'} onClick={gotoWallet}>NGN 7,543.76</Button>
                </div>
            </header>}
            <main className={clsx("relative flex-1 overflow-y-scroll pb-12", {
                "pt-[56px]": showHeader
            })}>
                {children}
            </main>
            <nav className="text-white bg-black border-b border-gray-100 dark:bg-gray-800 fixed bottom-0 right-0 left-0">
                <ul className="flex items-center justify-between">
                    <li>
                        <Link
                            href={route('events')}
                            className={clsx(
                                'flex flex-col items-center px-4 py-2',
                                {
                                    'bg-gray-700': url.startsWith('/events'),
                                },
                            )}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="size-6"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                                />
                            </svg>
                            <span className="text-sm">Home</span>
                        </Link>
                    </li>
                    <li>
                        <Link
                            href={route('bets')}
                            className={clsx(
                                'flex flex-col items-center px-4 py-2',
                                {
                                    'bg-gray-700': url.startsWith('/bets'),
                                },
                            )}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="size-6"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 0 1 0 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 0 1 0-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375Z"
                                />
                            </svg>
                            <span className="text-sm">Open Bets</span>
                        </Link>
                    </li>
                    <li>
                        <Link
                            href={route('wallet')}
                            className={clsx(
                                'flex flex-col items-center px-4 py-2',
                                {
                                    'bg-gray-700': url.startsWith('/wallet'),
                                },
                            )}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="size-6"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M21 12a2.25 2.25 0 0 0-2.25-2.25H15a3 3 0 1 1-6 0H5.25A2.25 2.25 0 0 0 3 12m18 0v6a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 9m18 0V6a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 6v3"
                                />
                            </svg>
                            <span className="text-sm">Wallet</span>
                        </Link>
                    </li>
                    <li>
                        <Link
                            href={route('settings')}
                            className={clsx(
                                'flex flex-col items-center px-4 py-2',
                                {
                                    'bg-gray-700': url.startsWith('/settings'),
                                },
                            )}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="size-6"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                                />
                            </svg>
                            <span className="text-sm">Profile</span>
                        </Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
}

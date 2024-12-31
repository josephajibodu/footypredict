import { Button } from '@/Components/ui/button';
import {Link, router, usePage} from '@inertiajs/react';
import clsx, {ClassValue} from 'clsx';
import { PropsWithChildren, ReactNode } from 'react';
import {ChevronLeft, Home, List, User, Wallet} from "lucide-react";
import {cn, toMoney} from "@/lib/utils";

interface AuthLayoutProps extends PropsWithChildren {
    showHeader?: boolean,
    hideBottomNav?: boolean,
    backUrl?: string,
    title?: string,
    containerClassName?: ClassValue
}
export default function Authenticated({
    children,
    showHeader = true,
    hideBottomNav = false,
    backUrl,
    title,
    containerClassName
}: AuthLayoutProps) {
    const { url, props: { auth } } = usePage();

    const gotoWallet = () => {
        router.visit(route('wallet'));
    }

    return (
        <div className="flex flex-col h-screen bg-primary/20">
            {/* Header Section */}
            <section className="max-w-md mx-auto fixed left-0 right-0 z-10 h-[64px] ">
                {(backUrl && !showHeader) && <header className="flex items-center gap-4 px-2 py-2 h-full bg-white border-b">
                    <span onClick={() => router.visit(backUrl)}><ChevronLeft /></span>
                    <h2 className="text-lg">{title}</h2>
                </header>}

                {showHeader && <header className="flex items-center justify-between px-2 py-2 h-full bg-primary border-b">
                    <h3 className="font-bold text-white">FootyPredict</h3>
                    <div className="flex gap-2">
                        {auth.user && (
                            <Button className="rounded-none" variant={'outline'} onClick={gotoWallet}>{toMoney(auth.user.balance)}</Button>
                        )}

                        {auth.user === null && (
                            <>
                                <Button className="rounded-none" variant={'outline'} onClick={gotoWallet}>
                                    <Link href={route('login')}>Login</Link>
                                </Button>

                                <Button className="rounded-none" variant={'outline'} onClick={gotoWallet}>
                                    <Link href={route('register')}>Register</Link>
                                </Button>
                            </>
                        )}
                    </div>
                </header>}
            </section>

            {/* Main Content */}
            <main className={cn(containerClassName,
                "relative flex-1 overflow-y-scroll w-full max-w-md mx-auto bg-secondary",
                {
                    "mt-[64px]": showHeader || backUrl
                }
            )}>
                {children}
            </main>

            {/* Bottom Navigation */}
            {!hideBottomNav && (
                <nav className="max-w-md mx-auto text-white bg-black border-t border-gray-100 dark:bg-gray-800 fixed bottom-0 right-0 left-0">
                    <ul className="flex items-center justify-between">
                        <li>
                            <Link
                                href={route('events')}
                                className={cn(
                                    "flex flex-col items-center px-4 py-2",
                                    { "bg-gray-700": url.startsWith('/events') }
                                )}
                            >
                                <Home size={20} />
                                <span className="text-sm">Home</span>
                            </Link>
                        </li>
                        <li>
                            <Link
                                href={route('bets')}
                                className={cn(
                                    "flex flex-col items-center px-4 py-2",
                                    { "bg-gray-700": url.startsWith('/bets') }
                                )}
                            >
                                <List size={20} />
                                <span className="text-sm">Open Bets</span>
                            </Link>
                        </li>
                        <li>
                            <Link
                                href={route('wallet')}
                                className={cn(
                                    "flex flex-col items-center px-4 py-2",
                                    { "bg-gray-700": url.startsWith('/wallet') }
                                )}
                            >
                                <Wallet size={20} />
                                <span className="text-sm">Wallet</span>
                            </Link>
                        </li>
                        <li>
                            <Link
                                href={route('settings')}
                                className={cn(
                                    "flex flex-col items-center px-4 py-2",
                                    { "bg-gray-700": url.startsWith('/settings') }
                                )}
                            >
                                <User size={20} />
                                <span className="text-sm">Profile</span>
                            </Link>
                        </li>
                    </ul>
                </nav>
            )}
        </div>
    );
}

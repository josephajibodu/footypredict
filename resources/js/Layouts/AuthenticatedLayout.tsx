import { Button } from '@/Components/ui/button';
import {Link, router, usePage} from '@inertiajs/react';
import clsx, {ClassValue} from 'clsx';
import {PropsWithChildren, ReactNode, useEffect, useState} from 'react';
import {ChevronLeft, Home, List, User, Wallet} from "lucide-react";
import {cn, toMoney} from "@/lib/utils";
import {
    Dialog,
    DialogContent,
    DialogDescription, DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/Components/ui/dialog";
import {Badge} from "@/Components/ui/badge";

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

    const [isPWA, setIsPWA] = useState(false);
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    useEffect(() => {
        const checkPWA = () => {
            const standalone = window.matchMedia('(display-mode: standalone)').matches;
            const navigatorStandalone = (window.navigator as any).standalone; // For iOS Safari

            let isPWA = standalone || navigatorStandalone;

            if (! isPWA) {
                document.body.style.pointerEvents = "none";
            }

            setIsPWA(isPWA);
        };

        checkPWA();
        window.addEventListener('resize', checkPWA);

        return () => window.removeEventListener('resize', checkPWA);
    }, []);

    const showPWAGuide = auth.user && (!isMobile || !isPWA);

    return (
        <div className="flex flex-col h-screen bg-background text-foreground">
            {/* Header Section */}
            <section className="max-w-md mx-auto fixed left-0 right-0 z-10 h-[64px] ">
                {(backUrl && !showHeader) && <header className="flex items-center gap-4 px-2 py-2 h-full bg-card text-card-foreground border-b">
                    <span onClick={() => router.visit(backUrl)}><ChevronLeft /></span>
                    <h2 className="text-lg">{title}</h2>
                </header>}

                {showHeader && <header className="flex items-center justify-between px-2 py-2 h-full bg-primary border-b">
                    <h3 className="font-bold text-white">FootyPredict</h3>
                    <div className="flex gap-2">
                        {auth.user && (
                            <div className="bg-card text-card-foreground rounded-lg border-none py-2 px-2 text-sm" onClick={gotoWallet}>{toMoney(auth.user.balance)}</div>
                        )}

                        {auth.user === null && (
                            <>
                                <Button className="rounded-none" variant={'outline'}>
                                    <Link href={route('login')}>Login</Link>
                                </Button>

                                <Button className="rounded-none" variant={'outline'}>
                                    <Link href={route('register')}>Register</Link>
                                </Button>
                            </>
                        )}
                    </div>
                </header>}
            </section>

            {/* Main Content */}
            <main className={cn(containerClassName,
                "relative flex-1 overflow-y-scroll w-full max-w-md mx-auto",
                {
                    "mt-[64px]": showHeader || backUrl,
                    "mb-[56px]": !hideBottomNav,
                }
            )}>
                {children}
            </main>

            {/* Bottom Navigation */}
            {!hideBottomNav && (
                <nav className="max-w-md mx-auto text-white bg-primary border-t dark:bg-gray-800 fixed bottom-0 right-0 left-0">
                    <ul className="grid grid-cols-4 items-center justify-between">
                        <li>
                            <Link
                                href={route('events')}
                                className={cn(
                                    "flex flex-col items-center px-4 py-2",
                                    { "bg-gradient": url.startsWith('/events') }
                                )}
                            >
                                <Home size={20} />
                                <span className="text-sm whitespace-nowrap">Home</span>
                            </Link>
                        </li>
                        <li>
                            <Link
                                href={route('bets.open-bets' )}
                                className={cn(
                                    "flex flex-col items-center px-4 py-2",
                                    { "bg-gradient": url.startsWith('/bets') }
                                )}
                            >
                                <List size={20} />
                                <span className="text-sm whitespace-nowrap">Open Bets</span>
                            </Link>
                        </li>
                        <li>
                            <Link
                                href={route('wallet')}
                                className={cn(
                                    "flex flex-col items-center px-4 py-2",
                                    { "bg-gradient": url.startsWith('/wallet') }
                                )}
                            >
                                <Wallet size={20} />
                                <span className="text-sm whitespace-nowrap">Wallet</span>
                            </Link>
                        </li>
                        <li>
                            <Link
                                href={route('settings')}
                                className={cn(
                                    "flex flex-col items-center px-4 py-2",
                                    { "bg-gradient": url.startsWith('/settings') }
                                )}
                            >
                                <User size={20} />
                                <span className="text-sm whitespace-nowrap">Profile</span>
                            </Link>
                        </li>
                    </ul>
                </nav>
            )}

            {/* Dialog for PWA Restriction */}
            <Dialog open={showPWAGuide}>
                <DialogContent className="sm:max-w-[425px]" dismissible={false}>
                    <DialogHeader>
                        <DialogTitle>Install FootyPredict for a Seamless Experience</DialogTitle>
                    </DialogHeader>
                    <div className="text-sm">
                        Quickly access FootyPredict from your home screen by following these steps:
                        <ul className="mt-2 space-y-2 list-disc ps-8">
                            <li>Tap the three dots <Badge className="rounded">⋮</Badge> in the top-right corner of your browser.</li>
                            <li>Select <strong>"Install App"</strong> or <strong>"Add to Home Screen"</strong>.</li>
                            <li>Tap <strong>"Add"</strong>, and you're all set!</li>
                        </ul>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}

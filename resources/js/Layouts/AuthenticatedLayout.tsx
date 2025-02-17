import ApplicationLogo from '@/Components/ApplicationLogo';
import InstallPWADialog from '@/Components/PWA/InstallPWADialog';
import PushNotificationHandler from '@/Components/PWA/PushNotificationHandler';
import { Badge } from '@/Components/ui/badge';
import { Button } from '@/Components/ui/button';
import { cn, toMoney } from '@/lib/utils';
import { Link, router, usePage } from '@inertiajs/react';
import { ClassValue } from 'clsx';
import { ChevronLeft, Home, List, User, Wallet } from 'lucide-react';
import { PropsWithChildren } from 'react';

interface AuthLayoutProps extends PropsWithChildren {
    showHeader?: boolean;
    hideBottomNav?: boolean;
    backUrl?: string;
    title?: string;
    containerClassName?: ClassValue;
}
export default function Authenticated({
    children,
    showHeader = true,
    hideBottomNav = false,
    backUrl,
    title,
    containerClassName,
}: AuthLayoutProps) {
    const {
        url,
        props: { auth, stats },
    } = usePage();

    const gotoWallet = () => {
        router.visit(route('wallet'));
    };

    return (
        <div className="flex h-screen flex-col bg-background text-foreground">
            {/* Header Section */}
            <section className="fixed left-0 right-0 z-10 mx-auto h-[64px] max-w-md">
                {backUrl && !showHeader && (
                    <header className="flex h-full items-center gap-4 border-b bg-card px-2 py-2 text-card-foreground">
                        <span onClick={() => router.visit(backUrl)}>
                            <ChevronLeft />
                        </span>
                        <h2 className="text-lg">{title}</h2>
                    </header>
                )}

                {showHeader && (
                    <header className="flex h-full items-center justify-between border-b bg-primary px-2 py-2">
                        <ApplicationLogo className="h-8 w-fit" />
                        <div className="flex gap-2">
                            {auth.user && (
                                <div
                                    className="rounded-lg border-none bg-card px-2 py-2 text-sm font-bold text-card-foreground"
                                    onClick={gotoWallet}
                                >
                                    {toMoney(auth.user.balance)}
                                </div>
                            )}

                            {auth.user === null && (
                                <>
                                    <Button
                                        className="rounded-none"
                                        variant={'outline'}
                                    >
                                        <Link href={route('login')}>Login</Link>
                                    </Button>

                                    <Button
                                        className="rounded-none"
                                        variant={'outline'}
                                    >
                                        <Link href={route('register')}>
                                            Register
                                        </Link>
                                    </Button>
                                </>
                            )}
                        </div>
                    </header>
                )}
            </section>

            {/* Main Content */}
            <main
                className={cn(
                    containerClassName,
                    'relative mx-auto w-full max-w-md flex-1 overflow-y-scroll',
                    {
                        'mt-[64px]': showHeader || backUrl,
                    },
                )}
                style={{
                    marginBottom: hideBottomNav
                        ? undefined
                        : 'calc(54px + env(safe-area-inset-bottom,16px))',
                }}
            >
                {children}
            </main>

            {/* Bottom Navigation */}
            {!hideBottomNav && (
                <div className="fixed bottom-0 left-0 right-0 mx-auto max-w-md border-t bg-primary pb-[env(safe-area-inset-bottom,16px)] text-white dark:bg-gray-800">
                    <nav className="grid h-[54px] grid-cols-4 items-center justify-between">
                        <Link
                            href={route('events')}
                            className={cn(
                                'flex flex-col items-center px-4 py-2 text-white/50',
                                { 'text-white': url.startsWith('/events') },
                            )}
                        >
                            <Home size={20} />
                            <span className="whitespace-nowrap text-sm">
                                Home
                            </span>
                        </Link>

                        <Link
                            href={route('bets.open-bets')}
                            className={cn(
                                'relative flex flex-col items-center px-4 py-2 text-white/50',
                                { 'text-white': url.startsWith('/bets') },
                            )}
                        >
                            <List size={20} />
                            <span className="whitespace-nowrap text-sm">
                                Open Bets
                            </span>
                            {stats.open_bets && (
                                <Badge className="bg-gradient absolute left-[58%] top-1 flex size-5 items-center justify-center rounded-full border-none">
                                    {stats.open_bets}
                                </Badge>
                            )}
                        </Link>

                        <Link
                            href={route('wallet')}
                            className={cn(
                                'flex flex-col items-center px-4 py-2 text-white/50',
                                { 'text-white': url.startsWith('/wallet') },
                            )}
                        >
                            <Wallet size={20} />
                            <span className="whitespace-nowrap text-sm">
                                Wallet
                            </span>
                        </Link>

                        <Link
                            href={route('settings')}
                            className={cn(
                                'flex flex-col items-center px-4 py-2 text-white/50',
                                { 'text-white': url.startsWith('/settings') },
                            )}
                        >
                            <User size={20} />
                            <span className="whitespace-nowrap text-sm">
                                Profile
                            </span>
                        </Link>
                    </nav>
                </div>
            )}

            <PushNotificationHandler />
            <InstallPWADialog enableLogging />
        </div>
    );
}

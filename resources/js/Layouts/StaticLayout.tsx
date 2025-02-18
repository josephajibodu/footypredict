import ApplicationLogo from '@/Components/ApplicationLogo';
import StaticLayoutHeader from '@/Components/StaticLayoutHeader';
import { Link } from '@inertiajs/react';
import { Facebook, Instagram, Mail, Phone, Twitter } from 'lucide-react';
import { PropsWithChildren } from 'react';

interface StaticLayoutProps extends PropsWithChildren {
    hideHeader?: boolean;
    hideFooter?: boolean;
}

export default function StaticLayout({
    children,
    hideFooter = false,
    hideHeader = false,
}: StaticLayoutProps) {
    return (
        <div className="w-full">
            {!hideHeader && <StaticLayoutHeader />}

            <main className="min-h-screen">{children}</main>

            {!hideFooter && (
                <footer className="bg-primary/50 px-12 py-16">
                    <div className="mx-auto grid max-w-screen-xl grid-cols-1 gap-16 md:grid-cols-2 lg:grid-cols-12">
                        <div className="col-span-full flex flex-col items-center sm:col-span-2 lg:col-span-6 lg:items-start">
                            <h4 className="relative mb-8 pb-2 text-2xl font-bold after:absolute after:bottom-0 after:left-0 after:h-1 after:w-full after:bg-primary after:content-[''] lg:after:w-16">
                                <ApplicationLogo className="w-[200px]" />
                            </h4>
                            <p className="mb-6 max-w-md text-center lg:text-start">
                                Footy Predict is a Jackpot-style predict-to-win
                                service for football matches. We use social
                                wagering to share games among users. We are also
                                out to solve the perennial issue of bookies
                                locking and unlocking games unfairly by ensuring
                                that all games are booked before they start and
                                only truthful outcomes are rewarded.
                            </p>

                            <ul className="flex flex-col items-center space-y-2 md:items-start">
                                <li className="flex items-center gap-4">
                                    <Phone className="size-5" />
                                    <a href="tel:+789-5565886">+789-5565886</a>
                                </li>
                                <li className="flex items-center gap-4">
                                    <Mail className="size-5" />
                                    <a href="mailto:support@footypredict.app">
                                        support@footypredict.app
                                    </a>
                                </li>
                            </ul>

                            <ul className="mt-4 flex gap-4">
                                <li className="flex size-10 items-center justify-center rounded-full border border-card-foreground">
                                    <a href="" target="_blank">
                                        <Twitter className="size-5" />
                                    </a>
                                </li>

                                <li className="flex size-10 items-center justify-center rounded-full border border-card-foreground">
                                    <a href="" target="_blank">
                                        <Instagram className="size-5" />
                                    </a>
                                </li>

                                <li className="flex size-10 items-center justify-center rounded-full border border-card-foreground">
                                    <a href="" target="_blank">
                                        <Facebook className="size-5" />
                                    </a>
                                </li>
                            </ul>
                        </div>

                        <div className="col-span-full flex flex-col items-center sm:col-span-1 lg:col-span-3 lg:items-start">
                            <h4 className="relative mb-8 pb-2 text-2xl font-bold after:absolute after:bottom-0 after:left-0 after:h-1 after:w-full after:bg-primary after:content-[''] lg:after:w-16">
                                Quick Link
                            </h4>

                            <ul className="flex flex-col items-center space-y-2 lg:items-start">
                                <li className="flex items-center gap-4">
                                    <Link
                                        className="hover:text-secondary"
                                        href={route('how-to-play')}
                                    >
                                        How to Play
                                    </Link>
                                </li>
                                <li className="flex items-center gap-4">
                                    <Link
                                        className="hover:text-secondary"
                                        href={route('faq')}
                                    >
                                        Frequently Asked Questions
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        <div className="col-span-full flex flex-col items-center sm:col-span-1 lg:col-span-3 lg:items-start">
                            <h4 className="relative mb-8 pb-2 text-2xl font-bold after:absolute after:bottom-0 after:left-0 after:h-1 after:w-full after:bg-primary after:content-[''] lg:after:w-16">
                                Legal
                            </h4>

                            <ul className="flex flex-col items-center space-y-2 lg:items-start">
                                <li className="flex items-center gap-4">
                                    <Link
                                        className="hover:text-secondary"
                                        href={''}
                                    >
                                        Terms of Service
                                    </Link>
                                </li>
                                <li className="flex items-center gap-4">
                                    <Link
                                        className="hover:text-secondary"
                                        href={''}
                                    >
                                        Privacy Policy
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </footer>
            )}
        </div>
    );
}

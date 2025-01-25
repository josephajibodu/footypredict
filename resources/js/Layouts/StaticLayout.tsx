import ApplicationLogo from '@/Components/ApplicationLogo';
import {Head, Link} from '@inertiajs/react';
import { PropsWithChildren } from 'react';
import {Button} from "@/Components/ui/button";
import {Facebook, Instagram, Mail, Phone, Twitter} from "lucide-react";
import StaticLayoutHeader from "@/Components/StaticLayoutHeader";

interface StaticLayoutProps extends PropsWithChildren {
    hideHeader?: boolean
    hideFooter?: boolean
}

export default function StaticLayout({
    children,
    hideFooter = false,
    hideHeader = false
}: StaticLayoutProps) {
    return (
        <div className="w-full">
            {!hideHeader && <StaticLayoutHeader/>}

            <main className="min-h-screen">
                {children}
            </main>

            {!hideFooter && <footer className="bg-primary/50 px-12 py-16">
                <div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-16">
                    <div
                        className="col-span-full sm:col-span-2 lg:col-span-6 flex flex-col items-center lg:items-start">
                        <h4 className="mb-8 pb-2 text-2xl font-bold relative after:content-[''] after:bg-primary after:w-full lg:after:w-16 after:h-1 after:absolute after:bottom-0 after:left-0">
                            FootyPredict
                        </h4>
                        <p className="max-w-md mb-6 text-center lg:text-start">
                            Footy Predict is a Jackpot-style predict-to-win service for football matches.
                            We use social wagering to share games among users. We are also out to solve the perennial
                            issue of bookies locking and unlocking games unfairly by ensuring that all games are booked
                            before they start and only truthful outcomes are rewarded.
                        </p>

                        <ul className="space-y-2 flex flex-col items-center md:items-start">
                            <li className="flex items-center gap-4">
                                <Phone className="size-5"/>
                                <a href="tel:+789-5565886">+789-5565886</a>
                            </li>
                            <li className="flex items-center gap-4">
                                <Mail className="size-5"/>
                                <a href="mailto:support@footypredict.app">support@footypredict.app</a>
                            </li>
                        </ul>

                        <ul className="mt-4 flex gap-4">
                            <li className="border rounded-full border-card-foreground size-10 flex items-center justify-center">
                                <a href="" target="_blank">
                                    <Twitter className="size-5"/>
                                </a>
                            </li>

                            <li className="border rounded-full border-card-foreground size-10 flex items-center justify-center">
                                <a href="" target="_blank">
                                    <Instagram className="size-5"/>
                                </a>
                            </li>

                            <li className="border rounded-full border-card-foreground size-10 flex items-center justify-center">
                                <a href="" target="_blank">
                                    <Facebook className="size-5"/>
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div
                        className="col-span-full sm:col-span-1 lg:col-span-3 flex flex-col items-center lg:items-start">
                        <h4 className="mb-8 pb-2 text-2xl font-bold relative after:content-[''] after:bg-primary after:w-full lg:after:w-16 after:h-1 after:absolute after:bottom-0 after:left-0">
                            Quick Link
                        </h4>

                        <ul className="space-y-2 flex flex-col items-center lg:items-start">
                            <li className="flex items-center gap-4">
                                <Link className="hover:text-secondary" href={route('how-to-play')}>How to Play</Link>
                            </li>
                            <li className="flex items-center gap-4 ">
                                <Link className="hover:text-secondary" href={route('faq')}>Frequently Asked
                                    Questions</Link>
                            </li>
                        </ul>
                    </div>

                    <div
                        className="col-span-full sm:col-span-1 lg:col-span-3 flex flex-col items-center lg:items-start">
                        <h4 className="mb-8 pb-2 text-2xl font-bold relative after:content-[''] after:bg-primary after:w-full lg:after:w-16 after:h-1 after:absolute after:bottom-0 after:left-0">
                            Legal
                        </h4>

                        <ul className="space-y-2 flex flex-col items-center lg:items-start">
                            <li className="flex items-center gap-4">
                                <Link className="hover:text-secondary" href={""}>Terms of Service</Link>
                            </li>
                            <li className="flex items-center gap-4">
                                <Link className="hover:text-secondary" href={""}>Privacy Policy</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </footer>}
        </div>
    );
}

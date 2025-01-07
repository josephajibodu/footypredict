import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';
import { PropsWithChildren } from 'react';
import {Button} from "@/Components/ui/button";
import {Mail, Phone} from "lucide-react";

export default function StaticLayout({ children }: PropsWithChildren) {
    return (
        <div className="bg-red-600 w-full">
            <header className="py-6 bg-card flex px-12">
                <nav className="flex flex-1 justify-between items-center max-w-screen-xl mx-auto">
                    <div className="">
                        <span className="font-bold text-lg">FootyPredict</span>
                    </div>

                    <ul className="flex flex-1 justify-center gap-8">
                        <li className="flex items-center gap-4">
                            <Link className="hover:text-secondary" href={""}>Home</Link>
                        </li>
                        <li className="flex items-center gap-4">
                            <Link className="hover:text-secondary" href={""}>How to Play</Link>
                        </li>
                        <li className="flex items-center gap-4">
                            <Link className="hover:text-secondary" href={""}>FAQs</Link>
                        </li>
                    </ul>

                    <ul className="">
                        <Button size="lg" className="bg-gradient-to-r from-secondary to-accent text-base" asChild>
                            <li>Sign In</li>
                        </Button>
                    </ul>
                </nav>

            </header>

            <main className="min-h-screen">

            </main>

            <footer className="bg-card px-12 py-16">
                <div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-16">
                    <div className="col-span-full sm:col-span-2 lg:col-span-6 flex flex-col items-center lg:items-start">
                        <h4 className="mb-8 pb-2 text-2xl font-bold relative after:content-[''] after:bg-primary after:w-full lg:after:w-16 after:h-1 after:absolute after:bottom-0 after:left-0">
                            FootyPredict
                        </h4>
                        <p className="max-w-md mb-6 text-center lg:text-start">
                            Dignissi to bring significant changes online based learning by
                            doing resed cased learning by cosin extensive of arch for game
                        </p>

                        <ul className="space-y-2 flex flex-col items-center md:items-start">
                            <li className="flex items-center gap-4">
                                <Phone className="size-5" />
                                <a href="tel:+789-5565886">+789-5565886</a>
                            </li>
                            <li className="flex items-center gap-4">
                                <Mail className="size-5" />
                                <a href="mailto:support@footypredict.app">support@footypredict.app</a>
                            </li>
                        </ul>
                    </div>

                    <div className="col-span-full sm:col-span-1 lg:col-span-3 flex flex-col items-center lg:items-start">
                        <h4 className="mb-8 pb-2 text-2xl font-bold relative after:content-[''] after:bg-primary after:w-full lg:after:w-16 after:h-1 after:absolute after:bottom-0 after:left-0">
                            Quick Link
                        </h4>

                        <ul className="space-y-2 flex flex-col items-center lg:items-start">
                            <li className="flex items-center gap-4">
                                <Link className="hover:text-secondary" href={""}>How to Play</Link>
                            </li>
                            <li className="flex items-center gap-4 ">
                                <Link className="hover:text-secondary" href={""}>Frequently Asked Questions</Link>
                            </li>
                        </ul>
                    </div>

                    <div className="col-span-full sm:col-span-1 lg:col-span-3 flex flex-col items-center lg:items-start">
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
            </footer>
        </div>
    );
}

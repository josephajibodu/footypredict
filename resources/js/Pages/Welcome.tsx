import ClickToAction from '@/Components/ClickToAction';
import { Button } from '@/Components/ui/button';
import StaticLayout from '@/Layouts/StaticLayout';
import { Head, Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import {
    CheckCircle,
    Gift,
    Rocket,
    Settings,
    Shield,
    Users,
} from 'lucide-react';
import { ReactNode } from 'react';

const features = [
    {
        icon: CheckCircle,
        title: 'Transparent & Fair',
        description:
            'Enjoy a fair and transparent platform where all outcomes are verified and trust is built into every game. Predict, stake, and win with confidence!',
    },
    {
        icon: Rocket,
        title: 'Instant Payouts',
        description:
            'Win big and receive your payouts instantly! No delays or hidden charges, just fast, reliable transactions.',
    },
    {
        icon: Users,
        title: 'Community Driven',
        description:
            'Join a community of like-minded football fans who share their predictions, insights, and strategies to maximize winnings.',
    },
    {
        icon: Shield,
        title: 'Secure & Safe',
        description:
            'Your funds and personal data are fully protected with top-tier security, so you can focus on your predictions without worry.',
    },
    {
        icon: Settings,
        title: 'Easy to Use',
        description:
            'Our platform is designed to be simple and intuitive, making it easy for you to stake your predictions and follow your winnings.',
    },
    {
        icon: Gift,
        title: 'Exciting Rewards',
        description:
            'Unlock exciting rewards, bonuses, and special prizes as you make accurate predictions and become a top player in the community.',
    },
];

export default function Welcome() {
    return (
        <>
            <Head title="Predict. Stake. Win Big" />

            <section>
                <div className="mx-auto flex max-w-screen-xl flex-col items-center pb-0 pt-12 md:flex-row md:pb-12">
                    <div className="w-full px-4 py-12 text-center md:w-7/12 md:px-0 md:py-24 md:text-start">
                        <h1 className="mb-8 text-3xl font-bold leading-relaxed md:text-5xl">
                            The Ultimate Football <br /> Prediction Platform
                        </h1>
                        <p className="mb-12 text-lg leading-relaxed">
                            Step into the world of football prediction like
                            never before with FootyPredict—a revolutionary
                            service designed for football lovers to predict,
                            stake, and win big in a fair and transparent way.
                            Join thousands of fans who are turning their
                            football knowledge into real winnings.
                        </p>

                        <Button
                            asChild
                            variant="secondary"
                            className="h-12 bg-gradient-to-r from-secondary to-accent text-base"
                        >
                            <Link href={route('events')}>Get Started</Link>
                        </Button>
                    </div>

                    <div className="flex justify-center md:w-5/12">
                        <div className="hidden h-[600px] md:block">
                            <motion.img
                                src="/images/sample-app.png"
                                alt="sample app"
                                className="rotate-[8deg] md:h-full"
                                initial={{ opacity: 0, x: -100 }}
                                animate={{ opacity: 1, x: 0, rotate: 8 }}
                                transition={{ duration: 0.8 }}
                            />
                        </div>

                        {/* Mobile Image: Show top half */}
                        <div className="block h-[300px] w-full overflow-hidden bg-primary/40 md:hidden">
                            <motion.img
                                src="/images/sample-app.png"
                                alt="sample app"
                                className="w-full object-cover object-top"
                                initial={{ opacity: 0, x: -100 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.8 }}
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Why Choose Us Section */}
            <section className="bg-card py-24">
                <div className="mx-auto max-w-screen-xl px-4 text-center">
                    <h2 className="mb-12 text-4xl font-bold">
                        Why Choose FootyPredict?
                    </h2>

                    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                        {features.map((feature, index) => (
                            <div
                                key={index}
                                className="flex flex-col items-center rounded-lg bg-primary/30 p-6 text-primary-foreground shadow-lg"
                            >
                                <motion.div
                                    className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-secondary to-accent"
                                    initial={{ opacity: 0, y: -50 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5 }}
                                >
                                    <feature.icon className="text-2xl text-white" />
                                </motion.div>
                                <h3 className="mb-4 text-xl font-semibold">
                                    {feature.title}
                                </h3>
                                <p className="text-lg text-gray-200">
                                    {feature.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Call to Action Section */}
            <section className="px-4 py-36 text-center text-white">
                <ClickToAction />
            </section>
        </>
    );
}

Welcome.layout = (page: ReactNode) => <StaticLayout>{page}</StaticLayout>;

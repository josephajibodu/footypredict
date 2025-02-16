import ClickToAction from '@/Components/ClickToAction';
import StaticLayout from '@/Layouts/StaticLayout';
import { Head } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { CheckCircle, Coins, Trophy, Volleyball, Wallet } from 'lucide-react';
import { ReactNode } from 'react';

const steps = [
    {
        icon: Volleyball,
        title: 'Step 1: Select Matches',
        description:
            'Choose two or more football matches you want to predict. You can pick from a variety of leagues and fixtures available on our platform.',
    },
    {
        icon: CheckCircle,
        title: 'Step 2: Predict Outcomes',
        description:
            'For each match, predict the outcome: Home Win, Draw, or Away Win. Use your football knowledge or strategy to make the best predictions.',
    },
    {
        icon: Coins,
        title: 'Step 3: Enter Stake Amount',
        description:
            'Decide how much you want to stake. The minimum stake is N100. Enter your desired amount and ensure your wallet is funded.',
    },
    {
        icon: Wallet,
        title: 'Step 4: Place Your Bet',
        description:
            "Click on the 'Stake' button to place your bet. Once your bet is placed, you’ll receive a booking code that you can share.",
    },
    {
        icon: Trophy,
        title: 'Step 5: Check Results',
        description:
            'After the matches are completed, check your bet history to see if you won. The system automatically validates the outcomes.',
    },
];

export default function HowToPlayPage() {
    return (
        <>
            <Head title="FootyPredict - How to Play" />

            <section>
                <div className="mx-auto max-w-screen-xl px-4 pb-12 pt-12 text-center md:pt-24">
                    <h1 className="mb-8 text-3xl font-bold leading-relaxed md:text-5xl">
                        How to Play
                    </h1>
                    <p className="mb-12 text-lg text-gray-300">
                        Follow these simple steps to start predicting, staking,
                        and winning on FootyPredict. It's easy, fair, and fun!
                    </p>
                </div>

                <div className="mx-auto grid max-w-screen-xl grid-cols-1 gap-8 px-4 md:grid-cols-2 lg:grid-cols-3">
                    {steps.map((step, index) => (
                        <motion.div
                            key={index}
                            className="flex flex-col items-center rounded-lg bg-primary/40 p-6 shadow-lg"
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.2 }}
                        >
                            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-secondary to-accent">
                                <step.icon className="h-8 w-8 text-white" />
                            </div>
                            <h3 className="mb-4 text-xl font-semibold">
                                {step.title}
                            </h3>
                            <p className="text-center text-lg text-gray-300">
                                {step.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Call to Action Section */}
            <section className="px-4 py-36 text-center text-white">
                <ClickToAction />
            </section>
        </>
    );
}

HowToPlayPage.layout = (page: ReactNode) => <StaticLayout>{page}</StaticLayout>;

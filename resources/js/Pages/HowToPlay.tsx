import { Head } from '@inertiajs/react';
import { ReactNode } from 'react';
import StaticLayout from "@/Layouts/StaticLayout";
import { motion } from "framer-motion";
import ClickToAction from "@/Components/ClickToAction";
import { Volleyball, CheckCircle, Coins, Wallet, Trophy } from "lucide-react";

const steps = [
    {
        icon: Volleyball,
        title: "Step 1: Select Matches",
        description:
            "Choose two or more football matches you want to predict. You can pick from a variety of leagues and fixtures available on our platform."
    },
    {
        icon: CheckCircle,
        title: "Step 2: Predict Outcomes",
        description:
            "For each match, predict the outcome: Home Win, Draw, or Away Win. Use your football knowledge or strategy to make the best predictions."
    },
    {
        icon: Coins,
        title: "Step 3: Enter Stake Amount",
        description:
            "Decide how much you want to stake. The minimum stake is N100. Enter your desired amount and ensure your wallet is funded."
    },
    {
        icon: Wallet,
        title: "Step 4: Place Your Bet",
        description:
            "Click on the 'Stake' button to place your bet. Once your bet is placed, you’ll receive a booking code that you can share."
    },
    {
        icon: Trophy,
        title: "Step 5: Check Results",
        description:
            "After the matches are completed, check your bet history to see if you won. The system automatically validates the outcomes."
    }
];

export default function HowToPlayPage() {
    return (
        <>
            <Head title="FootyPredict - How to Play" />

            <section>
                <div className="max-w-screen-xl mx-auto pt-12 md:pt-24 pb-12 px-4 text-center">
                    <h1 className="text-3xl md:text-5xl leading-relaxed font-bold mb-8">
                        How to Play
                    </h1>
                    <p className="text-lg text-gray-300 mb-12">
                        Follow these simple steps to start predicting, staking, and winning on FootyPredict. It's easy, fair, and fun!
                    </p>
                </div>

                <div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
                    {steps.map((step, index) => (
                        <motion.div
                            key={index}
                            className="flex flex-col items-center bg-primary/40 p-6 rounded-lg shadow-lg"
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.2 }}
                        >
                            <div className="w-16 h-16 mb-6 flex items-center justify-center bg-gradient-to-r from-secondary to-accent rounded-full">
                                <step.icon className="text-white w-8 h-8" />
                            </div>
                            <h3 className="text-xl font-semibold mb-4">{step.title}</h3>
                            <p className="text-lg text-gray-300 text-center">{step.description}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Call to Action Section */}
            <section className="py-36 text-white text-center px-4">
                <ClickToAction />
            </section>
        </>
    );
}

HowToPlayPage.layout = (page: ReactNode) => <StaticLayout>{page}</StaticLayout>;
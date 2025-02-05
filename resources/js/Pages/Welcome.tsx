import {Head, Link} from '@inertiajs/react';
import { ReactNode } from 'react';
import StaticLayout from "@/Layouts/StaticLayout";
import { Button } from "@/Components/ui/button";
import { motion } from 'framer-motion';
import { CheckCircle, Rocket, Users, Shield, Settings, Gift } from 'lucide-react';
import ClickToAction from "@/Components/ClickToAction";

const features = [
    {
        icon: CheckCircle,
        title: "Transparent & Fair",
        description: "Enjoy a fair and transparent platform where all outcomes are verified and trust is built into every game. Predict, stake, and win with confidence!"
    },
    {
        icon: Rocket,
        title: "Instant Payouts",
        description: "Win big and receive your payouts instantly! No delays or hidden charges, just fast, reliable transactions."
    },
    {
        icon: Users,
        title: "Community Driven",
        description: "Join a community of like-minded football fans who share their predictions, insights, and strategies to maximize winnings."
    },
    {
        icon: Shield,
        title: "Secure & Safe",
        description: "Your funds and personal data are fully protected with top-tier security, so you can focus on your predictions without worry."
    },
    {
        icon: Settings,
        title: "Easy to Use",
        description: "Our platform is designed to be simple and intuitive, making it easy for you to stake your predictions and follow your winnings."
    },
    {
        icon: Gift,
        title: "Exciting Rewards",
        description: "Unlock exciting rewards, bonuses, and special prizes as you make accurate predictions and become a top player in the community."
    }
];

export default function Welcome() {
    return (
        <>
            <Head title="Predict. Stake. Win Big" />

            <section>
                <div className="max-w-screen-xl mx-auto flex items-center flex-col md:flex-row pt-12 pb-0 md:pb-12">
                    <div className="w-full md:w-7/12 py-12 md:py-24 px-4 md:px-0 text-center md:text-start">
                        <h1 className="text-3xl md:text-5xl leading-relaxed font-bold mb-8">
                            The Ultimate Football <br /> Prediction Platform
                        </h1>
                        <p className="leading-relaxed text-lg mb-12">
                            Step into the world of football prediction like never before with FootyPredict—a revolutionary
                            service designed for football lovers to predict, stake, and win big in a fair and transparent way.
                            Join thousands of fans who are turning their football knowledge into real winnings.
                        </p>

                        <Button
                            asChild
                            variant="secondary"
                            className="bg-gradient-to-r from-secondary to-accent text-base h-12"
                        >
                            <Link href={route('events')}>Get Started</Link>
                        </Button>
                    </div>

                    <div className="md:w-5/12 flex justify-center">
                        <div className="hidden md:block h-[600px]">
                            <motion.img
                                src="/images/sample-app.png"
                                alt="sample app"
                                className="md:h-full rotate-[8deg]"
                                initial={{ opacity: 0, x: -100 }}
                                animate={{ opacity: 1, x: 0, rotate: 8 }}
                                transition={{ duration: 0.8 }}
                            />
                        </div>

                        {/* Mobile Image: Show top half */}
                        <div className="block md:hidden bg-primary/40 w-full h-[300px] overflow-hidden">
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
                <div className="max-w-screen-xl mx-auto px-4 text-center">
                    <h2 className="text-4xl font-bold mb-12">
                        Why Choose FootyPredict?
                    </h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {features.map((feature, index) => (
                            <div key={index} className="flex flex-col items-center bg-primary/30 text-primary-foreground p-6 rounded-lg shadow-lg">
                                <motion.div
                                    className="w-16 h-16 mb-6 rounded-full bg-gradient-to-r from-secondary to-accent flex items-center justify-center"
                                    initial={{ opacity: 0, y: -50 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5 }}
                                >
                                    <feature.icon className="text-white text-2xl" />
                                </motion.div>
                                <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
                                <p className="text-lg text-gray-200">{feature.description}</p>
                            </div>
                        ))}
                    </div>

                </div>
            </section>

            {/* Call to Action Section */}
            <section className="py-36 text-white text-center px-4">
                <ClickToAction />
            </section>
        </>
    );
}

Welcome.layout = (page: ReactNode) => <StaticLayout>{page}</StaticLayout>;
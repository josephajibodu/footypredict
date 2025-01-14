import { Head } from '@inertiajs/react';
import { ReactNode } from 'react';
import StaticLayout from "@/Layouts/StaticLayout";
import { Button } from "@/Components/ui/button";
import { motion } from 'framer-motion';
import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from "@/Components/ui/accordion";
import {AccordionHeader} from "@radix-ui/react-accordion";

const faqs = [
    {
        question: "What is Footy Predict?",
        answer: "Footy Predict is a Jackpot-style predict-to-win service for football matches. We use social wagering to share games among users. We are also out to solve the perennial issue of bookies locking and unlocking games unfairly by ensuring that all games are booked before they start and only truthful outcomes are rewarded."
    },
    {
        question: "How do I fund Footy Predict?",
        answer: "You can fund your wallet with your local currency (Only Naira available for now, other currencies coming soon), or with the stablecoin USDT through the crypto wallet address we provided when you signed up. You can deposit crypto from any exchange (e.g. Binance, Kucoin, etc) or a wallet (Metamask, Phantom, etc)."
    },
    {
        question: "What is the minimum deposit?",
        answer: "The minimum deposit is N100 and the minimum stake is N100."
    },
    {
        question: "How do I play?",
        answer: "You select two or more football matches and predict their outcomes, including Home Win, Draw, or " +
            "Away Win for each respective match. You enter the stake amount and click Stake."
    },
    {
        question: "How do I know if I win?",
        answer: "You check your bet history, the system automatically validates the games and their outcomes, each " +
            "outcomes are decided based only on 90mins full time played. This excludes extratime and penalties."
    },
    {
        question: "Can I share my booking codes?",
        answer: "Yes."
    },
    {
        question: "How do I withdraw my wins?",
        answer: "You fill in your account, ensure it is the same with the name you registered."
    }
];

export default function FaqPage() {
    return (
        <>
            <Head title="FootyPredict - Frequently Asked Questions" />

            <section>
                <div className="max-w-screen-xl mx-auto pt-24 pb-12 md:pb-24 px-4 text-center flex flex-col items-center">
                    <h1 className="text-3xl md:text-5xl leading-relaxed font-bold mb-8">
                        Frequently Asked Questions
                    </h1>
                    <p className="text-lg max-w-4xl text-gray-300 mb-12">
                        Have questions? We’ve got answers! Below are some of the frequently asked questions about
                        FootyPredict. If you still need help, feel free to reach out to our support team.
                    </p>
                </div>

                <div className="max-w-screen-xl mx-auto mb-16 px-4">
                    <Accordion type="single" collapsible className="space-y-4">
                        {faqs.map((faq, index) => (
                            <AccordionItem key={index} value={`item-${index}`} className="bg-card p-6 rounded-lg shadow-lg">
                                <AccordionHeader>
                                    <motion.div
                                        className="text-xl font-semibold text-left"
                                        initial={{ opacity: 0, y: -50 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.5 }}
                                    >
                                        <AccordionTrigger>{faq.question}</AccordionTrigger>
                                    </motion.div>
                                </AccordionHeader>

                                <AccordionContent>
                                    <motion.p
                                        className="text-lg text-card-foreground mt-4"
                                        initial={{ opacity: 0, y: -50 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.5 }}
                                    >
                                        {faq.answer}
                                    </motion.p>
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </div>
            </section>

            <section>
                <div className="max-w-screen-xl mx-auto text-center py-12">
                    <Button
                        variant="secondary"
                        size="lg"
                        className="bg-gradient-to-r from-secondary to-accent text-base h-12"
                    >
                        Contact Support
                    </Button>
                </div>
            </section>
        </>
    );
}

FaqPage.layout = (page: ReactNode) => <StaticLayout>{page}</StaticLayout>;
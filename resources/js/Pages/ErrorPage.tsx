import { Head } from '@inertiajs/react';
import { ReactNode } from 'react';
import StaticLayout from "@/Layouts/StaticLayout";
import { Button } from "@/Components/ui/button";
import { motion } from 'framer-motion';

export default function ErrorPage({ status }: { status: string}) {
    const title = {
        503: "Service Unavailable",
        500: "Internal Server Error",
        404: "Page Not Found",
        403: "Access Denied",
    }[status] || "Something Went Wrong";

    const description = {
        503: "We're currently undergoing maintenance. Hang tight, we'll be back shortly.",
        500: "Oops! Something broke on our end. Our team is already working to fix it.",
        404: "The page you're looking for doesn't exist. Maybe try going back home?",
        403: "It seems you're not authorized to access this page. If this is a mistake, contact support.",
    }[status] || "An unexpected error occurred. Please try refreshing the page or come back later.";

    const image = {
        503: "/images/503.png",
        500: "/images/500.png",
        404: "/images/404.png",
        403: "/images/403.png",
    }[status] || "/images/error.png";

    return (
        <>
            <Head title={`${status || "Error"} - ${title}`} />

            <section className="min-h-screen bg-primary text-primary-foreground flex flex-col items-center justify-center px-4 text-center">
                <motion.div
                    className="max-w-3xl p-6 bg-card/80 rounded-lg shadow-lg"
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <motion.img
                        src={image}
                        alt={title}
                        className="w-48 mx-auto mb-8"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6 }}
                    />
                    <h1 className="text-3xl md:text-5xl font-bold mb-6">{title}</h1>
                    <p className="text-lg mb-8 leading-relaxed">{description}</p>
                    <Button
                        variant="secondary"
                        size="lg"
                        className="bg-gradient-to-r from-secondary to-accent text-base h-12"
                        onClick={() => window.location.href = '/'}
                    >
                        Go Back Home
                    </Button>
                </motion.div>
            </section>
        </>
    );
}

ErrorPage.layout = (page: ReactNode) => <StaticLayout hideFooter hideHeader>{page}</StaticLayout>;
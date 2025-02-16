import { Button } from '@/Components/ui/button';
import StaticLayout from '@/Layouts/StaticLayout';
import { Head } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { ReactNode } from 'react';

export default function ErrorPage({ status }: { status: string }) {
    const title =
        {
            503: 'Service Unavailable',
            500: 'Internal Server Error',
            404: 'Page Not Found',
            403: 'Access Denied',
        }[status] || 'Something Went Wrong';

    const description =
        {
            503: "We're currently undergoing maintenance. Hang tight, we'll be back shortly.",
            500: 'Oops! Something broke on our end. Our team is already working to fix it.',
            404: "The page you're looking for doesn't exist. Maybe try going back home?",
            403: "It seems you're not authorized to access this page. If this is a mistake, contact support.",
        }[status] ||
        'An unexpected error occurred. Please try refreshing the page or come back later.';

    const image =
        {
            503: '/images/503.png',
            500: '/images/500.png',
            404: '/images/404.png',
            403: '/images/403.png',
        }[status] || '/images/error.png';

    return (
        <>
            <Head title={`${status || 'Error'} - ${title}`} />

            <section className="flex min-h-screen flex-col items-center justify-center bg-primary px-4 text-center text-primary-foreground">
                <motion.div
                    className="max-w-3xl rounded-lg bg-card/80 p-6 shadow-lg"
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <motion.img
                        src={image}
                        alt={title}
                        className="mx-auto mb-8 w-48"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6 }}
                    />
                    <h1 className="mb-6 text-3xl font-bold md:text-5xl">
                        {title}
                    </h1>
                    <p className="mb-8 text-lg leading-relaxed">
                        {description}
                    </p>
                    <Button
                        variant="secondary"
                        size="lg"
                        className="h-12 bg-gradient-to-r from-secondary to-accent text-base"
                        onClick={() => (window.location.href = '/')}
                    >
                        Go Back Home
                    </Button>
                </motion.div>
            </section>
        </>
    );
}

ErrorPage.layout = (page: ReactNode) => (
    <StaticLayout hideFooter hideHeader>
        {page}
    </StaticLayout>
);

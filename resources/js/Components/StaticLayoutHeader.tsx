import ApplicationLogo from '@/Components/ApplicationLogo';
import { Button } from '@/Components/ui/button';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { Link, usePage } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function StaticLayoutHeader() {
    const { auth } = usePage().props;
    const [menuOpen, setMenuOpen] = useState(false);
    const isSmallScreen = useMediaQuery('(max-width: 600px)');

    useEffect(() => {
        if (menuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }

        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [menuOpen]);

    // Close the menu when the screen size becomes large
    useEffect(() => {
        if (!isSmallScreen) {
            setMenuOpen(false);
        }
    }, [isSmallScreen]);

    const navLinks = [
        { name: 'Home', href: '/' },
        { name: 'How to Play', href: route('how-to-play') },
        { name: 'FAQs', href: route('faq') },
    ];

    const menuVariants = {
        hidden: {
            opacity: 0,
            y: -20,
        },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.4,
            },
        },
        exit: {
            opacity: 0,
            y: -20,
            transition: {
                duration: 0.3,
            },
        },
    };

    return (
        <header className="flex bg-primary/50 px-4 py-6 lg:px-12">
            <nav className="mx-auto flex max-w-screen-xl flex-1 items-center justify-between">
                {/* Logo */}
                <div>
                    <Link href={route('landing')}>
                        <ApplicationLogo className="w-fit" />
                    </Link>
                </div>

                {/* Desktop Menu */}
                <ul className="hidden flex-1 justify-center gap-8 md:flex">
                    {navLinks.map((link) => (
                        <li key={link.name}>
                            <Link
                                className="hover:text-secondary"
                                href={link.href}
                            >
                                {link.name}
                            </Link>
                        </li>
                    ))}
                </ul>

                <div className="flex gap-4">
                    {!auth.user && (
                        <>
                            <Button
                                className="hidden bg-gradient-to-r from-secondary to-accent text-base md:flex"
                                asChild
                            >
                                <Link href={route('login')}>Sign In</Link>
                            </Button>

                            <Button
                                className="hidden bg-gradient-to-r from-secondary to-accent text-base md:flex"
                                asChild
                            >
                                <Link href={route('register')}>Register</Link>
                            </Button>
                        </>
                    )}

                    {auth.user && (
                        <>
                            <Button
                                className="hidden bg-gradient-to-r from-secondary to-accent text-base md:flex"
                                asChild
                            >
                                <Link
                                    href={
                                        auth
                                            ? route('settings')
                                            : route('login')
                                    }
                                >
                                    View Events
                                </Link>
                            </Button>
                        </>
                    )}
                </div>

                {/* Mobile Menu */}
                {menuOpen && (
                    <motion.div
                        className="fixed inset-0 top-[80px] z-50 flex flex-col items-center justify-center bg-card"
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        variants={menuVariants}
                    >
                        <ul className="space-y-6 text-center">
                            {navLinks.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        className="text-lg text-white hover:text-secondary"
                                        href={link.href}
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                        <Button
                            size="lg"
                            className="mt-6 bg-gradient-to-r from-secondary to-accent text-base"
                            asChild
                        >
                            <Link href={route('login')}>Sign In</Link>
                        </Button>
                    </motion.div>
                )}

                {/* Hamburger Menu */}
                <div
                    className="relative flex h-8 w-8 cursor-pointer flex-col items-center justify-center md:hidden"
                    onClick={() => setMenuOpen(!menuOpen)}
                >
                    <div
                        className={`absolute h-[3px] w-full origin-center bg-gradient-to-r from-secondary to-accent transition-transform duration-300 ${
                            menuOpen ? 'rotate-45' : 'translate-y-[-6px]'
                        }`}
                    ></div>
                    <div
                        className={`absolute h-[3px] w-full origin-center bg-gradient-to-r from-secondary to-accent transition-transform duration-300 ${
                            menuOpen ? '-rotate-45' : 'translate-y-[6px]'
                        }`}
                    ></div>
                </div>
            </nav>
        </header>
    );
}

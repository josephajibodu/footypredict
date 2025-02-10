import {Link, usePage} from "@inertiajs/react";
import { Button } from "@/Components/ui/button";
import { useState, useEffect } from "react";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { motion } from "framer-motion";
import ApplicationLogo from "@/Components/ApplicationLogo";

export default function StaticLayoutHeader() {
    const { auth } = usePage().props;
    const [menuOpen, setMenuOpen] = useState(false);
    const isSmallScreen = useMediaQuery('(max-width: 600px)');

    useEffect(() => {
        if (menuOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }

        return () => {
            document.body.style.overflow = "auto";
        };
    }, [menuOpen]);

    // Close the menu when the screen size becomes large
    useEffect(() => {
        if (!isSmallScreen) {
            setMenuOpen(false);
        }
    }, [isSmallScreen]);

    const navLinks = [
        { name: "Home", href: "/" },
        { name: "How to Play", href: route('how-to-play') },
        { name: "FAQs", href: route('faq') },
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
        <header className="py-6 bg-primary/50 flex px-4 lg:px-12">
            <nav className="flex flex-1 justify-between items-center max-w-screen-xl mx-auto">
                {/* Logo */}
                <div>
                    <Link href={route('landing')}>
                        <ApplicationLogo className="w-fit" />
                    </Link>
                </div>

                {/* Desktop Menu */}
                <ul className="hidden md:flex flex-1 justify-center gap-8">
                    {navLinks.map((link) => (
                        <li key={link.name}>
                            <Link className="hover:text-secondary" href={link.href}>
                                {link.name}
                            </Link>
                        </li>
                    ))}
                </ul>

                <div className="flex gap-4">
                    {!auth.user && (
                        <>
                            <Button
                                className="hidden md:flex bg-gradient-to-r from-secondary to-accent text-base"
                                asChild
                            >
                                <Link href={route('login')}>Sign In</Link>
                            </Button>

                            <Button
                                className="hidden md:flex bg-gradient-to-r from-secondary to-accent text-base"
                                asChild
                            >
                                <Link href={route('register')}>Register</Link>
                            </Button>
                        </>
                    )}

                    {auth.user && (
                        <>
                            <Button
                                className="hidden md:flex bg-gradient-to-r from-secondary to-accent text-base"
                                asChild
                            >
                                <Link href={auth ? route('settings') : route('login')}>View Events</Link>
                            </Button>

                        </>
                    )}
                </div>

                {/* Mobile Menu */}
                {menuOpen && (
                    <motion.div
                        className="fixed inset-0 top-[80px] bg-card z-50 flex flex-col items-center justify-center"
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        variants={menuVariants}
                    >
                        <ul className="space-y-6 text-center">
                            {navLinks.map((link) => (
                                <li key={link.name}>
                                    <Link className="hover:text-secondary text-white text-lg" href={link.href}>
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                        <Button
                            size="lg"
                            className="bg-gradient-to-r from-secondary to-accent text-base mt-6"
                            asChild
                        >
                            <Link href={route('login')}>Sign In</Link>
                        </Button>
                    </motion.div>
                )}

                {/* Hamburger Menu */}
                <div
                    className="md:hidden flex flex-col justify-center items-center h-8 w-8 cursor-pointer relative"
                    onClick={() => setMenuOpen(!menuOpen)}
                >
                    <div
                        className={`h-[3px] w-full bg-gradient-to-r from-secondary to-accent absolute transition-transform origin-center duration-300 ${
                            menuOpen ? "rotate-45" : "translate-y-[-6px]"
                        }`}
                    ></div>
                    <div
                        className={`h-[3px] w-full bg-gradient-to-r from-secondary to-accent absolute transition-transform origin-center duration-300 ${
                            menuOpen ? "-rotate-45" : "translate-y-[6px]"
                        }`}
                    ></div>
                </div>
            </nav>
        </header>
    );
}
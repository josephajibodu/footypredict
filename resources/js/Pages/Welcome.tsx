import { PageProps } from '@/types';
import { Head, Link } from '@inertiajs/react';
import {Button} from "@/Components/ui/button";

export default function Welcome() {

    return (
        <>
            <Head title="Welcome" />
            <div className="bg-purple-800 text-white dark:bg-black dark:text-white/50 h-screen flex items-center justify-center">
                <h1 className="text-4xl">Coming Soon</h1>
            </div>
        </>
    );
}

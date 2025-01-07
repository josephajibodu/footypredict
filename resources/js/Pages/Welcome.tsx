import { Head } from '@inertiajs/react';
import { ReactNode } from 'react';
import StaticLayout from "@/Layouts/StaticLayout";

export default function Welcome() {
    return (
        <>
            <Head title="Welcome" />
        </>
    );
}

Welcome.layout = (page: ReactNode) => <StaticLayout>{page}</StaticLayout>;

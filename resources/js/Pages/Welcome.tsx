import Authenticated from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { ReactNode } from 'react';

export default function Welcome() {
    return (
        <>
            <Head title="Welcome" />
        </>
    );
}

Welcome.layout = (page: ReactNode) => <Authenticated>{page}</Authenticated>;

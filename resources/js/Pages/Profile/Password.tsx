import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { PageProps } from '@/types';
import { Head } from '@inertiajs/react';
import { ReactNode } from 'react';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';

export default function Password({
    mustVerifyEmail,
    status,
}: PageProps<{ mustVerifyEmail: boolean; status?: string }>) {
    return (
        <>
            <Head title="Update Password" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl space-y-6 px-4">
                    <div className="bg-card p-4 text-card-foreground sm:rounded-lg sm:p-8">
                        <UpdatePasswordForm className="max-w-xl" />
                    </div>
                </div>
            </div>
        </>
    );
}

Password.layout = (page: ReactNode) => (
    <AuthenticatedLayout
        backUrl={route('settings')}
        showHeader={false}
        title="Update Password"
    >
        {page}
    </AuthenticatedLayout>
);

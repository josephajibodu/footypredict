import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { PageProps } from '@/types';
import { Head } from '@inertiajs/react';
import { ReactNode } from 'react';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';

export default function Edit({
    mustVerifyEmail,
    status,
}: PageProps<{ mustVerifyEmail: boolean; status?: string }>) {
    return (
        <>
            <Head title="Profile" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8">
                    <div className="bg-card p-4 text-card-foreground sm:rounded-lg sm:p-8">
                        <UpdateProfileInformationForm
                            mustVerifyEmail={mustVerifyEmail}
                            status={status}
                            className="max-w-xl"
                        />
                    </div>

                    {/*<div className="p-4 bg-card text-card-foreground sm:rounded-lg sm:p-8">*/}
                    {/*    <DeleteUserForm className="max-w-xl" />*/}
                    {/*</div>*/}
                </div>
            </div>
        </>
    );
}

Edit.layout = (page: ReactNode) => (
    <AuthenticatedLayout
        backUrl={route('settings')}
        showHeader={false}
        title="Profile Information"
    >
        {page}
    </AuthenticatedLayout>
);

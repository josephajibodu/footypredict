import InputError from '@/Components/InputError';
import GuestLayout from '@/Layouts/GuestLayout';
import {Head, Link, useForm} from '@inertiajs/react';
import {FormEventHandler, ReactNode} from 'react';
import {Input} from "@/Components/ui/input";
import {Button} from "@/Components/ui/button";

export default function ForgotPassword({ status }: { status?: string }) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('password.email'));
    };

    return (
        <>
            <Head title="Forgot Password" />


            <div className="flex flex-col h-full px-8 pt-6 pb-6">

                <div className="flex-1 flex flex-col items-center">

                    <div className="mb-4 text-sm text-gray-300">
                        Forgot your password? No problem. Just let us know your email
                        address and we will email you a password reset link that will
                        allow you to choose a new one.
                    </div>

                    {status && (
                        <div className="mb-4 text-sm font-medium text-green-600 dark:text-green-400">
                            {status}
                        </div>
                    )}

                    <form onSubmit={submit} className="w-full">
                        <Input
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            className="mt-1 block w-full"
                            autoFocus={true}
                            onChange={(e) => setData('email', e.target.value)}
                            placeholder="Email Address"
                        />

                        <InputError message={errors.email} className="mt-2" />

                        <Button className="mt-4 w-full" disabled={processing}>
                            Email Password Reset Link
                        </Button>
                    </form>
                </div>

                <div className="py-4 text-center">
                    <Button asChild className="w-full" variant='outline'>
                        <Link href={route('login')}>Login</Link>
                    </Button>
                </div>
            </div>

        </>
    );
}

ForgotPassword.layout = (page: ReactNode) => <GuestLayout>{page}</GuestLayout>
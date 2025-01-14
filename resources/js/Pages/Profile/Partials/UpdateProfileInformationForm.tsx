import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import { Transition } from '@headlessui/react';
import { Link, useForm, usePage } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import { Input } from '@/Components/ui/input';
import { Button } from '@/Components/ui/button';
import {PageProps} from "@/types";

interface User {
    first_name: string;
    last_name: string;
    username: string;
    mobile_number: string;
    nationality: string;
    email: string;
    email_verified_at: string | null;
}

export default function UpdateProfileInformation({
     mustVerifyEmail,
     status,
     className = '',
 }: {
    mustVerifyEmail: boolean;
    status?: string;
    className?: string;
}) {
    const { user } = usePage<PageProps>().props.auth;

    const { data, setData, patch, errors, processing, recentlySuccessful } =
        useForm<Partial<User>>({
            first_name: user.first_name,
            last_name: user.last_name,
            username: user.username,
            email: user.email,
        });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        patch(route('profile.update'));
    };

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-card-foreground">
                    Profile Information
                </h2>
                <p className="mt-1 text-sm text-gray-300">
                    Your profile details cannot be changed
                </p>
            </header>

            <form onSubmit={submit} className="mt-6 space-y-6">
                <div>
                    <InputLabel htmlFor="first_name" value="First Name" />
                    <Input
                        id="username"
                        className="mt-1 block w-full"
                        value={data.username || ''}
                        onChange={(e) => setData('username', e.target.value)}
                        required
                        disabled
                        autoComplete="username"
                    />
                    <InputError className="mt-2" message={errors.first_name} />
                </div>

                <div>
                    <InputLabel htmlFor="first_name" value="First Name" />
                    <Input
                        id="first_name"
                        className="mt-1 block w-full"
                        value={data.first_name || ''}
                        onChange={(e) => setData('first_name', e.target.value)}
                        required
                        disabled
                        autoComplete="given-name"
                    />
                    <InputError className="mt-2" message={errors.first_name} />
                </div>

                <div>
                    <InputLabel htmlFor="last_name" value="Last Name" />
                    <Input
                        id="last_name"
                        className="mt-1 block w-full"
                        value={data.last_name || ''}
                        onChange={(e) => setData('last_name', e.target.value)}
                        required
                        disabled
                        autoComplete="family-name"
                    />
                    <InputError className="mt-2" message={errors.last_name} />
                </div>

                <div>
                    <InputLabel htmlFor="email" value="Email" />
                    <Input
                        id="email"
                        type="email"
                        className="mt-1 block w-full"
                        value={data.email || ''}
                        onChange={(e) => setData('email', e.target.value)}
                        required
                        disabled
                        autoComplete="email"
                    />
                    <InputError className="mt-2" message={errors.email} />
                </div>

                {mustVerifyEmail && user.email_verified_at === null && (
                    <div>
                        <p className="mt-2 text-sm text-gray-200">
                            Your email address is unverified.
                            <Link
                                href={route('verification.send')}
                                method="post"
                                as="button"
                                className="rounded-md text-sm text-gray-300 underline hover:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:text-gray-400 dark:hover:text-gray-100 dark:focus:ring-offset-gray-800"
                            >
                                Click here to re-send the verification email.
                            </Link>
                        </p>

                        {status === 'verification-link-sent' && (
                            <div className="mt-2 text-sm font-medium text-green-600 dark:text-green-400">
                                A new verification link has been sent to your email address.
                            </div>
                        )}
                    </div>
                )}

                <div className="flex items-center gap-4">
                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <p className="text-sm text-gray-300">Saved.</p>
                    </Transition>
                </div>
            </form>
        </section>
    );
}
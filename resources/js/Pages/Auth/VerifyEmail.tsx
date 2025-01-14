import PrimaryButton from '@/Components/PrimaryButton';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import React, { FormEventHandler } from 'react';
import Register from "@/Pages/Auth/Register";
import {Button} from "@/Components/ui/button";
import {InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot} from "@/Components/ui/input-otp";

export default function VerifyEmail({ status }: { status?: string }) {
    const { post, processing } = useForm({});

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('verification.send'));
    };

    const resendVerification: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('verification.send'));
    };

    return (
        <>
            <Head title="Email Verification" />

            <div className="pb-8 pt-8 px-4 flex flex-col h-full">
                <div className="flex-1 text-center">
                    <h3 className="text-lg mb-4">Verification Code</h3>
                    <div className="mb-4 text-sm text-gray-200">
                        Thanks for signing up! Before getting started, could you verify
                        your email address by providing the One Time Password sent to your email
                        address? If you didn't receive the email, we will gladly send you
                        another.
                    </div>

                    {status === 'verification-link-sent' && (
                        <div className="mb-4 text-sm font-medium text-green-600 dark:text-green-400">
                            A new verification link has been sent to the email address
                            you provided during registration.
                        </div>
                    )}

                    <form className="flex flex-col items-center">
                        <InputOTP maxLength={6}>
                            <InputOTPGroup>
                                <InputOTPSlot index={0} />
                                <InputOTPSlot index={1} />
                                <InputOTPSlot index={2} />
                                <InputOTPSlot index={3} />
                                <InputOTPSlot index={4} />
                                <InputOTPSlot index={5} />
                            </InputOTPGroup>
                        </InputOTP>

                        <Button disabled={processing} className="mt-8">
                            Verify OTP
                        </Button>
                    </form>

                </div>

                <form onSubmit={submit}>
                    <div className="mt-4 flex items-center justify-between">
                        <Button disabled={processing}>
                            Resend Verification Email
                        </Button>

                        <Link
                            href={route('logout')}
                            method="post"
                            as="button"
                            className="rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:text-gray-400 dark:hover:text-gray-100 dark:focus:ring-offset-gray-800"
                        >
                            Log Out
                        </Link>
                    </div>
                </form>
            </div>
        </>
    );
}

VerifyEmail.layout = (page: React.ReactNode) => <GuestLayout>{page}</GuestLayout>;
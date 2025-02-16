import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import Stepper from '@/Components/Stepper';
import { Button } from '@/Components/ui/button';
import { Checkbox } from '@/Components/ui/checkbox';
import { Input } from '@/Components/ui/input';
import GuestLayout from '@/Layouts/GuestLayout';
import { cn, extractErrorMessage } from '@/lib/utils';
import { Head, Link, useForm } from '@inertiajs/react';
import React, { useState } from 'react';
import { toast } from 'sonner';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        first_name: '',
        last_name: '',
        username: '',
        mobile_number: '',
        nationality: 'Nigeria',
        date_of_birth: '',
        email: '',
        password: '',
        password_confirmation: '',
        terms: false,
        account_email: false,
    });

    const [step, setStep] = useState(1);

    const handleNext = () => setStep((prev) => prev + 1);
    const handleBack = () => setStep((prev) => prev - 1);

    const submit = (e: React.FormEvent) => {
        e.preventDefault();

        post(route('register.store'), {
            onSuccess: () => {
                reset('password', 'password_confirmation');

                toast.success('Account created successfully');
            },
            onError: (error) => {
                const errorMessage = extractErrorMessage(error);

                toast.error(errorMessage ?? 'Registration failed');
            },
        });
    };

    const steps = [
        { label: 'Basic Information' },
        { label: 'Contact Details' },
        { label: 'Account Security' },
    ];

    const isLastStep = step === steps.length;

    return (
        <>
            <Head title="Register" />
            <div className="flex h-full flex-col px-8 pb-6 pt-6">
                <h4 className="text-lg font-medium">{steps[step - 1].label}</h4>
                {/* Step Progress Bar */}
                <Stepper steps={steps} currentStep={step} />

                {/* Note */}
                <div className="mb-8 text-sm text-gray-300">
                    Please ensure all information provided is accurate, as it
                    cannot be modified later.
                </div>

                {/* Form */}
                <div className="flex flex-1 flex-col items-center">
                    <form
                        onSubmit={submit}
                        className="flex w-full flex-1 flex-col"
                    >
                        {step === 1 && (
                            <div className="flex-1">
                                <div>
                                    <Input
                                        id="first_name"
                                        name="first_name"
                                        value={data.first_name}
                                        onChange={(e) =>
                                            setData(
                                                'first_name',
                                                e.target.value,
                                            )
                                        }
                                        placeholder="First Name"
                                        className="mt-1 block w-full"
                                        required
                                    />
                                    <InputError
                                        message={errors.first_name}
                                        className="mt-2"
                                    />
                                </div>

                                <div className="mt-4">
                                    <Input
                                        id="last_name"
                                        name="last_name"
                                        value={data.last_name}
                                        onChange={(e) =>
                                            setData('last_name', e.target.value)
                                        }
                                        placeholder="Last Name"
                                        className="mt-1 block w-full"
                                        required
                                    />
                                    <InputError
                                        message={errors.last_name}
                                        className="mt-2"
                                    />
                                </div>

                                <div className="mt-4">
                                    <Input
                                        id="username"
                                        name="username"
                                        value={data.username}
                                        onChange={(e) =>
                                            setData('username', e.target.value)
                                        }
                                        placeholder="Username"
                                        className="mt-1 block w-full"
                                        required
                                    />
                                    <InputError
                                        message={errors.username}
                                        className="mt-2"
                                    />
                                </div>

                                <div className="mt-4">
                                    <Input
                                        id="email"
                                        type="email"
                                        name="email"
                                        value={data.email}
                                        onChange={(e) =>
                                            setData('email', e.target.value)
                                        }
                                        placeholder="Email"
                                        className="mt-1 block w-full"
                                        required
                                    />
                                    <InputError
                                        message={errors.email}
                                        className="mt-2"
                                    />
                                </div>
                            </div>
                        )}

                        {step === 2 && (
                            <div className="flex-1">
                                <div>
                                    <Input
                                        id="mobile_number"
                                        name="mobile_number"
                                        value={data.mobile_number}
                                        onChange={(e) =>
                                            setData(
                                                'mobile_number',
                                                e.target.value,
                                            )
                                        }
                                        placeholder="Mobile Number"
                                        autoComplete="mobile tel"
                                        className="mt-1 block w-full"
                                        required
                                    />
                                    <InputError
                                        message={errors.mobile_number}
                                        className="mt-2"
                                    />
                                </div>

                                <div className="mt-4">
                                    <Input
                                        id="nationality"
                                        name="nationality"
                                        value={data.nationality}
                                        onChange={(e) =>
                                            setData(
                                                'nationality',
                                                e.target.value,
                                            )
                                        }
                                        placeholder="Nationality"
                                        disabled
                                        autoComplete="country"
                                        className="mt-1 block w-full"
                                    />
                                    <InputError
                                        message={errors.nationality}
                                        className="mt-2"
                                    />
                                </div>

                                <div className="mt-4">
                                    <InputLabel
                                        htmlFor="date_of_birth"
                                        value="Date of Birth"
                                    />
                                    <Input
                                        id="date_of_birth"
                                        name="date_of_birth"
                                        type="date"
                                        value={data.date_of_birth}
                                        onChange={(e) =>
                                            setData(
                                                'date_of_birth',
                                                e.target.value,
                                            )
                                        }
                                        placeholder="Date of Birth"
                                        autoComplete="bday-day"
                                        className={cn(
                                            'mt-1 block w-full',
                                            '[&::-webkit-calendar-picker-indicator]:opacity-70 [&::-webkit-calendar-picker-indicator]:invert hover:[&::-webkit-calendar-picker-indicator]:opacity-100',
                                            '[&::-webkit-calendar-picker-indicator]:rounded [&::-webkit-calendar-picker-indicator]:p-1',
                                            '[&::-webkit-calendar-picker-indicator]:hover:cursor-pointer',
                                            '[color-scheme:light]',
                                        )}
                                        required
                                    />
                                    <InputError
                                        message={errors.date_of_birth}
                                        className="mt-2"
                                    />
                                </div>
                            </div>
                        )}

                        {step === 3 && (
                            <div className="flex-1">
                                <div>
                                    <Input
                                        id="password"
                                        type="password"
                                        name="password"
                                        value={data.password}
                                        onChange={(e) =>
                                            setData('password', e.target.value)
                                        }
                                        placeholder="Password"
                                        className="mt-1 block w-full"
                                        required
                                    />
                                    <InputError
                                        message={errors.password}
                                        className="mt-2"
                                    />
                                </div>

                                <div className="mt-4">
                                    <Input
                                        id="password_confirmation"
                                        type="password"
                                        name="password_confirmation"
                                        value={data.password_confirmation}
                                        onChange={(e) =>
                                            setData(
                                                'password_confirmation',
                                                e.target.value,
                                            )
                                        }
                                        placeholder="Confirm Password"
                                        className="mt-1 block w-full"
                                        required
                                    />
                                    <InputError
                                        message={errors.password_confirmation}
                                        className="mt-2"
                                    />
                                </div>

                                <div className="mt-4 flex items-center space-x-2">
                                    <Checkbox
                                        id="account_email"
                                        value={data.password_confirmation}
                                        defaultChecked={data.account_email}
                                        onCheckedChange={(state) =>
                                            setData(
                                                'account_email',
                                                state as boolean,
                                            )
                                        }
                                    />
                                    <label
                                        htmlFor="account_email"
                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                        I agree to receive account-related
                                        emails
                                    </label>
                                </div>

                                <div className="mt-4 flex items-center space-x-2">
                                    <Checkbox
                                        id="terms"
                                        required
                                        defaultChecked={data.terms}
                                        onCheckedChange={(state) =>
                                            setData('terms', state as boolean)
                                        }
                                    />
                                    <label
                                        htmlFor="terms"
                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                        I agree to the terms of service
                                    </label>
                                </div>
                            </div>
                        )}

                        {/* Navigation Buttons */}
                        <div className="mt-8 flex justify-between">
                            {step > 1 && (
                                <Button
                                    size="lg"
                                    onClick={handleBack}
                                    type="button"
                                    variant="outline"
                                >
                                    Back
                                </Button>
                            )}
                            {!isLastStep ? (
                                <Button
                                    size="lg"
                                    onClick={handleNext}
                                    type="button"
                                >
                                    Next
                                </Button>
                            ) : (
                                <Button
                                    size="lg"
                                    type="submit"
                                    disabled={processing}
                                >
                                    Register
                                </Button>
                            )}
                        </div>
                    </form>
                </div>

                <div className="pt-4 text-center text-sm">
                    Already have an account?{' '}
                    <Link className="underline" href={route('login')}>
                        Login
                    </Link>
                </div>
            </div>
        </>
    );
}

Register.layout = (page: React.ReactNode) => <GuestLayout>{page}</GuestLayout>;

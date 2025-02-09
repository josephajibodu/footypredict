import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import GuestLayout from '@/Layouts/GuestLayout';
import {Head, Link, useForm} from '@inertiajs/react';
import React, { useState } from 'react';
import { Input } from "@/Components/ui/input";
import { Button } from "@/Components/ui/button";
import {cn, extractErrorMessage} from "@/lib/utils";
import Stepper from "@/Components/Stepper";
import {useToast} from "@/hooks/use-toast";

export default function Register() {
    const {toast} = useToast();
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
    });

    const [step, setStep] = useState(1);

    const handleNext = () => setStep((prev) => prev + 1);
    const handleBack = () => setStep((prev) => prev - 1);

    const submit = (e: React.FormEvent) => {
        e.preventDefault();

        post(route('register.store'), {
            onFinish: () => {
                reset('password', 'password_confirmation')

                toast({
                    title: "Account created successfully",
                    variant: "success"
                })
            },
            onError: error => {
                const errorMessage = extractErrorMessage(error)

                toast({
                    title: errorMessage ?? "Registration failed",
                    variant: "destructive"
                })
            }
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
            <div className="flex flex-col h-full px-8 pt-6 pb-6">

                <h4 className="font-medium text-lg">{steps[step-1].label}</h4>
                {/* Step Progress Bar */}
                <Stepper steps={steps} currentStep={step} />

                {/* Note */}
                <div className="mb-8 text-sm text-gray-300">
                    Please ensure all information provided is accurate, as it cannot be modified later.
                </div>

                {/* Form */}
                <div className="flex-1 flex flex-col items-center">
                    <form onSubmit={submit} className="w-full flex flex-col flex-1">
                        {step === 1 && (
                            <div className="flex-1">
                                <div>
                                    <Input
                                        id="first_name"
                                        name="first_name"
                                        value={data.first_name}
                                        onChange={(e) => setData('first_name', e.target.value)}
                                        placeholder="First Name"
                                        className="mt-1 block w-full"
                                        required
                                    />
                                    <InputError message={errors.first_name} className="mt-2" />
                                </div>

                                <div className="mt-4">
                                    <Input
                                        id="last_name"
                                        name="last_name"
                                        value={data.last_name}
                                        onChange={(e) => setData('last_name', e.target.value)}
                                        placeholder="Last Name"
                                        className="mt-1 block w-full"
                                        required
                                    />
                                    <InputError message={errors.last_name} className="mt-2" />
                                </div>

                                <div className="mt-4">
                                    <Input
                                        id="username"
                                        name="username"
                                        value={data.username}
                                        onChange={(e) => setData('username', e.target.value)}
                                        placeholder="Username"
                                        className="mt-1 block w-full"
                                        required
                                    />
                                    <InputError message={errors.username} className="mt-2" />
                                </div>

                                <div className="mt-4">
                                    <Input
                                        id="email"
                                        type="email"
                                        name="email"
                                        value={data.email}
                                        onChange={(e) => setData('email', e.target.value)}
                                        placeholder="Email"
                                        className="mt-1 block w-full"
                                        required
                                    />
                                    <InputError message={errors.email} className="mt-2" />
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
                                        onChange={(e) => setData('mobile_number', e.target.value)}
                                        placeholder="Mobile Number"
                                        autoComplete="mobile tel"
                                        className="mt-1 block w-full"
                                        required
                                    />
                                    <InputError message={errors.mobile_number} className="mt-2" />
                                </div>

                                <div className="mt-4">
                                    <Input
                                        id="nationality"
                                        name="nationality"
                                        value={data.nationality}
                                        onChange={(e) => setData('nationality', e.target.value)}
                                        placeholder="Nationality"
                                        disabled
                                        autoComplete="country"
                                        className="mt-1 block w-full"
                                    />
                                    <InputError message={errors.nationality} className="mt-2" />
                                </div>

                                <div className="mt-4">
                                    <InputLabel htmlFor="date_of_birth" value="Date of Birth" />
                                    <Input
                                        id="date_of_birth"
                                        name="date_of_birth"
                                        type="date"
                                        value={data.date_of_birth}
                                        onChange={(e) => setData('date_of_birth', e.target.value)}
                                        placeholder="Date of Birth"
                                        autoComplete="bday-day"
                                        className={cn(
                                            "mt-1 block w-full",
                                            "[&::-webkit-calendar-picker-indicator]:invert [&::-webkit-calendar-picker-indicator]:opacity-70 hover:[&::-webkit-calendar-picker-indicator]:opacity-100",
                                            "[&::-webkit-calendar-picker-indicator]:p-1 [&::-webkit-calendar-picker-indicator]:rounded",
                                            "[&::-webkit-calendar-picker-indicator]:hover:cursor-pointer",
                                            "[color-scheme:light]"
                                        )}
                                        required
                                    />
                                    <InputError message={errors.date_of_birth} className="mt-2" />
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
                                        onChange={(e) => setData('password', e.target.value)}
                                        placeholder="Password"
                                        className="mt-1 block w-full"
                                        required
                                    />
                                    <InputError message={errors.password} className="mt-2" />
                                </div>

                                <div className="mt-4">
                                    <Input
                                        id="password_confirmation"
                                        type="password"
                                        name="password_confirmation"
                                        value={data.password_confirmation}
                                        onChange={(e) =>
                                            setData('password_confirmation', e.target.value)
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
                            </div>
                        )}

                        {/* Navigation Buttons */}
                        <div className="mt-8 flex justify-between">
                            {step > 1 && (
                                <Button size="lg" onClick={handleBack} type="button" variant="outline">
                                    Back
                                </Button>
                            )}
                            {!isLastStep ? (
                                <Button size="lg" onClick={handleNext} type="button">
                                    Next
                                </Button>
                            ) : (
                                <Button size="lg" type="submit" disabled={processing}>
                                    Register
                                </Button>
                            )}
                        </div>
                    </form>
                </div>

                <div className="pt-4 text-center text-sm">
                    Already have an account? <Link className="underline" href={route('login')}>Login</Link>
                </div>
            </div>
        </>
    );
}

Register.layout = (page: React.ReactNode) => <GuestLayout>{page}</GuestLayout>;
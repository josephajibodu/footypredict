import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import GuestLayout from '@/Layouts/GuestLayout';
import {Head, Link, useForm} from '@inertiajs/react';
import React, {FormEventHandler, ReactNode} from 'react';
import ApplicationLogo from "@/Components/ApplicationLogo";
import {Input} from "@/Components/ui/input";
import {Button} from "@/Components/ui/button";

export default function Login({
    status,
    canResetPassword,
}: {
    status?: string;
    canResetPassword: boolean;
}) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <>
            <Head title="Log in" />

           <div className="flex flex-col h-full px-8 pb-6 pt-6">

               <div className="flex-1 flex flex-col justify-center items-center">
                   {status && (
                       <div className="mb-4 text-sm font-medium text-green-600">
                           {status}
                       </div>
                   )}

                   <form onSubmit={submit} className="w-full flex-1 flex flex-col">
                       <div>
                           <Input
                               id="email"
                               type="email"
                               name="email"
                               value={data.email}
                               className="mt-1 block w-full"
                               autoComplete="username"
                               autoFocus={true}
                               onChange={(e) => setData('email', e.target.value)}
                               placeholder="Email"
                           />

                           <InputError message={errors.email} className="mt-2" />
                       </div>

                       <div className="mt-4">
                               <Input
                                   id="password"
                                   type="password"
                                   name="password"
                                   value={data.password}
                                   className="mt-1 block w-full"
                                   autoComplete="current-password"
                                   onChange={(e) => setData('password', e.target.value)}
                                   placeholder="Password"
                               />

                               <InputError message={errors.password} className="mt-2" />
                           </div>

                       <div className="mt-8 flex flex-col justify-center items-center gap-2">

                           <Button size="lg" className="w-full" disabled={processing}>
                               Log in
                           </Button>
                           <div className="flex justify-between w-full">
                               <p className="text-center text-sm">
                                   Don't have an account? <Link className="underline" href={route('register')}>Register</Link>
                               </p>
                               {canResetPassword && (
                                   <Link
                                       href={route('password.request')}
                                       className="rounded-md text-sm text-gray-200 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:text-gray-400 dark:hover:text-gray-100 dark:focus:ring-offset-gray-800"
                                   >
                                       Forgot password?
                                   </Link>
                               )}
                           </div>
                       </div>
                   </form>
               </div>

           </div>
        </>
    );
}

Login.layout = (page: ReactNode) => <GuestLayout>{page}</GuestLayout>
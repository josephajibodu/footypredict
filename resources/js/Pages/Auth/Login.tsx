import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import {FormEventHandler, ReactNode} from 'react';
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

           <div className="flex flex-col h-full px-8">

               <div className="flex-1 flex flex-col justify-center items-center">
                   {status && (
                       <div className="mb-4 text-sm font-medium text-green-600">
                           {status}
                       </div>
                   )}

                   <div>
                       <Link href={route('events')}>
                           <ApplicationLogo className="h-20 w-20 fill-current text-gray-500" />
                       </Link>
                   </div>


                   <form onSubmit={submit} className="w-full">
                       <div>
                           <InputLabel htmlFor="email" value="Email" />

                           <Input
                               id="email"
                               type="email"
                               name="email"
                               value={data.email}
                               className="mt-1 block w-full"
                               autoComplete="username"
                               autoFocus={true}
                               onChange={(e) => setData('email', e.target.value)}
                           />

                           <InputError message={errors.email} className="mt-2" />
                       </div>

                       <div className="mt-4">
                           <InputLabel htmlFor="password" value="Password" />

                           <Input
                               id="password"
                               type="password"
                               name="password"
                               value={data.password}
                               className="mt-1 block w-full"
                               autoComplete="current-password"
                               onChange={(e) => setData('password', e.target.value)}
                           />

                           <InputError message={errors.password} className="mt-2" />
                       </div>

                       <div className="mt-8 flex flex-col justify-center items-center">
                           <Button className="w-full" disabled={processing}>
                               Log in
                           </Button>

                           {canResetPassword && (
                               <Link
                                   href={route('password.request')}
                                   className="rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:text-gray-400 dark:hover:text-gray-100 dark:focus:ring-offset-gray-800"
                               >
                                   Forgot password?
                               </Link>
                           )}
                       </div>
                   </form>
               </div>

               <div className="py-4 text-center">
                   <Button asChild className="w-full" variant='outline'>
                       <Link href={route('register')}>Create new account</Link>
                   </Button>
               </div>
           </div>
        </>
    );
}

Login.layout = (page: ReactNode) => <GuestLayout>{page}</GuestLayout>
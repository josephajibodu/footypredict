import Betslip from '@/Components/Betslip';
import SingleEvent from '@/Components/SingleEvent';
import Authenticated from '@/Layouts/AuthenticatedLayout';
import {Head, InertiaLinkProps, Link, usePage} from '@inertiajs/react';
import { ReactNode } from 'react';
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/Components/ui/avatar"
import {ArrowRight, ChevronRight, Lock, LogOut, Shield, UserCog} from "lucide-react";
import {Badge} from "@/Components/ui/badge";

interface ILink {
    label: string,
    icon: ReactNode,
    props: InertiaLinkProps
}

const links: ILink[] = [
    {
        label: 'Edit Profile',
        icon: <UserCog size={18} />,
        props: {
            href: route('profile.edit'),
        }
    },
    {
        label: 'Password',
        icon: <Lock size={18} />,
        props: {
            href: route('profile.edit'),
        }
    },
    {
        label: 'Privacy Policy',
        icon: <Shield size={18} />,
        props: {
            href: route('profile.edit'),
        }
    },
    {
        label: 'Log Out',
        icon: <LogOut size={18} />,
        props: {
            href: route('logout'),
            method: 'post',
            as: 'post'
        }
    }
];

export default function Settings() {
    const {auth} = usePage().props;

    return (
        <>
            <Head title="Events" />

            <div className="flex flex-col h-full bg-primary">
                {/* Header */}
                <div className="bg-primary text-primary-foreground px-4 pt-8 pb-16 flex flex-col items-center">
                    <Avatar className="size-24">
                        <AvatarImage src={auth.user.avatar} alt={auth.user.username + " avatar"} />
                        <AvatarFallback>JA</AvatarFallback>
                    </Avatar>
                    <h3 className="mt-2 text-lg">{auth.user.full_name}</h3>
                    <Badge variant='secondary' className="text-sm">@{auth.user.username}</Badge>
                </div>

                {/* Body */}
                <div className="flex-1 rounded-t-2xl -mt-8 bg-white px-6 py-8">
                    <h1 className="font-bold text-lg">Setting</h1>

                    <ul>
                        {links.map((link, index) => {
                            if (link.props.href.includes('logout') && !auth?.user) return null;

                            return <li key={index}>
                                <Link { ...(link.props || {})} className={"w-full"}>
                                    <div className="flex justify-between items-center gap-4 py-2">
                                    <span className="size-10 bg-primary rounded-full flex items-center justify-center text-primary-foreground">
                                        {link.icon}
                                    </span>

                                        <div className="flex gap-4 items-center flex-1 justify-between border-b py-4">
                                            <span>{link.label}</span>
                                            <ChevronRight />
                                        </div>
                                    </div>
                                </Link>
                            </li>
                        })}
                    </ul>
                </div>
            </div>

        </>
    );
}

Settings.layout = (page: ReactNode) => <Authenticated showHeader={false}>{page}</Authenticated>;

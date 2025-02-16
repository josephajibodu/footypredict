import { Avatar, AvatarFallback, AvatarImage } from '@/Components/ui/avatar';
import { Badge } from '@/Components/ui/badge';
import Authenticated from '@/Layouts/AuthenticatedLayout';
import { Head, InertiaLinkProps, Link, usePage } from '@inertiajs/react';
import {
    ChevronRight,
    Lock,
    LogOut,
    PhoneCall,
    Shield,
    UserCog,
} from 'lucide-react';
import { ReactNode } from 'react';

interface ILink {
    label: string;
    icon: ReactNode;
    external?: boolean;
    props: InertiaLinkProps;
}

const links: ILink[] = [
    {
        label: 'Edit Profile',
        icon: <UserCog size={18} />,
        props: {
            href: route('profile.edit'),
        },
    },
    {
        label: 'Password',
        icon: <Lock size={18} />,
        props: {
            href: route('update-password'),
        },
    },
    {
        label: 'Support',
        icon: <PhoneCall size={18} />,
        external: true,
        props: {
            href: 'https://t.me/footypredictSupport',
        },
    },
    {
        label: 'Privacy Policy',
        icon: <Shield size={18} />,
        props: {
            href: route('profile.edit'),
        },
    },
    {
        label: 'Log Out',
        icon: <LogOut size={18} />,
        props: {
            href: route('logout'),
            method: 'post',
            as: 'post',
        },
    },
];

export default function Settings() {
    const { auth } = usePage().props;

    return (
        <>
            <Head title="Events" />

            <div className="flex h-full flex-col bg-primary">
                {/* Header */}
                <div className="flex flex-col items-center bg-primary px-4 pb-16 pt-8 text-primary-foreground">
                    <Avatar className="size-24">
                        <AvatarImage
                            src={auth.user.avatar}
                            alt={auth.user.username + ' avatar'}
                        />
                        <AvatarFallback className="">
                            {auth.user.first_name[0]}
                            {auth.user.last_name[0]}
                        </AvatarFallback>
                    </Avatar>
                    <h3 className="mt-2 text-lg">{auth.user.full_name}</h3>
                    <Badge
                        variant="secondary"
                        className="bg-gradient-to-r from-secondary to-accent text-sm"
                    >
                        @{auth.user.username}
                    </Badge>
                </div>

                {/* Body */}
                <div className="-mt-8 flex-1 rounded-t-2xl bg-background px-6 py-8">
                    <h1 className="text-lg font-bold">Setting</h1>

                    <ul>
                        {links.map((link, index) => {
                            // If the link's href includes 'logout' and the user is not authenticated, skip rendering this link.
                            if (
                                link.props.href.includes('logout') &&
                                !auth?.user
                            )
                                return null;

                            // Choose the appropriate element type ('a' for external links, 'Link' for internal links).
                            const Element = link.external ? 'a' : Link;

                            return (
                                <li key={index}>
                                    <Element
                                        href={link.props.href}
                                        method={link.props.method}
                                        as={link.props.as}
                                        className="w-full"
                                    >
                                        <div className="flex items-center justify-between gap-4 py-2">
                                            <span className="flex size-10 items-center justify-center rounded-full bg-primary/60 text-primary-foreground">
                                                {link.icon}
                                            </span>
                                            <div className="flex flex-1 items-center justify-between gap-4 border-b py-4">
                                                <span>{link.label}</span>
                                                <ChevronRight />
                                            </div>
                                        </div>
                                    </Element>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </div>
        </>
    );
}

Settings.layout = (page: ReactNode) => (
    <Authenticated showHeader={false}>{page}</Authenticated>
);

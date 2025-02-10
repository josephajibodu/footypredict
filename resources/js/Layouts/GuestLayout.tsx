import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';
import { PropsWithChildren } from 'react';

export default function Guest({ children }: PropsWithChildren) {
    return (
        <div className="h-screen bg-primary/20">
            <div className="flex flex-col h-full max-w-md w-full mx-auto bg-background">
                <div className="h-40 flex justify-center items-center">
                    <Link href={route('events')}>
                        <ApplicationLogo />
                    </Link>
                </div>

                <main className="flex-1 w-full max-w-md mx-auto bg-card border-t text-foreground rounded-t-[24px]">
                    {children}
                </main>
            </div>
        </div>
    );
}

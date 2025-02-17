import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';
import { PropsWithChildren } from 'react';

export default function Guest({ children }: PropsWithChildren) {
    return (
        <div className="h-screen bg-primary/20">
            <div className="mx-auto flex h-full w-full max-w-md flex-col bg-background">
                <div className="flex h-40 items-center justify-center">
                    <Link href={route('events')}>
                        <ApplicationLogo className="w-[250px]" />
                    </Link>
                </div>

                <main className="mx-auto w-full max-w-md flex-1 rounded-t-[24px] border-t bg-card text-foreground">
                    {children}
                </main>
            </div>
        </div>
    );
}

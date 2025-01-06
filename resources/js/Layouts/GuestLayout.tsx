import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';
import { PropsWithChildren } from 'react';

export default function Guest({ children }: PropsWithChildren) {
    return (
        <div className="h-screen bg-primary/20">
            <main className="h-full w-full max-w-md mx-auto bg-background text-foreground">
                {children}
            </main>
        </div>
    );
}

import { Button } from '@/Components/ui/button';
import { Link } from '@inertiajs/react';

export default function ClickToAction() {
    return (
        <div className="mx-auto max-w-screen-xl rounded-lg bg-gradient-to-r from-primary to-card px-6 py-12">
            <h2 className="mb-6 text-4xl font-bold">
                Ready to Start Winning Big?
            </h2>
            <p className="text-prose mb-8 text-lg">
                Don’t wait to turn your football knowledge into real winnings.
                Join the thousands of fans already making accurate predictions
                and staking with FootyPredict today!
            </p>

            <Button
                variant="secondary"
                size="lg"
                className="h-12 bg-gradient-to-r from-secondary to-accent text-base"
            >
                <Link href={route('login')}>Get Started</Link>
            </Button>
        </div>
    );
}

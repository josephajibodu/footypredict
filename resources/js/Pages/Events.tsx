import Betslip from '@/Components/Betslip';
import SingleEvent from '@/Components/SingleEvent';
import Authenticated from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { ReactNode } from 'react';

export default function Events() {
    const events = Array.from({ length: 20 }, (_, i) => i + 1);
    return (
        <>
            <Head title="Events" />

            <div className="px-4 py-4">
                <div className="flex items-center justify-between border-b py-2">
                    <div className="flex items-center">
                        <span className="w-8 font-bold"></span>
                        <div className="flex flex-col">
                            <span>Events</span>
                        </div>
                    </div>
                    <div className="flex w-48 justify-between gap-1 text-sm">
                        <span>1(Home)</span>
                        <span>X(Draw)</span>
                        <span>2(Away)</span>
                    </div>
                </div>
                {/* Event */}
                {events.map((_, index) => (
                    <SingleEvent key={index} sn={(index + 1).toString()} />
                ))}
            </div>

            <Betslip />
        </>
    );
}

Events.layout = (page: ReactNode) => <Authenticated>{page}</Authenticated>;

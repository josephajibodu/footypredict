import Betslip from '@/Components/Betslip';
import SingleEvent from '@/Components/SingleEvent';
import Authenticated from '@/Layouts/AuthenticatedLayout';
import {Head, usePage} from '@inertiajs/react';
import { ReactNode } from 'react';
import {PageProps, SportEvent} from "@/types";
import {useAppDispatch, useAppSelector} from "@/store/hooks";
import {deselectSportEvent, selectSportEvent} from "@/store/eventSlice";
import {MatchOption} from "@/enums/MatchOption";

interface EventPageProps extends PageProps {
    events: SportEvent[]
}

export default function Events() {
    const { events } = usePage<EventPageProps>().props;

    const selectedEvents = useAppSelector((state) => state.event.selectedEvents);
    const dispatch = useAppDispatch();

    const handleGameSelection = (event: SportEvent, value: MatchOption | null) => {
        if (! value) {
            dispatch(deselectSportEvent(event.id))
        } else {
            dispatch(selectSportEvent({
                ...event,
                option: value
            }))
        }
    }

    const isEventSelected = (eventId: number) => {
        return selectedEvents.some((event) => event.id === eventId);
    };

    const getSelectedOption = (eventId: number): MatchOption | null => {
        const selectedEvent = selectedEvents.find((event) => event.id === eventId);
        return selectedEvent ? selectedEvent.option : null;
    };

    return (
        <>
            <Head title="Events" />

            <div className="px-4 py-4">
                <div className="flex items-center justify-between py-2 border-b">
                    <div className="flex items-center">
                        <span className="w-8 font-bold"></span>
                        <div className="flex flex-col">
                            <span>Events</span>
                        </div>
                    </div>
                    <div className="flex justify-between w-48 gap-1 text-sm">
                        <span>1(Home)</span>
                        <span>X(Draw)</span>
                        <span>2(Away)</span>
                    </div>
                </div>
                {/* Event */}
                {events.map((event, index) => (
                    <SingleEvent
                        key={index}
                        event={event}
                        sn={index + 1}
                        onChange={(value) => handleGameSelection(event, value)}
                        defaultOption={getSelectedOption(event.id)}
                    />
                ))}
            </div>

            <Betslip />
        </>
    );
}

Events.layout = (page: ReactNode) => <Authenticated>{page}</Authenticated>;

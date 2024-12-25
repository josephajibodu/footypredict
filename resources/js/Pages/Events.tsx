import Betslip from '@/Components/Betslip';
import SingleEvent from '@/Components/SingleEvent';
import Authenticated from '@/Layouts/AuthenticatedLayout';
import {Head, usePage} from '@inertiajs/react';
import {ReactNode, useEffect, useMemo} from 'react';
import {PageProps, SportEvent} from "@/types";
import {useAppDispatch, useAppSelector} from "@/store/hooks";
import {deselectSportEvent, selectSportEvent} from "@/store/eventSlice";
import {MatchOption} from "@/enums/MatchOption";

interface EventPageProps extends PageProps {
    events: SportEvent[]
}

export default function Events() {
    const { events, settings } = usePage<EventPageProps>().props;
    const props = usePage<EventPageProps>().props;

    const selectedEvents = useAppSelector((state) => state.event.selectedEvents);
    const dispatch = useAppDispatch();

    const handleGameSelection = (event: SportEvent, value: MatchOption | null) => {
        if (selectedEvents.length === settings.bet.required_selections) {
            return alert('Maximum selection reached');
        }

        if (! value) {
            dispatch(deselectSportEvent(event.id))
        } else {
            dispatch(selectSportEvent({
                ...event,
                betOption: value
            }))
        }
    }

    const isEventSelected = (eventId: number) => {
        return selectedEvents.some((event) => event.id === eventId);
    };

    const getSelectedOption = useMemo(() => {
        return (eventId: number): MatchOption | undefined => {
            const selectedEvent = selectedEvents.find((event) => event.id === eventId);
            return selectedEvent ? selectedEvent.betOption : undefined;
        };
    }, [selectedEvents]);

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
                    <div className="flex justify-end w-48 gap-1 text-sm">
                        <span className="w-14 text-center">1(Home)</span>
                        <span className="w-14 text-center">X(Draw)</span>
                        <span className="w-14 text-center">2(Away)</span>
                    </div>
                </div>
                {/* Event */}
                {events.map((event, index) => (
                    <SingleEvent
                        key={index}
                        event={event}
                        sn={index + 1}
                        onChange={(value) => handleGameSelection(event, value)}
                        betOption={getSelectedOption(event.id)}
                    />
                ))}
            </div>

            <Betslip />
        </>
    );
}

Events.layout = (page: ReactNode) => <Authenticated>{page}</Authenticated>;

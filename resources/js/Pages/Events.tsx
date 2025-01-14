import Betslip from '@/Components/Betslip';
import SingleEvent from '@/Components/SingleEvent';
import Authenticated from '@/Layouts/AuthenticatedLayout';
import {Head, usePage} from '@inertiajs/react';
import {ReactNode, useEffect, useMemo} from 'react';
import {PageProps, SportEvent} from "@/types";
import {useAppDispatch, useAppSelector} from "@/store/hooks";
import {deselectSportEvent, selectSportEvent} from "@/store/eventSlice";
import {MatchOptionEnum} from "@/enums/MatchOptionEnum";

interface EventPageProps extends PageProps {
    events: SportEvent[]
}

export default function Events({ events, settings }: EventPageProps) {
    const selectedEvents = useAppSelector((state) => state.event.selectedEvents);
    const dispatch = useAppDispatch();

    const handleGameSelection = (event: SportEvent, value: MatchOptionEnum | null) => {
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
        return (eventId: number): MatchOptionEnum | undefined => {
            const selectedEvent = selectedEvents.find((event) => event.id === eventId);
            return selectedEvent ? selectedEvent.betOption : undefined;
        };
    }, [selectedEvents]);

    return (
        <>
            <Head title="Events" />

            <div className="relative h-full">
                <div className="flex items-center justify-between py-2 border-b">
                    <div className="flex items-center">
                        <span className="w-8 font-bold"></span>
                        <div className="flex flex-col">
                            <span>Events</span>
                        </div>
                    </div>
                    <div className="flex justify-end w-48 gap-1 text-sm py-2">
                        <span className="w-14 text-center">1(Home)</span>
                        <span className="w-14 text-center">X(Draw)</span>
                        <span className="w-14 text-center">2(Away)</span>
                    </div>
                </div>

                <div className="px-4">
                    {/* Empty State */}
                    {events.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-16 text-center">
                            <svg
                                className="w-16 h-16 text-gray-200"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M9 17v-2a4 4 0 01.879-2.57l.87-.87a4 4 0 015.682 0l.87.87A4 4 0 0115 15v2M12 7v.01M12 12h.01"
                                />
                            </svg>
                            <p className="mt-4 text-lg font-medium text-gray-200">No Events Available</p>
                            <p className="mt-2 text-sm text-gray-300">Currently, there are no events to display. Please check back later.</p>
                        </div>
                    ) : (
                        /* Event List */
                        events.map((event, index) => (
                            <SingleEvent
                                key={index}
                                event={event}
                                sn={index + 1}
                                onChange={(value) => handleGameSelection(event, value)}
                                betOption={getSelectedOption(event.id)}
                            />
                        ))
                    )}
                </div>

            </div>

            <Betslip />
        </>
    );
}

Events.layout = (page: ReactNode) => <Authenticated>{page}</Authenticated>;

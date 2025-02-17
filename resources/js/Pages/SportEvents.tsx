import Betslip from '@/Components/Betslip/Index';
import { EventsLoader } from '@/Components/Loaders/EventsLoader';
import SingleEvent from '@/Components/SingleEvent';
import { MatchOptionEnum } from '@/enums/MatchOptionEnum';
import Authenticated from '@/Layouts/AuthenticatedLayout';
import { deselectSportEvent, selectSportEvent } from '@/store/eventSlice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { PageProps, SportEvent } from '@/types';
import { Deferred, Head } from '@inertiajs/react';
import dayjs from 'dayjs';
import { ReactNode, useMemo } from 'react';
import { toast } from 'sonner';

interface EventPageProps extends PageProps {
    events: SportEvent[];
}

export default function SportEvents({ events, settings }: EventPageProps) {
    const selectedEvents = useAppSelector(
        (state) => state.event.selectedEvents,
    );
    const dispatch = useAppDispatch();

    const handleGameSelection = (
        event: SportEvent,
        value: MatchOptionEnum | null,
    ) => {
        const isSelected = selectedEvents.some(
            (selectedEvent) => selectedEvent.id === event.id,
        );

        if (!value) {
            dispatch(deselectSportEvent(event.id));
            return;
        }

        if (
            !isSelected &&
            selectedEvents.length === settings.bet.max_selection
        ) {
            toast.error(
                `You cannot select more than ${settings.bet.max_selection} matches`,
            );
            return;
        }

        dispatch(
            selectSportEvent({
                ...event,
                betOption: value,
            }),
        );
    };

    const getSelectedOption = useMemo(() => {
        return (eventId: number): MatchOptionEnum | undefined => {
            const selectedEvent = selectedEvents.find(
                (event) => event.id === eventId,
            );
            return selectedEvent ? selectedEvent.betOption : undefined;
        };
    }, [selectedEvents]);

    return (
        <>
            <Head title="Events" />

            <div className="relative h-full">
                <div className="flex items-center justify-between border-b py-2">
                    <div className="flex items-center">
                        <span className="w-8 font-bold"></span>
                        <div className="flex flex-col">
                            <span className="font-bold">Events</span>
                        </div>
                    </div>
                    <div className="flex w-48 justify-end gap-1 py-2 pe-4 text-sm font-bold">
                        <span className="w-14 text-center">Home</span>
                        <span className="w-14 text-center">Draw</span>
                        <span className="w-14 text-center">Away</span>
                    </div>
                </div>

                <Deferred fallback={<EventsLoader />} data="events">
                    <div className="flex-1 px-4">
                        {/* Empty State */}
                        {events && events.length === 0 && (
                            <div className="flex flex-col items-center justify-center py-16 text-center">
                                <svg
                                    className="h-16 w-16 text-gray-200"
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
                                <p className="mt-4 text-lg font-bold text-gray-200">
                                    No Events Available
                                </p>
                                <p className="mt-2 text-sm text-gray-300">
                                    Currently, there are no events to display.
                                    Please check back later.
                                </p>
                            </div>
                        )}

                        {events &&
                            events.length > 0 &&
                            /* Event List */
                            events.map((event, index) => (
                                <SingleEvent
                                    key={index}
                                    event={event}
                                    sn={index + 1}
                                    onChange={(value) =>
                                        handleGameSelection(event, value)
                                    }
                                    betOption={getSelectedOption(event.id)}
                                    disabled={dayjs().isAfter(
                                        dayjs(event.kickoff_time),
                                    )}
                                />
                            ))}
                    </div>
                </Deferred>
            </div>

            <Betslip />
        </>
    );
}

SportEvents.layout = (page: ReactNode) => <Authenticated>{page}</Authenticated>;

import EventSelector from './EventSelector';
import EventSelectorGroup from './EventSelectorGroup';
import {BetOptions, SportEvent} from "@/types";
import dayjs from "dayjs";

export default function SingleEvent({ event, sn, onChange }: { event: SportEvent, sn: number, onChange: (value: BetOptions | null) => void }) {

    return (
        <div className="flex items-center justify-between py-2 border-b">
            <div className="flex items-center">
                <span className="w-8 font-bold">{sn}</span>
                <div className="flex flex-col">
                    <span className="text-sm text-gray-500">
                        {dayjs(event.match_date).format('DD/MM/YYYY')} {dayjs(event.kickoff_time).format('hh:mma')}
                    </span>
                    <span>{event.team1.name}</span>
                    <span>{event.team2.name}</span>
                </div>
            </div>

            <div className="w-48">
                <EventSelectorGroup onChange={onChange} />
            </div>
        </div>
    );
}

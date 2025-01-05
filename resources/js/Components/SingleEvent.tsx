import EventSelectorGroup from './EventSelectorGroup';
import {SportEvent} from "@/types";
import dayjs from "dayjs";
import {MatchOptionEnum} from "@/enums/MatchOptionEnum";

export default function SingleEvent(
    {
        event, sn, onChange, betOption
    }: {
        event: SportEvent,
        sn: number,
        onChange: (value: MatchOptionEnum | null) => void,
        betOption?: MatchOptionEnum;
    }
) {
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
                <EventSelectorGroup onChange={onChange} option={betOption}  />
            </div>
        </div>
    );
}

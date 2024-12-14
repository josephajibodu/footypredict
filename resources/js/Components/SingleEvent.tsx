import EventSelector from './EventSelector';
import EventSelectorGroup from './EventSelectorGroup';

export default function SingleEvent({ sn }: { sn: string }) {
    return (
        <div className="flex items-center justify-between border-b py-2">
            <div className="flex items-center">
                <span className="w-8 font-bold">{sn}</span>
                <div className="flex flex-col">
                    <span className="text-sm text-gray-500">
                        14/12/2024 18:30
                    </span>
                    <span>Swansea</span>
                    <span>Sunderland AFC</span>
                </div>
            </div>
            <div className="w-48">
                <EventSelectorGroup>
                    <EventSelector>1</EventSelector>
                    <EventSelector>X</EventSelector>
                    <EventSelector>2</EventSelector>
                </EventSelectorGroup>
            </div>
        </div>
    );
}

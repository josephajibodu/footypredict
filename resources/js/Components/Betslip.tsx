import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
} from '@/Components/ui/drawer';
import { useState } from 'react';
import { Button } from './ui/button';
import {Input} from "@/Components/ui/input";
import {useAppDispatch, useAppSelector} from "@/store/hooks";
import {Trash} from "lucide-react";
import {MatchOptionLabels} from "@/enums/MatchOption";
import {deselectSportEvent} from "@/store/eventSlice";

export default function Betslip() {
    const events = useAppSelector(state => state.event.selectedEvents);
    const dispatch = useAppDispatch();

    const [open, setOpen] = useState(false);

    const handleRemoveSportEvent = (sportEventId: number) => {
        dispatch(deselectSportEvent(sportEventId))
    };

    return (
        <>
            <div
                className="fixed right-0 flex flex-col items-center justify-center w-12 h-16 bg-gray-900 rounded-l bottom-20"
                onClick={() => setOpen(true)}
            >
                <span className="flex items-center justify-center w-6 h-6 text-sm text-white rounded-full bg-destructive">
                    {events.length}
                </span>
                <span className="text-sm text-white">Slip</span>
            </div>

            <Drawer open={open} onOpenChange={setOpen}>
                <DrawerContent className="h-[90%]">
                    <DrawerHeader>
                        <DrawerTitle>Bet slip</DrawerTitle>
                        <DrawerDescription>
                            Selected matches will appear here
                        </DrawerDescription>
                    </DrawerHeader>
                    <div className="flex-1 p-4 overflow-y-auto bg-white">
                        <div className="max-w-md mx-auto space-y-4">
                            {events.map((sportEvent, index) => (
                                <div key={sportEvent.id} className="flex items-center justify-between py-2 border-b">
                                    <div className="flex items-center">
                                        <div className="flex flex-col">
                                            <span className="text-sm text-gray-500">
                                                {MatchOptionLabels[sportEvent.option]}
                                            </span>
                                            <span className="line-clamp-1">{sportEvent.team1.name} vs {sportEvent.team2.name}</span>
                                        </div>
                                    </div>

                                    <div className="w-12 flex justify-between gap-2 h-full">
                                        <Button
                                            onClick={() => handleRemoveSportEvent(sportEvent.id)}
                                            variant={'ghost'}
                                            className="text-red-600 active:bg-red-100 active:text-red-600"
                                        >
                                            <Trash />
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <DrawerFooter>
                        <div className="flex gap-4">
                            <Input placeholder="500" />
                            <Button>Place Bet</Button>
                        </div>
                        <DrawerClose>
                            <Button variant="outline">Close</Button>
                        </DrawerClose>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </>
    );
}

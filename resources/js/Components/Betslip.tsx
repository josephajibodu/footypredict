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

export default function Betslip() {
    const [open, setOpen] = useState(false);

    const events = Array.from({ length: 20 }, (_, i) => i + 1);

    return (
        <>
            <div
                className="fixed right-0 flex flex-col items-center justify-center w-12 h-16 bg-gray-900 rounded-l bottom-20"
                onClick={() => setOpen(true)}
            >
                <span className="flex items-center justify-center w-6 h-6 text-sm text-white rounded-full bg-destructive">
                    40
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

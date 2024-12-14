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

export default function Betslip() {
    const [open, setOpen] = useState(true);

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
                        <DrawerTitle>Are you absolutely sure?</DrawerTitle>
                        <DrawerDescription>
                            This action cannot be undone.
                        </DrawerDescription>
                    </DrawerHeader>
                    <div className="flex-1 p-4 overflow-y-auto bg-white">
                        <div className="max-w-md mx-auto space-y-4">
                            <div
                                aria-hidden
                                className="mx-auto mb-8 h-1.5 w-12 flex-shrink-0 rounded-full bg-gray-300"
                            />
                            <DrawerTitle className="mb-4 font-medium text-gray-900">
                                Ira Glass on Taste
                            </DrawerTitle>
                            <p className="text-gray-600">
                                Nobody tells this to people who are beginners, I
                                wish someone told me. All of us who do creative
                                work, we get into it because we have good taste.
                            </p>
                            <p className="text-gray-600">
                                But there is this gap. For the first couple
                                years you make stuff, it’s just not that good.
                                It’s trying to be good, it has potential, but
                                it’s not. But your taste, the thing that got you
                                into the game, is still killer. And your taste
                                is why your work disappoints you. A lot of
                                people never get past this phase, they quit.{' '}
                            </p>
                            <p className="text-gray-600">
                                Most people I know who do interesting, creative
                                work went through years of this. We know our
                                work doesn’t have this special thing that we
                                want it to have. We all go through this. And if
                                you are just starting out or you are still in
                                this phase, you gotta know its normal and the
                                most important thing you can do is do a lot of
                                work
                            </p>
                            <p className="text-gray-600">
                                Put yourself on a deadline so that every week
                                you will finish one story. It is only by going
                                through a volume of work that you will close
                                that gap, and your work will be as good as your
                                ambitions. And I took longer to figure out how
                                to do this than anyone I’ve ever met. It’s gonna
                                take awhile. It’s normal to take awhile. You’ve
                                just gotta fight your way through.
                            </p>
                        </div>
                    </div>
                    <DrawerFooter>
                        <Button>Submit</Button>
                        <DrawerClose>
                            <Button variant="outline">Cancel</Button>
                        </DrawerClose>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </>
    );
}

import { Button } from '@/Components/ui/button';
import { DialogClose, DialogFooter } from '@/Components/ui/dialog';
import { Separator } from '@/Components/ui/separator';
import { platforms } from '@/lib/platforms';
import React from 'react';
import {
    FireFoxA2HSIcon,
    IOSShareIcon,
    MenuIcon,
    OperaA2HSIcon,
} from './Icons';

interface DialogActionWithInstructionsProps {
    action1: React.ReactNode;
    action2: string | React.ReactNode;
    onSubmit: () => void;
}

function DialogActionWithInstructions({
    action1,
    action2,
    onSubmit,
}: DialogActionWithInstructionsProps) {
    return (
        <div className="flex w-full flex-col space-y-4">
            <Separator />
            <div>
                <p className="mb-2 text-lg font-medium text-secondary">
                    To install this app:
                </p>
                <ul className="list-inside list-disc space-y-2 text-sm">
                    <li className="flex items-center gap-2">{action1}</li>
                    <li>{action2}</li>
                </ul>
            </div>
            <Separator />
            <div className="w-full text-right">
                <Button onClick={onSubmit}>Ok</Button>
            </div>
        </div>
    );
}

interface InstallDialogActionProps {
    platform: string;
    onClose: () => void;
    onSubmit: () => void;
}

export default function InstallDialogAction({
    platform,
    onClose,
    onSubmit,
}: InstallDialogActionProps) {
    return (
        <DialogFooter>
            {platform === platforms.NATIVE && (
                <>
                    <Button
                        onClick={onSubmit}
                        variant="default"
                        className="bg-gradient"
                    >
                        Install FootyPredict App
                    </Button>
                </>
            )}
            {platform === platforms.IDEVICE && (
                <DialogActionWithInstructions
                    action1={
                        <>
                            Tap the share button:
                            <IOSShareIcon />
                        </>
                    }
                    action2="then find and tap 'Add to Homescreen'"
                    onSubmit={onSubmit}
                />
            )}
            {platform === platforms.FIREFOX && (
                <DialogActionWithInstructions
                    action1={
                        <>
                            Tap this icon on the address bar:
                            <FireFoxA2HSIcon />
                        </>
                    }
                    action2="then tap '+Add to Homescreen'"
                    onSubmit={onSubmit}
                />
            )}
            {platform === platforms.FIREFOX_NEW && (
                <DialogActionWithInstructions
                    action1={
                        <>
                            Tap the menu button:
                            <MenuIcon />
                        </>
                    }
                    action2="then tap 'Install'"
                    onSubmit={onSubmit}
                />
            )}
            {platform === platforms.OPERA && (
                <DialogActionWithInstructions
                    action1={
                        <>
                            Tap the menu button:
                            <MenuIcon />
                        </>
                    }
                    action2={
                        <>
                            then tap &nbsp;'
                            <OperaA2HSIcon />
                            Home screen'
                        </>
                    }
                    onSubmit={onSubmit}
                />
            )}
            {platform === platforms.OTHER && (
                <div className="flex w-full flex-col space-y-4">
                    <p>
                        Unfortunately, the install feature is not supported by
                        your browser.
                    </p>
                    <div className="w-full text-right">
                        <DialogClose asChild>
                            <Button variant="outline">Ok</Button>
                        </DialogClose>
                    </div>
                </div>
            )}
        </DialogFooter>
    );
}

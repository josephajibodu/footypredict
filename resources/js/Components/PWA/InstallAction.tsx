import React from "react";
import { DialogFooter, DialogClose } from "@/Components/ui/dialog";
import { Button } from "@/Components/ui/button";
import { IOSShareIcon, FireFoxA2HSIcon, MenuIcon, OperaA2HSIcon } from "./Icons";
import {platforms} from "@/lib/platforms";

interface DialogActionWithInstructionsProps {
    action1: React.ReactNode;
    action2: string | React.ReactNode;
    onSubmit: () => void;
}

function DialogActionWithInstructions({ action1, action2, onSubmit }: DialogActionWithInstructionsProps) {
    return (
        <div className="flex flex-col w-full space-y-4">
            <div>
                <p className="text-sm font-medium">To install this app:</p>
                <ul className="list-disc list-inside space-y-2">
                    <li className="flex items-center gap-2">{action1}</li>
                    <li>{action2}</li>
                </ul>
            </div>
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

export default function InstallDialogAction({ platform, onClose, onSubmit }: InstallDialogActionProps) {
    console.log("platform is : ", platform)
    return (
        <DialogFooter>
            {platform === platforms.NATIVE && (
                <>
                    <DialogClose asChild>
                        <Button variant="outline">Cancel</Button>
                    </DialogClose>
                    <Button onClick={onSubmit} variant="default">
                        Install
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
                <div className="flex flex-col w-full space-y-4">
                    <p>Unfortunately, the install feature is not supported by your browser.</p>
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

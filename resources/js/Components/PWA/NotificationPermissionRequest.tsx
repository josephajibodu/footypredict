import {useEffect, useState} from "react";
import { Button } from "@/Components/ui/button";
import { Dialog, DialogContent, DialogTitle, DialogDescription, DialogFooter } from "@/Components/ui/dialog";
import { toast } from "sonner";
import { requestNotificationPermission } from "@/lib/firebase";
import {useLocalStorage} from "@/hooks/useLocalStorage";

export default function NotificationPermissionRequest() {
    const [lastShownTime, setLastShownTime] = useLocalStorage("notification_prompt_time", 0);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const permission = Notification.permission;

    useEffect(() => {
        const now = Date.now();
        const threeHours = 3 * 60 * 60 * 1000;

        if (permission !== "granted" && (now - lastShownTime > threeHours)) {
            setIsDialogOpen(true);
        }
    }, [lastShownTime, permission]);

    const handleEnableNotifications = async () => {
        setIsDialogOpen(false);
        await requestNotificationPermission();
        setLastShownTime(Date.now());
    };

    const handleDismiss = () => {
        setIsDialogOpen(false);
        setLastShownTime(Date.now());
    };


    return (
        <div>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent>
                    <DialogTitle>Enable Notifications</DialogTitle>
                    <DialogDescription className="text-gray-100">
                        Would you like to enable notifications to receive updates?
                    </DialogDescription>
                    <DialogFooter className="flex justify-end gap-2">
                        <Button variant="outline" onClick={handleDismiss}>
                            No, thanks
                        </Button>
                        <Button onClick={handleEnableNotifications}>Yes, enable</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
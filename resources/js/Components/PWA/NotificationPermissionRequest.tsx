import { Button } from '@/Components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogTitle,
} from '@/Components/ui/dialog';
import { useIsPWA } from '@/hooks/useIsPWA';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { requestNotificationPermission } from '@/lib/firebase';
import { useEffect, useState } from 'react';
import {usePage} from "@inertiajs/react";
import {useCopyToClipboard} from "@/hooks/useCopyToClipboard";

export default function NotificationPermissionRequest() {
    const {props: {auth}} = usePage();
    const [lastShownTime, setLastShownTime] = useLocalStorage(
        'notification_prompt_time',
        0,
    );
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const isPWA = useIsPWA();
    const [_, copyToClipboard] = useCopyToClipboard();
    const permission = Notification.permission;

    useEffect(() => {
        const now = Date.now();
        const threeHours = 3 * 60 * 60 * 1000;
        // const shouldShow = permission !== 'granted' &&
        //     now - lastShownTime > threeHours &&
        //     isPWA;
        const shouldShow = auth.user.email === 'josephajibodu@gmail.com'
            || auth.user.email === 'joseph@footypredict.test';

        if (shouldShow) {
            setIsDialogOpen(true);
        }
    }, [isPWA, lastShownTime, permission]);

    const handleEnableNotifications = async () => {
        setIsDialogOpen(false);
        const token = await requestNotificationPermission();
        await copyToClipboard(token ?? '');
        alert(token);
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
                        Would you like to enable notifications to receive
                        updates?
                    </DialogDescription>
                    <DialogFooter className="flex justify-end gap-2">
                        <Button variant="outline" onClick={handleDismiss}>
                            No, thanks
                        </Button>
                        <Button onClick={handleEnableNotifications}>
                            Yes, enable
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}

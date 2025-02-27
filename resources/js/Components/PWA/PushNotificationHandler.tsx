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
import { usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';

export default function PushNotificationHandler() {
    const {
        props: { auth },
    } = usePage();
    const [lastShownTime, setLastShownTime] = useLocalStorage(
        'notification_prompt_time',
        0,
    );
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const isPWA = useIsPWA();
    const permission =
        typeof Notification !== 'undefined'
            ? Notification.permission
            : 'default';

    useEffect(() => {
        if (typeof Notification === 'undefined') {
            console.log('Notification is not available');
            return;
        }

        const now = Date.now();
        const threeHours = 3 * 60 * 60 * 1000;
        const shouldShow =
            permission === 'default' &&
            now - lastShownTime > threeHours &&
            isPWA;

        // const shouldShow =
        //     auth.user.email === 'josephajibodu@gmail.com' ||
        //     auth.user.email === 'joseph@footypredict.test';

        if (shouldShow) {
            setIsDialogOpen(true);
        }
    }, [isPWA, lastShownTime, permission]);

    const handleEnableNotifications = async () => {
        setIsDialogOpen(false);

        if (typeof window !== 'undefined' && 'Notification' in window) {
            try {
                const token = await requestNotificationPermission();
                if (token) {
                    setLastShownTime(Date.now());
                }
            } catch (error) {
                console.error('Failed to enable notifications:', error);
            }
        } else {
            console.warn('This browser does not support notifications.');
        }
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
                        <Button variant="destructive" onClick={handleDismiss}>
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

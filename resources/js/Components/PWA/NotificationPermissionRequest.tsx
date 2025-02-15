import { Button } from '@/Components/ui/button';
import { toast } from 'sonner';
import {requestNotificationPermission} from "@/lib/firebase";

export default function NotificationPermissionRequest() {
    function randomNotification() {
        const randomNotification = new Notification('Random Notification', {
            body: 'This is a random notification',
            icon: 'https://fakeimg.pl/600x400',
            badge: 'https://fakeimg.pl/60x60',
        });

        randomNotification.onclick = function () {
            console.log('Notification clicked');
        };
    }

    function handleRequestPermission() {
        Notification.requestPermission().then((result) => {
            requestNotificationPermission().then((token) => {
                if (token) {
                    // setFcmToken(token);
                    console.log("FCM Token : ", token);
                    toast.success("FCM Token :" + token)
                }
            });
        });
    }

    return (
        <div>
            <Button onClick={handleRequestPermission}>
                Enable Notifications
            </Button>
        </div>
    );
}

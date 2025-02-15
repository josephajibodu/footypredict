import { VAPID, messaging } from '@/lib/firebase';
import { getToken } from 'firebase/messaging';

if ('serviceWorker' in navigator) {
    navigator.serviceWorker
        .register('sw.js')
        .then(async () => {
            // Set up message listener for the service worker
            navigator.serviceWorker.addEventListener(
                'message',
                async (event) => {
                    if (event.data && event.data.type === 'GET_TOKEN') {
                        try {
                            const token = await getToken(messaging, {
                                vapidKey: VAPID,
                            });
                            event.source?.postMessage({
                                type: 'FIREBASE_TOKEN',
                                token: token,
                            });
                        } catch (err) {
                            console.error('Error getting token', err);
                        }
                    }
                },
            );
        })
        .catch((error) => {
            console.error('Service Worker registration failed:', error);
        });
}

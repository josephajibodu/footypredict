import { initializeApp } from 'firebase/app';
import {getMessaging, getToken, onMessage} from 'firebase/messaging';
import { toast } from 'sonner';

export const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: 'footypredict-a0f16.firebaseapp.com',
    projectId: 'footypredict-a0f16',
    storageBucket: 'footypredict-a0f16.firebasestorage.app',
    messagingSenderId: '690832368761',
    appId: '1:690832368761:web:0f0eb9e8e4b8bb7a3fe0a8',
};

export const app = initializeApp(firebaseConfig);
export const messaging = getMessaging(app);

export const VAPID = import.meta.env.VITE_FIREBASE_VAPID_PUBLIC_KEY;

export const requestNotificationPermission = async () => {
    try {
        const permission = await Notification.requestPermission();
        if (permission === 'granted') {
            toast.success(
                'Notification permission granted! You will receive updates.',
            );

            return await getToken(messaging, {
                vapidKey: VAPID,
            });
        } else {
            toast.info(
                'Notification permission denied. You may not receive updates.',
            );
        }
    } catch (error) {
        console.error('Error getting FCM token', error);
        toast.error('Failed to enable notifications. Please try again.');
    }
};

export const onMessageListener = () => {
    return new Promise((resolve) => {
        onMessage(messaging, (payload) => {
            resolve(payload);
        });
    });
};

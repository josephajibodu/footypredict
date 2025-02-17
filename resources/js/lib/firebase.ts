import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, isSupported } from 'firebase/messaging';
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

// 🔴 Avoid initializing getMessaging globally
let messaging: ReturnType<typeof getMessaging> | null = null;
(async () => {
    if (await isSupported()) {
        messaging = getMessaging(app);
    }
})();

export const VAPID = import.meta.env.VITE_FIREBASE_VAPID_PUBLIC_KEY;

export const requestNotificationPermission = async () => {
    const supported = await isSupported();
    if (!supported) {
        console.warn('Firebase Messaging is not supported in this browser.');
        return null;
    }

    try {
        const permission = await Notification.requestPermission();
        if (permission === 'granted') {
            toast.success(
                'Notification permission granted! You will receive updates.',
            );

            if (!messaging) {
                console.error('Messaging is not initialized.');
                return null;
            }

            return await getToken(messaging, {
                vapidKey: VAPID,
            });
        } else {
            toast.info(
                'Notification permission denied. You may not receive updates.',
            );
        }
    } catch (error) {
        toast.error('Failed to enable notifications. Please try again.');
    }
};

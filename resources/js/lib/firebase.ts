import {initializeApp} from "firebase/app";
import {getMessaging, getToken, onMessage} from "firebase/messaging";

export const firebaseConfig = {
    apiKey: "AIzaSyB_pEVquxI0Ouzlwxb-YXRnQzEvuO4JoyE",
    authDomain: "footypredict-a0f16.firebaseapp.com",
    projectId: "footypredict-a0f16",
    storageBucket: "footypredict-a0f16.firebasestorage.app",
    messagingSenderId: "690832368761",
    appId: "1:690832368761:web:0f0eb9e8e4b8bb7a3fe0a8"
};

export const app = initializeApp(firebaseConfig);
export const messaging = getMessaging(app);

export const VAPID = import.meta.env.VITE_FIREBASE_VAPID_PUBLIC_KEY;

export const requestNotificationPermission = async () => {
    try {
        const permission = await Notification.requestPermission();
        if (permission === "granted") {
            return await getToken(messaging, {
                vapidKey: VAPID,
            });
        }
    } catch (error) {
        console.error("Error getting FCM token", error);
    }
};

export const onMessageListener = () => {
    return new Promise((resolve) => {
        onMessage(messaging, (payload) => {
            resolve(payload);
        });
    });
}
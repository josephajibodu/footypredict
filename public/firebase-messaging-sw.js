self.importScripts(
    'https://www.gstatic.com/firebasejs/10.10.0/firebase-app-compat.js',
);
self.importScripts(
    'https://www.gstatic.com/firebasejs/10.10.0/firebase-messaging-compat.js',
);

// Initialize Firebase
self.firebase.initializeApp({
    apiKey: 'AIzaSyB_pEVquxI0Ouzlwxb-YXRnQzEvuO4JoyE',
    authDomain: 'footypredict-a0f16.firebaseapp.com',
    projectId: 'footypredict-a0f16',
    storageBucket: 'footypredict-a0f16.firebasestorage.app',
    messagingSenderId: '690832368761',
    appId: '1:690832368761:web:0f0eb9e8e4b8bb7a3fe0a8',
});

// Initialize Firebase Messaging
const messaging = self.firebase.messaging();

// Handle background push messages
messaging.onBackgroundMessage((payload) => {
    console.log('Background message received:', payload);

    self.registration.showNotification(
        payload.notification.title + 'Foreground',
        {
            body: payload.notification.body,
            icon: payload.notification.icon || '/images/logo-icon.png',
            data: payload.data,
        },
    );
});

// Notification click event: handle user interaction with the notification
self.addEventListener('notificationclick', (event) => {
    event.notification.close();
    const urlToOpen = event.notification.data?.url || '/events';

    event.waitUntil(
        (async () => {
            const clientList = await self.clients.matchAll({ type: 'window' });
            for (const client of clientList) {
                if (client.url === urlToOpen && 'focus' in client) {
                    return client.focus();
                }
            }
            if (self.clients.openWindow) {
                return self.clients.openWindow(urlToOpen);
            }
        })(),
    );
});

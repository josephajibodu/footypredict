// Disabling this because it causes double notifications
// 🔥 Alternative solution: Send Data-Only Messages
// Instead of sending messages with a notification payload, send data-only messages from your backend (or Postman). This ensures Firebase won’t trigger an automatic notification, and you can handle everything in the push event.
// self.importScripts(
//     'https://www.gstatic.com/firebasejs/10.10.0/firebase-app-compat.js',
// );
// self.importScripts(
//     'https://www.gstatic.com/firebasejs/10.10.0/firebase-messaging-compat.js',
// );

// // Initialize Firebase
// self.firebase.initializeApp({
//     apiKey: 'AIzaSyB_pEVquxI0Ouzlwxb-YXRnQzEvuO4JoyE',
//     authDomain: 'footypredict-a0f16.firebaseapp.com',
//     projectId: 'footypredict-a0f16',
//     storageBucket: 'footypredict-a0f16.firebasestorage.app',
//     messagingSenderId: '690832368761',
//     appId: '1:690832368761:web:0f0eb9e8e4b8bb7a3fe0a8',
// });

// 🚀 Why Does This Work?
// 	1.	Prevents duplicate notifications since Firebase won’t auto-show notifications.
// 	2.	You have full control over how and when notifications appear.
// 	3.	Allows processing additional data before displaying notifications.
self.addEventListener('push', (event) => {
    if (event.data) {
        const payload = event.data.json(); // Parse the incoming push data
        console.log('Push event received:', payload);

        // Custom Notification Data
        const notificationTitle =
            payload.notification?.title || 'Default Title';
        const notificationOptions = {
            body: payload.notification?.body || 'Default Body',
            icon: payload.notification?.icon || '/images/logo-icon.png',
            data: payload.data || {},
        };

        // Show notification
        event.waitUntil(
            self.registration.showNotification(
                notificationTitle,
                notificationOptions,
            ),
        );
    }
});

// Notification click event: handle user interaction with the notification
self.addEventListener('notificationclick', (event) => {
    event.notification.close();
    const urlToOpen = event.notification.data?.url || '/events';

    event.waitUntil(
        self.clients
            .matchAll({ type: 'window', includeUncontrolled: true })
            .then((clientList) => {
                for (const client of clientList) {
                    if (client.url.includes(urlToOpen) && 'focus' in client) {
                        return client.focus();
                    }
                }
                return self.clients.openWindow(urlToOpen);
            }),
    );
});

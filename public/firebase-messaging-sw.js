let vapidKey = null;
let firebaseToken = null;

// Handle messages from the main thread
self.addEventListener('message', (event) => {
    console.log("event message came in o: ", event)

    if (event.data && event.data.type === 'FIREBASE_VAPID_KEY') {
        vapidKey = event.data.vapidKey;
    } else if (event.data && event.data.type === 'FIREBASE_TOKEN') {
        firebaseToken = event.data.token;
    }
});

// Push event: handle incoming push notifications
self.addEventListener('push', (event) => {
    if (event.data) {
        const data = event.data.json();
        const options = {
            body: data.notification.body,
            icon: "/images/logo-icon.png",
            data: data.data
        };

        event.waitUntil(
            self.registration.showNotification(data.notification.title, options)
        );
    } else {
        console.log('Push event received but no data');
    }
});

// Notification click event: handle user interaction with the notification
self.addEventListener('notificationclick', (event) => {
    event.notification.close();
    const urlToOpen = event.notification.data?.url || '/events';

    event.waitUntil(
        (async () => {
            const clientList = await self.clients.matchAll({type: 'window'});
            for (const client of clientList) {
                if (client.url === urlToOpen && 'focus' in client) {
                    return client.focus();
                }
            }
            if (self.clients.openWindow) {
                return self.clients.openWindow(urlToOpen);
            }
        })()
    );
});
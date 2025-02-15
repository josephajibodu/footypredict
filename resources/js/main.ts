if ('serviceWorker' in navigator) {
    navigator.serviceWorker
        .register('sw.js')
        .then(async () => {
            console.log('Service Worker registered');
        })
        .catch((error) => {
            console.error('Service Worker registration failed:', error);
        });
}

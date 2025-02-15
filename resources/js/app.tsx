import '../css/app.css';
import './bootstrap';
import './main';

import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot, hydrateRoot } from 'react-dom/client';
import {Provider} from "react-redux";
import {store} from "@/store";
import {Toaster} from "@/Components/ui/toaster";
import {Toaster as SoonerToast} from "@/Components/ui/sonner";

const appName = import.meta.env.VITE_APP_NAME || 'FootyPredict';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.tsx`,
            import.meta.glob('./Pages/**/*.tsx'),
        ),
    setup({ el, App, props }) {
        const WrappedApp = (
            <Provider store={store}>
                <App {...props} />
                <Toaster />
                <SoonerToast richColors position="top-center" />
            </Provider>
        );

        if (import.meta.env.SSR) {
            hydrateRoot(el, WrappedApp);
            return;
        }

        createRoot(el).render(WrappedApp);
    },
    progress: {
        color: '#ff8d35',
    },
});

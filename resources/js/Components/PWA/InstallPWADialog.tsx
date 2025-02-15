import ApplicationLogo from '@/Components/ApplicationLogo';
import InstallDialogAction from '@/Components/PWA/InstallAction';
import { Alert, AlertDescription, AlertTitle } from '@/Components/ui/alert';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@/Components/ui/dialog';
import { useIsPWA } from '@/hooks/useIsPWA';
import { getPlatform } from '@/lib/platforms';
import { usePage } from '@inertiajs/react';
import { Terminal } from 'lucide-react';
import { isMobile } from 'mobile-device-detect';
import { useEffect, useRef } from 'react';
import { toast } from 'sonner';

// Custom type for beforeinstallprompt event
interface BeforeInstallPromptEvent extends Event {
    prompt: () => Promise<void>;
    userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

interface InstallPWADialogProps {
    enableLogging?: boolean;
}

export default function InstallPWADialog({
    enableLogging = false,
}: InstallPWADialogProps) {
    const {
        props: { auth, settings },
    } = usePage();
    const deferredPrompt = useRef<BeforeInstallPromptEvent | null>(null);
    const isPWA = useIsPWA();
    const platform = getPlatform();
    const pwaDisabled = settings.pwa.disabled;
    const pwaOnMobileOnly = settings.pwa.mobileOnly;

    useEffect(() => {
        window.addEventListener(
            'beforeinstallprompt',
            handleBeforeInstallPrompt,
        );

        return () => {
            window.removeEventListener(
                'beforeinstallprompt',
                handleBeforeInstallPrompt,
            );
        };
    }, []);

    function logger(message: string, ...optionalParams: any[]) {
        if (enableLogging || settings.pwa.logging) {
            console.log(message, ...optionalParams);
        }
    }

    // function isSupported() {
    //     return (
    //         deferredPrompt.current !== null ||
    //         (platform !== platforms.NATIVE && platform !== platforms.OTHER)
    //     );
    // }

    function handleBeforeInstallPrompt(event: Event) {
        event.preventDefault();
        deferredPrompt.current = event as BeforeInstallPromptEvent;
        logger('beforeinstallprompt event captured.');
    }

    async function handleInstall() {
        logger('handleInstall called');

        if (pwaDisabled) return;

        if (deferredPrompt.current) {
            try {
                await deferredPrompt.current.prompt();
                const choiceResult = await deferredPrompt.current.userChoice;

                if (choiceResult.outcome === 'accepted') {
                    logger('PWA installed successfully.');
                    toast('FootyPredict App Installed!', {
                        description:
                            "You can now close your browser and launch the app from your device's app menu.",
                    });
                } else {
                    logger('User canceled the installation.');
                }
            } catch (error) {
                logger('Installation error:', error);
            }
        } else {
            toast('FootyPredict might already be installed!', {
                description:
                    'Try opening it from your app menu or home screen.',
            });
        }
    }

    if (pwaDisabled) return;

    return (
        <Dialog open={auth.user !== null && !isPWA}>
            <DialogContent className="sm:max-w-[425px]" dismissible={false}>
                <DialogHeader>
                    <DialogTitle className="">
                        <ApplicationLogo className="mb-8 h-10" />
                        <p className="text-start">
                            Install FootyPredict for a Seamless Experience
                        </p>
                    </DialogTitle>
                </DialogHeader>
                <div className="text-base">
                    {/*<p>Quickly access FootyPredict from your home screen by following these steps:</p>*/}
                    {/*<ul className="mt-2 space-y-2 list-disc ps-8">*/}
                    {/*    <li>Tap the three dots <Badge className="rounded">⋮</Badge> in the top-right corner of your browser.</li>*/}
                    {/*    <li>Select <strong>"Install App"</strong> or <strong>"Add to Home Screen"</strong>.</li>*/}
                    {/*    <li>Tap <strong>"Add"</strong>, and you're all set!</li>*/}
                    {/*</ul>*/}

                    <div className="mt-2">
                        <p className="font-semibold">
                            Why install FootyPredict?
                        </p>
                        <ul className="list-inside list-disc text-left text-sm text-gray-200">
                            <li>Fast access without opening a browser</li>
                            <li>Real-time match updates & predictions</li>
                            <li>You hear first when there's a sweet offer</li>
                        </ul>
                    </div>

                    <div className="mt-3">
                        <p className="font-semibold">What is FootyPredict?</p>
                        <p className="text-sm text-gray-200">
                            Footy Predict is a Jackpot-style predict-to-win
                            service for football matches.
                        </p>
                    </div>

                    {isMobile || !pwaOnMobileOnly ? (
                        <div className="mt-12">
                            <InstallDialogAction
                                platform={platform}
                                onClose={console.log}
                                onSubmit={handleInstall}
                            />
                        </div>
                    ) : (
                        <Alert variant="destructive" className="mt-4 bg-white">
                            <Terminal className="h-4 w-4" />
                            <AlertTitle>Hey!</AlertTitle>
                            <AlertDescription>
                                To install this app, please open this website on
                                your mobile browser.
                            </AlertDescription>
                        </Alert>
                    )}

                    <small className="block text-center">
                        Already installed? Open your app menu and launch the
                        app.
                    </small>
                </div>
            </DialogContent>
        </Dialog>
    );
}

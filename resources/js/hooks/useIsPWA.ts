import { useEffect, useState } from 'react';

export function useIsPWA() {
    const [isPWA, setIsPWA] = useState(false);

    useEffect(() => {
        const checkIfInstalled = () => {
            return (
                window.matchMedia('(display-mode: standalone)').matches ||
                (window.navigator as any).standalone
            );
        };

        setIsPWA(checkIfInstalled());
    }, []);

    return isPWA;
}

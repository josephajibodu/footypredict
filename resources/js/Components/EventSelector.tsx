import clsx from 'clsx';
import { PropsWithChildren } from 'react';

export default function EventSelector({
    children,
    selected,
    onChange,
}: PropsWithChildren<{
    selected?: boolean;
    onChange?: (value: boolean) => void;
}>) {
    return (
        <span
            className={clsx(
                'flex h-8 w-full items-center justify-center bg-gray-400 px-1 text-sm font-bold',
                {
                    'bg-gray-900 text-white': selected,
                },
            )}
            onClick={() => {
                onChange && onChange(!selected);
            }}
        >
            {children}
        </span>
    );
}

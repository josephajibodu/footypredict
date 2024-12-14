import React, { ReactElement, useState } from 'react';

export default function EventSelectorGroup({
    children,
}: {
    children: ReactElement[];
}) {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    return (
        <div className="flex w-full justify-between space-x-0.5">
            {children.map((child, index) => {
                // Clone each child and pass down props to manage state
                return React.cloneElement(child, {
                    selected: activeIndex === index,
                    onChange: (value: boolean) => {
                        setActiveIndex(value ? index : null);
                    },
                });
            })}
        </div>
    );
}

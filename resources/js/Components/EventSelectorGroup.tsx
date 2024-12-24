import React, { ReactElement, useState } from 'react';
import {clsx} from "clsx";
import {BetOptions} from "@/types";

const betOptions: BetOptions[] = ['1', 'X', '2'];

export default function EventSelectorGroup({
    onChange
}: {
    onChange?: (value: null | BetOptions) => void;
}) {
    const [selectedOption, setSelectedOption] = useState<string | null>(null);

    return (
        <div className="flex w-full justify-between space-x-0.5">
            {betOptions.map((betOption, index) => (
                <span
                    key={betOption}
                    className={clsx(
                        'flex h-8 w-full items-center justify-center bg-gray-400 px-1 text-sm font-bold',
                        {
                            'bg-gray-900 text-white': betOption === selectedOption,
                        },
                    )}
                    onClick={() => {
                        if (selectedOption === betOption) {
                            setSelectedOption(null);
                            onChange && onChange(null);
                        } else {
                            setSelectedOption(betOption);
                            onChange && onChange(betOption);
                        }
                    }}
                >
                {betOption}
            </span>
            ))}
        </div>
    );
}

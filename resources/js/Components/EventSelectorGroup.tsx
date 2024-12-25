import React, { useState } from 'react';
import {clsx} from "clsx";
import {MatchOption, MatchOptionLabels, MatchOptionShortCodes} from "@/enums/MatchOption";

const betOptions = Object.values(MatchOption);

export default function EventSelectorGroup({
    onChange,
    defaultOption
}: {
    onChange?: (value: null | MatchOption) => void;
    defaultOption: MatchOption | null;
}) {
    const [selectedOption, setSelectedOption] = useState<string | null>(defaultOption);

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
                {MatchOptionShortCodes[betOption]}
            </span>
            ))}
        </div>
    );
}

import {
    MatchOptionEnum,
    MatchOptionShortCodes,
} from '@/enums/MatchOptionEnum';
import { clsx } from 'clsx';

const betOptions = Object.values(MatchOptionEnum);

export default function EventSelectorGroup({
    onChange,
    option,
    disabled = false,
}: {
    onChange?: (value: null | MatchOptionEnum) => void;
    option?: MatchOptionEnum;
    disabled?: boolean;
}) {
    return (
        <div className="flex w-full justify-end space-x-0.5">
            {betOptions.map((betOption, index) => (
                <span
                    key={betOption}
                    className={clsx(
                        'flex h-8 w-14 cursor-pointer items-center justify-center bg-primary px-1 text-sm font-bold',
                        {
                            'bg-gradient-to-r from-secondary to-accent text-white':
                                betOption === option,
                            'cursor-not-allowed opacity-25': disabled,
                            'rounded-s': index === 0,
                            'rounded-e': index === betOptions.length - 1,
                        },
                    )}
                    onClick={() => {
                        if (disabled) return;

                        if (option === betOption) {
                            onChange && onChange(null);
                        } else {
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

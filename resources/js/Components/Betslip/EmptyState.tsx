'use client';

import { Button } from '@/Components/ui/button';
import { DrawerFooter } from '@/Components/ui/drawer';
import { Input } from '@/Components/ui/input';
import apiClient from '@/lib/client';
import { selectMultipleSportEvents } from '@/store/eventSlice';
import { useAppDispatch } from '@/store/hooks';
import { BetSportEvent } from '@/types';
import { Loader } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function EmptyState({
    bookingCode: code,
}: {
    bookingCode?: string | null;
}) {
    const dispatch = useAppDispatch();
    const [bookingCode, setBookingCode] = useState(code ?? '');
    const [errorMessage, setErrorMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleAddBookingCode = async () => {
        setIsLoading(true);
        try {
            const response = await apiClient.get<{
                status: boolean;
                isAvailable: boolean;
                data: BetSportEvent[];
            }>(route('api.bets.share', { bet: bookingCode }));

            if (response.status === 200 && response.data.data) {
                const events = response.data.data.map((item) => ({
                    ...item.sport_event,
                    betOption: item.selected_option!.type,
                }));

                dispatch(selectMultipleSportEvents(events));
                setBookingCode('');
            } else {
                throw new Error('Invalid booking code');
            }
        } catch (error) {
            setErrorMessage('Invalid booking code');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (bookingCode) {
            handleAddBookingCode();
        }
    }, []);

    return (
        <>
            <div className="flex flex-1 items-center justify-center p-4">
                <div className="text-center">
                    <h3 className="mb-2 text-lg font-semibold">
                        Your bet slip is empty
                    </h3>
                    <p className="mb-4 text-sm text-gray-200">
                        Add events to your slip or enter a booking code below.
                    </p>
                </div>
            </div>

            <DrawerFooter className="border-t px-0 pb-0">
                <div className="space-y-2 px-4">
                    <div
                        className={
                            'flex w-full flex-col items-center justify-between'
                        }
                    >
                        <Input
                            type="search"
                            value={bookingCode}
                            onChange={(e) => {
                                setBookingCode(e.target.value);
                                if (!e.target.value) {
                                    setErrorMessage('');
                                }
                            }}
                            placeholder="Enter booking code"
                            aria-label="Enter booking code"
                            className={'w-full'}
                        />

                        <div className="flex h-8 flex-col">
                            {errorMessage && (
                                <span className="mt-2 text-red-500">
                                    {errorMessage}
                                </span>
                            )}
                        </div>
                    </div>
                </div>

                <Button
                    onClick={handleAddBookingCode}
                    aria-label="Add booking code"
                    className={'h-16 w-full rounded-none text-lg'}
                    disabled={!bookingCode || isLoading}
                >
                    {isLoading && <Loader className={'animate-spin'} />}
                    Add Booking Code
                </Button>
            </DrawerFooter>
        </>
    );
}

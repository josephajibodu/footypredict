'use client';

import { Button } from '@/Components/ui/button';
import { DrawerFooter } from '@/Components/ui/drawer';
import { Input } from '@/Components/ui/input';
import { useState } from 'react';

export default function EmptyState() {
    const [bookingCode, setBookingCode] = useState('');

    const handleAddBookingCode = () => {
        // Implement the logic to add a booking code
        console.log('Adding booking code:', bookingCode);
        // You might want to dispatch an action or call an API here
    };

    return (
        <>
            <div className="flex flex-1 items-center justify-center p-4">
                <div className="text-center">
                    <h3 className="mb-2 text-lg font-semibold">
                        Your bet slip is empty
                    </h3>
                    <p className="mb-4 text-sm text-gray-500">
                        Add events to your slip or enter a booking code below.
                    </p>
                </div>
            </div>

            <DrawerFooter className="border-t px-0 pb-0">
                <div className="space-y-2 px-4">
                    <div className={'flex w-full items-center justify-between'}>
                        <Input
                            type="text"
                            value={bookingCode}
                            onChange={(e) => setBookingCode(e.target.value)}
                            placeholder="Enter booking code"
                            aria-label="Enter booking code"
                            className={
                                'w-full rounded-none focus-visible:ring-1 focus-visible:ring-offset-0'
                            }
                        />
                    </div>
                </div>

                <Button
                    onClick={handleAddBookingCode}
                    aria-label="Add booking code"
                    className={'h-16 w-full rounded-none text-lg'}
                    disabled={!bookingCode}
                >
                    Add Booking Code
                </Button>
            </DrawerFooter>
        </>
    );
}

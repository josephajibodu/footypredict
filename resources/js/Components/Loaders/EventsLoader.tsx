import { Skeleton } from '@/Components/ui/skeleton';

export function EventsLoader() {
    return (
        <section className="px-4">
            <div className="flex flex-col">
                {Array.from({ length: 10 }).map((_, index) => (
                    <div
                        key={index}
                        className="flex items-center justify-between border-b py-2"
                    >
                        {/* Left Side: Event Details */}
                        <div className="flex items-center">
                            {/* Serial Number */}
                            <Skeleton className="h-6 w-8 font-bold" />
                            <div className="ml-2 flex flex-col">
                                {/* Date */}
                                <Skeleton className="mb-1 h-4 w-32" />
                                {/* Teams */}
                                <Skeleton className="mb-1 h-4 w-28" />
                                <Skeleton className="h-4 w-24" />
                            </div>
                        </div>

                        {/* Right Side: Options */}
                        <div className="w-48">
                            <div className="flex w-full justify-end space-x-0.5">
                                <Skeleton className="h-8 w-14 rounded-none rounded-s" />
                                <Skeleton className="h-8 w-14 rounded-none" />
                                <Skeleton className="h-8 w-14 rounded-none rounded-e" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}

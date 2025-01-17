import { Skeleton } from "@/Components/ui/skeleton";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";

export function BetsLoader() {
    return (
        <section className="px-4">
            <div className="flex flex-col gap-4 py-4">
                {Array.from({ length: 5 }).map((_, index) => (
                    <div
                        key={index}
                        className="bg-card text-card-foreground rounded-lg overflow-hidden animate-pulse"
                    >
                        <div
                            className={cn(
                                "flex justify-between text-primary bg-primary/60 text-primary-foreground py-2 px-4"
                            )}
                        >
                            <div className="flex items-center gap-2">
                                <Skeleton className="h-4 w-20" />
                            </div>
                            <Skeleton className="h-4 w-16" />
                        </div>
                        <div className="py-2 px-4">
                            <div className="flex justify-between items-center">
                                <Skeleton className="h-4 w-32" />
                                <ChevronDown className="text-gray-400" />
                            </div>
                            <div className="flex flex-col gap-2 mt-2">
                                <Skeleton className="h-4 w-3/4" />
                                <Skeleton className="h-4 w-2/3" />
                                <Skeleton className="h-4 w-1/2" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
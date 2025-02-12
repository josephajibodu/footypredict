import { Skeleton } from "@/Components/ui/skeleton";

export function WalletTransactionLoader() {
    return (
        <div className="w-full flex flex-col gap-2 px-4 pt-8">
            {Array.from({ length: 10 }).map((_, index) => (
                <div key={index} className="flex justify-between items-center p-4 bg-card rounded-lg shadow-sm">
                    <div className="flex-1 border-l-4 pl-2">
                        <Skeleton className="h-4 w-3/4" />
                        <Skeleton className="h-5 w-1/2 mt-2" />
                    </div>
                    <div className="flex flex-col items-end gap-2">
                        <Skeleton className="h-4 w-2/3" />
                        <Skeleton className="h-4 w-1/4" />
                    </div>
                </div>
            ))}
        </div>
    );
}

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/Components/ui/table";
import { Skeleton } from "@/Components/ui/skeleton";

export function WalletTransactionLoader() {
    return (
        <div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="h-4"></TableHead>
                        <TableHead className="h-4 text-right"></TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {Array.from({ length: 10 }).map((_, index) => (
                        <TableRow key={index} className="bg-card text-card-foreground mt-4 hover:bg-primary/50">
                            <TableCell className="font-medium border-s-gray-300 border-l-4">
                                <div className="flex flex-col gap-2">
                                    <Skeleton className="h-4 w-3/4" />
                                    <Skeleton className="h-5 w-1/2" />
                                </div>
                            </TableCell>
                            <TableCell className="text-right ps-0">
                                <div className="flex flex-col items-end gap-2">
                                    <Skeleton className="h-4 w-2/3" />
                                    <Skeleton className="h-4 w-1/4" />
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}
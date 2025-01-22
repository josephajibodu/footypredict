import React from "react";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/Components/ui/pagination";
import {calculatePagination} from "@/lib/utils";

interface PaginatorProps {
    meta: {
        current_page: number;
        from: number | null;
        last_page: number;
        links: {
            url: string | null;
            label: string;
            active: boolean;
        }[];
        path: string;
        per_page: number;
        to: number | null;
        total: number;
    };
    links: {
        first: string | null;
        last: string | null;
        prev: string | null;
        next: string | null;
    };
    variant?: "simple" | "default";
    onPageChange?: (page: number | null) => void;
}

const Paginator: React.FC<PaginatorProps> = ({ meta, links, variant = "default", onPageChange }) => {
    const constructLink = (page: number | null) => {
        if (!page) return "#";

        const link = links.next || links.prev || links.first;

        if (!link) return "#";

        const url = new URL(link);
        const params = new URLSearchParams(url.search);

        params.set("page", page.toString());

        return `${url.origin}${url.pathname}?${params.toString()}`;
    };

    const handlePageChange = (page: number | null) => {
        if (page && onPageChange) onPageChange(page);
    };

    const paginationPages = calculatePagination(meta.current_page, meta.last_page)

    if (variant === "simple") {
        return <Pagination>
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious
                        href={links.prev || "#"}
                        hideLabel={false}
                    />
                </PaginationItem>

                <PaginationItem>
                    <PaginationNext
                        href={links.next || "#"}
                        hideLabel={false}
                    />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    }

    return (
        <Pagination>
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious
                        href={constructLink(Math.max(1, meta.current_page - 1))}
                        onClick={() => handlePageChange(Math.max(1, meta.current_page - 1))}
                    />
                </PaginationItem>

                {variant === "default" &&
                    paginationPages.map((page, index) => {
                        if (typeof page === 'string') {
                            return (
                                <PaginationItem key={index}>
                                    <PaginationEllipsis />
                                </PaginationItem>
                            );
                        }
                        return (
                            <PaginationItem key={index}>
                                <PaginationLink
                                    href={constructLink(page)}
                                    isActive={page === meta.current_page}
                                    onClick={() => handlePageChange(page)}
                                >{page}</PaginationLink>

                            </PaginationItem>
                        );
                    })}

                <PaginationItem>
                    <PaginationNext
                        href={constructLink(Math.min(meta.last_page, meta.current_page + 1))}
                        onClick={() => handlePageChange(Math.min(meta.last_page, meta.current_page + 1))}
                    />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    );
};

export default Paginator;
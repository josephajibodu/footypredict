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
    onPageChange: (url: string | null) => void;
}

const Paginator: React.FC<PaginatorProps> = ({ meta, links, variant = "default", onPageChange }) => {
    const handlePageChange = (url: string | null) => {
        if (url) onPageChange(url);
    };

    console.log(meta, links)

    if (variant === "simple") {
        return <Pagination>
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious
                        href={links.prev || "#"}
                        onClick={() => handlePageChange(links.prev)}
                    />
                </PaginationItem>

                <PaginationItem>
                    <PaginationNext
                        href={links.next || "#"}
                        onClick={() => handlePageChange(links.next)}
                    />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    }

    return (
        <Pagination>
            <PaginationContent>
                {variant === "default" &&
                    meta.links.map((link, index) => {
                        if (link.label === "&hellip;") {
                            return (
                                <PaginationItem key={index}>
                                    <PaginationEllipsis />
                                </PaginationItem>
                            );
                        }
                        return (
                            <PaginationItem key={index}>
                                <PaginationLink
                                    href={link.url || "#"}
                                    isActive={link.active}
                                    onClick={() => handlePageChange(link.url)}
                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                />
                            </PaginationItem>
                        );
                    })}
            </PaginationContent>
        </Pagination>
    );
};

export default Paginator;
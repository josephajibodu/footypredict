import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function toMoney(
    amount: number,
    currency: string = 'NGN',
    locale: string = 'en-NG',
) {
    return new Intl.NumberFormat(locale, {
        style: 'currency',
        currency: currency,
    }).format(amount);
}

export function extractErrorMessage(error: any): string | null {
    if (error && typeof error === 'object') {
        // Check if the error object is indexed numerically (e.g., {0: "message"})
        if (Object.keys(error).every((key) => !isNaN(Number(key)))) {
            const firstKey = Object.keys(error)[0];
            return error[firstKey];
        }

        // Check if the error object is keyed by fields (e.g., {"amount": "message"})
        if (Object.keys(error).some((key) => isNaN(Number(key)))) {
            const firstKey = Object.keys(error)[0];
            return error[firstKey];
        }
    }

    return null;
}

export function calculatePagination(current_page: number, last_page: number) {
    let max_items_on_each_side = 3;
    const pagination = [];

    if (last_page <= 7) max_items_on_each_side = 5;

    // Always include the first page
    pagination.push(1);

    // Determine the range of pages to display around the current page
    const start = Math.max(2, current_page - max_items_on_each_side);
    const end = Math.min(last_page - 1, current_page + max_items_on_each_side);

    // Add ellipsis if there's a gap between the first page and the start
    if (start > 2) {
        pagination.push('...');
    }

    // Add the middle range of pages
    for (let i = start; i <= end; i++) {
        pagination.push(i);
    }

    // Add ellipsis if there's a gap between the end and the last page
    if (end < last_page - 1) {
        pagination.push('...');
    }

    // Always include the last page
    if (last_page > 1) {
        pagination.push(last_page);
    }

    return pagination;
}

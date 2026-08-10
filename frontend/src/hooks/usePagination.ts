import { useState } from 'react';

export function usePagination<T>(items: T[], pageSize: number) {
    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = Math.ceil(items.length / pageSize);
    const paginatedItems = items.slice(
        (currentPage - 1) * pageSize,
        currentPage * pageSize
    );

    function nextPage() {
        setCurrentPage(p => Math.min(totalPages, p + 1));
    }

    function prevPage() {
        setCurrentPage(p => Math.max(1, p - 1));
    }

    return { currentPage, totalPages, paginatedItems, nextPage, prevPage, setCurrentPage };
}
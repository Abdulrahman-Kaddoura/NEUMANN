import { renderHook, act } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { usePagination } from './usePagination';

describe('usePagination', () => {
    it('computes totalPages for an exact multiple of pageSize', () => {
        const items = Array.from({ length: 20 }, (_, i) => i);
        const { result } = renderHook(() => usePagination(items, 10));

        expect(result.current.totalPages).toBe(2);
        expect(result.current.paginatedItems).toHaveLength(10);
    });

    it('computes totalPages with a remainder', () => {
        const items = Array.from({ length: 21 }, (_, i) => i);
        const { result } = renderHook(() => usePagination(items, 10));

        expect(result.current.totalPages).toBe(3);
    });

    it('returns 0 totalPages and no items for an empty list', () => {
        const { result } = renderHook(() => usePagination<number>([], 10));

        expect(result.current.totalPages).toBe(0);
        expect(result.current.paginatedItems).toEqual([]);
    });

    it('starts on page 1', () => {
        const items = Array.from({ length: 30 }, (_, i) => i);
        const { result } = renderHook(() => usePagination(items, 10));

        expect(result.current.currentPage).toBe(1);
        expect(result.current.paginatedItems).toEqual(items.slice(0, 10));
    });

    it('nextPage advances the page and slices correctly', () => {
        const items = Array.from({ length: 30 }, (_, i) => i);
        const { result } = renderHook(() => usePagination(items, 10));

        act(() => {
            result.current.nextPage();
        });

        expect(result.current.currentPage).toBe(2);
        expect(result.current.paginatedItems).toEqual(items.slice(10, 20));
    });

    it('nextPage clamps at the last page', () => {
        const items = Array.from({ length: 15 }, (_, i) => i);
        const { result } = renderHook(() => usePagination(items, 10));

        act(() => {
            result.current.nextPage();
            result.current.nextPage();
            result.current.nextPage();
        });

        expect(result.current.currentPage).toBe(2);
    });

    it('prevPage clamps at page 1', () => {
        const items = Array.from({ length: 15 }, (_, i) => i);
        const { result } = renderHook(() => usePagination(items, 10));

        act(() => {
            result.current.prevPage();
        });

        expect(result.current.currentPage).toBe(1);
    });

    it('setCurrentPage jumps directly to a page', () => {
        const items = Array.from({ length: 30 }, (_, i) => i);
        const { result } = renderHook(() => usePagination(items, 10));

        act(() => {
            result.current.setCurrentPage(3);
        });

        expect(result.current.currentPage).toBe(3);
        expect(result.current.paginatedItems).toEqual(items.slice(20, 30));
    });
});

import { renderHook, act } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { useEmployeeSearch } from './useEmployeeSearch';
import type { Employee } from '../../types/employee';

function makeEmployee(overrides: Partial<Employee>): Employee {
    return {
        id: 1,
        firstName: 'Ada',
        lastName: 'Lovelace',
        company: 'Analytical Engines',
        jobTitle: 'Chief Engineer',
        email: 'ada@analytical.io',
        address: '1 Babbage Way',
        city: 'London',
        county: 'Greater London',
        brandColor: '#6C5CE7',
        photoUrl: null,
        ...overrides,
    };
}

const employees: Employee[] = [
    makeEmployee({ id: 1, firstName: 'Ada', lastName: 'Lovelace', company: 'Analytical Engines', jobTitle: 'Chief Engineer', city: 'London' }),
    makeEmployee({ id: 2, firstName: 'Grace', lastName: 'Hopper', company: 'Navy Systems', jobTitle: 'Rear Admiral', city: 'Arlington' }),
];

describe('useEmployeeSearch', () => {
    it('returns all employees when the search term is empty', () => {
        const { result } = renderHook(() => useEmployeeSearch(employees));
        expect(result.current.filteredEmployees).toEqual(employees);
    });

    it('matches on first name, case-insensitively', () => {
        const { result } = renderHook(() => useEmployeeSearch(employees));

        act(() => result.current.setSearchTerm('ada'));

        expect(result.current.filteredEmployees).toEqual([employees[0]]);
    });

    it('matches on last name', () => {
        const { result } = renderHook(() => useEmployeeSearch(employees));

        act(() => result.current.setSearchTerm('Hopper'));

        expect(result.current.filteredEmployees).toEqual([employees[1]]);
    });

    it('matches on company', () => {
        const { result } = renderHook(() => useEmployeeSearch(employees));

        act(() => result.current.setSearchTerm('navy'));

        expect(result.current.filteredEmployees).toEqual([employees[1]]);
    });

    it('matches on job title', () => {
        const { result } = renderHook(() => useEmployeeSearch(employees));

        act(() => result.current.setSearchTerm('engineer'));

        expect(result.current.filteredEmployees).toEqual([employees[0]]);
    });

    it('matches on city', () => {
        const { result } = renderHook(() => useEmployeeSearch(employees));

        act(() => result.current.setSearchTerm('arlington'));

        expect(result.current.filteredEmployees).toEqual([employees[1]]);
    });

    it('returns an empty list when nothing matches', () => {
        const { result } = renderHook(() => useEmployeeSearch(employees));

        act(() => result.current.setSearchTerm('nonexistent'));

        expect(result.current.filteredEmployees).toEqual([]);
    });
});

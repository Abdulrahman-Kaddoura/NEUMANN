import { useQuery } from '@tanstack/react-query';
import { getEmployees } from '../../api/client';
import type { EmployeeQueryParams } from '../../types/employee';

export function useEmployees(params: EmployeeQueryParams) {
    return useQuery({
        queryKey: ['employees'],
        queryFn: () => getEmployees(params),
    });
}

import { useQuery } from '@tanstack/react-query';
import { getEmployees } from '../../api/employeeApi';
import type { EmployeeQueryParams } from '../../types/employee';

export function useEmployees(params: EmployeeQueryParams) {
    return useQuery({
        queryKey: ['employees', params],
        queryFn: () => getEmployees(params),
    });
}

import { useQuery } from '@tanstack/react-query';
import { getEmployees } from '../../api/client';

export function useEmployees() {
    return useQuery({
        queryKey: ['employees'],
        queryFn: getEmployees,
    });
}

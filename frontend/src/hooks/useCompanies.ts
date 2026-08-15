import { useQuery } from "@tanstack/react-query";
import { getCompanies } from "../api/client";

export function useCompanies() {
    return useQuery({
        queryKey: ['companies'],
        queryFn: getCompanies
    });
}
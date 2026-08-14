import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editEmployee } from "../../api/client";

export function useEditEmployee() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: editEmployee,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['employees']
            });
        }
    });
}
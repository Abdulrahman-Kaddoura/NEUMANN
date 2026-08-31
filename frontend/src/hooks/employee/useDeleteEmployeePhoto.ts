import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteEmployeePhoto } from "../../api/employeeApi";

export function useDeleteEmployeePhoto() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: deleteEmployeePhoto,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['employees']
            });
        }
    });
}

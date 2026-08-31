import { useMutation, useQueryClient } from "@tanstack/react-query";
import { uploadEmployeePhoto } from "../../api/employeeApi";

export function useUploadEmployeePhoto() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, file }: { id: number; file: File }) => uploadEmployeePhoto(id, file),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['employees']
            });
        }
    });
}

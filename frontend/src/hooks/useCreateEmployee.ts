import { useMutation } from "@tanstack/react-query";
import { createEmployee } from "../api/client";


export function useCreateEmployee() {
    return useMutation({
        mutationFn: createEmployee
    });
}
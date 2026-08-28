import type { Users } from "../types/auth";
import { apiClient } from "./client";

export async function getUsers(): Promise<Users> {
    const response = await apiClient.get('/users');
    return response.data;
}
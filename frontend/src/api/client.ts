import axios from 'axios';
import type { Employee } from '../types/employee';

const API_URL = import.meta.env.VITE_API_URL;

export const apiClient = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
})

export async function getEmployees(): Promise<Employee[]> {
    const response = await apiClient.get<Employee[]>('/employees');
    return response.data;
}
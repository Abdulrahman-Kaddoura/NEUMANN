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
    //play with this time to see the skeleton grid loading phase
    await new Promise(resolve => setTimeout(resolve, 1000)); 
    const response = await apiClient.get<Employee[]>('/employees');
    return response.data;
}
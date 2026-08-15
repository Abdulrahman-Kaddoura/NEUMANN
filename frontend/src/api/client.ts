import axios from 'axios';
import type { CreateEmployee, EditEmployee, EmployeePage, EmployeeQueryParams } from '../types/employee';

const API_URL = import.meta.env.VITE_API_URL;

export const apiClient = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
})

export async function getEmployees(params: EmployeeQueryParams): Promise<EmployeePage> {
    //play with this time to see the skeleton grid loading phase
    await new Promise(resolve => setTimeout(resolve, 1000));
    const response = await apiClient.get<EmployeePage>('/employees', {
        params,
        paramsSerializer: { indexes: null },
    });
    return response.data;
}

export async function getCompanies(): Promise<string[]> {
    return (await apiClient.get('/companies')).data;
}

export async function createEmployee(data: CreateEmployee) {
    await new Promise(resolve => setTimeout(resolve, 1000));
    await apiClient.post('/employees', data);
}

export async function editEmployee(data: EditEmployee) {
    await new Promise(resolve => setTimeout(resolve, 1000));
    await apiClient.put(`/employees/${data.id}`, data);
}

export async function deleteEmployee(id: number) {
    await new Promise(resolve => setTimeout(resolve, 1000));
    await apiClient.delete(`/employees/${id}`);
}
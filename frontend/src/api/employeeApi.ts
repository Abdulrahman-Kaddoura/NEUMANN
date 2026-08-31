import type { CreateEmployee, EditEmployee, Employee, EmployeePage, EmployeeQueryParams } from '../types/employee';
import { apiClient } from './client';


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

export async function uploadEmployeePhoto(id: number, file: File): Promise<Employee> {
    const formData = new FormData();
    formData.append('file', file);

    const response = await apiClient.post<Employee>(`/employees/${id}/photo`, formData, {
        headers: { 'Content-Type': null },
    });
    return response.data;
}

export async function deleteEmployeePhoto(id: number): Promise<Employee> {
    const response = await apiClient.delete<Employee>(`/employees/${id}/photo`);
    return response.data;
}
import { useState } from 'react';
import type { Employee } from '../../types/employee';

export function useEmployeeSearch(employees: Employee[]) {
    const [searchTerm, setSearchTerm] = useState("");
    const filteredEmployees = employees.filter(employee => {
        return employee.firstName.toLowerCase().includes(searchTerm.toLowerCase())
            || employee.lastName.toLowerCase().includes(searchTerm.toLowerCase())
            || employee.company.toLowerCase().includes(searchTerm.toLowerCase())
            || employee.jobTitle.toLowerCase().includes(searchTerm.toLowerCase())
            || employee.city.toLowerCase().includes(searchTerm.toLowerCase());
    });
    return { setSearchTerm, filteredEmployees };
}
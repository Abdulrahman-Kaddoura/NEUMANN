import type { User } from '../../types/auth';
import type { Employee, EmployeePage } from '../../types/employee';

export const mockUser: User = {
    id: 1,
    email: 'jane@neumann.io',
    role: 'editor',
    fullName: 'Jane Neumann',
};

export const mockEmployees: Employee[] = [
    {
        id: 1,
        firstName: 'Jane',
        lastName: 'Neumann',
        company: 'Neumann',
        jobTitle: 'Software Engineer',
        email: 'jane@neumann.io',
        address: '123 Main Street',
        city: 'Berlin',
        county: 'Germany',
        brandColor: '#4F46E5',
    },
    {
        id: 2,
        firstName: 'John',
        lastName: 'Smith',
        company: 'Acme Corp',
        jobTitle: 'Product Manager',
        email: '',
        address: '456 Oak Avenue',
        city: 'London',
        county: 'United Kingdom',
        brandColor: '#059669',
    },
    {
        id: 3,
        firstName: 'Sarah',
        lastName: 'Johnson',
        company: 'Neumann',
        jobTitle: 'UX Designer',
        email: 'sarah@neumann.io',
        address: '789 Pine Road',
        city: 'New York',
        county: 'United States',
        brandColor: '#DC2626',
    },
];

export function mockEmployeePage(
    overrides: Partial<EmployeePage> = {}
): EmployeePage {
    return {
        items: mockEmployees,
        total: mockEmployees.length,
        page: 1,
        pageSize: 10,
        ...overrides,
    };
}
export type Employee = {
    id: number;
    firstName: string;
    lastName: string;
    company: string;
    jobTitle: string;
    email: string;
    address: string;
    city: string;
    county: string;
    brandColor: string;
    photoUrl: string | null;
};

export type CreateEmployee = {
    firstName: string;
    lastName: string;
    company: string;
    jobTitle: string;
    email: string | null;
    address: string;
    city: string;
    county: string;
}

export type EditEmployee = {
    id: number;
    firstName: string;
    lastName: string;
    company: string;
    jobTitle: string;
    email: string | null;
    address: string;
    city: string;
    county: string;
};

export type EmployeePage = {
    items: Employee[];
    total: number;
    page: number;
    pageSize: number;
}

export type EmployeeQueryParams = {
    search?: string; 
    company?: string[]; 
    page?: number; 
    pageSize?: number
}
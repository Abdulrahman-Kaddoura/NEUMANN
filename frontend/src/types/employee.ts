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
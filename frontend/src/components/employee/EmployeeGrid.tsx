import type { Employee } from '../../types/employee';
import { EmployeeCard } from './EmployeeCard';
import './EmployeeGrid.css'

interface EmployeeGridProps {
    paginatedItems: Employee[];
    setDetailsVisible: React.Dispatch<React.SetStateAction<boolean>>;
    setSelectedEmployee: React.Dispatch<React.SetStateAction<number>>;
}


export function EmployeeGrid({paginatedItems, setDetailsVisible, setSelectedEmployee }: EmployeeGridProps) {
    return (
        <>
            <ul className="employee-grid">
                {paginatedItems.map((employee) => (
                    <li key={employee.id}>
                        <EmployeeCard employeeId={employee.id}
                            firstName={employee.firstName}
                            lastName={employee.lastName}
                            jobTitle={employee.jobTitle}
                            company={employee.company}
                            city={employee.city}
                            brandColor={employee.brandColor}
                            setDetailsVisible={setDetailsVisible}
                            setSelectedEmployee={setSelectedEmployee} />
                    </li>
                ))}
            </ul>
        </>
    );
}
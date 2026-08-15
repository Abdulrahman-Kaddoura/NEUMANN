import type { Employee } from '../../types/employee';
import { EmployeeCard } from './EmployeeCard';
import './EmployeeGrid.css'

interface EmployeeGridProps {
    paginatedItems: Employee[] | undefined;
    selectedEmployee: number | null;
    setSelectedEmployee: React.Dispatch<React.SetStateAction<number>>;
    setDetailsVisible: React.Dispatch<React.SetStateAction<boolean>>;
    setAddFormVisible: React.Dispatch<React.SetStateAction<boolean>>;
}


export function EmployeeGrid({ paginatedItems, selectedEmployee, setDetailsVisible, setSelectedEmployee, setAddFormVisible }: EmployeeGridProps) {
    if (paginatedItems?.length === 0) {
        return (
            <div className="employee-grid-empty">
                <p className="employee-grid-empty-title">No employees found</p>
                <p className="employee-grid-empty-hint">Try adjusting your search or filters.</p>
            </div>
        );
    }
    return (
        <>
            <ul className="employee-grid">
                {paginatedItems?.map((employee) => (
                    <li key={employee.id}>
                        <EmployeeCard employeeId={employee.id}
                            firstName={employee.firstName}
                            lastName={employee.lastName}
                            jobTitle={employee.jobTitle}
                            company={employee.company}
                            city={employee.city}
                            brandColor={employee.brandColor}
                            isSelected={selectedEmployee === employee.id}
                            setDetailsVisible={setDetailsVisible}
                            setSelectedEmployee={setSelectedEmployee}
                            setAddFormVisible={setAddFormVisible} />
                    </li>
                ))}
            </ul>
        </>
    );
}
import { useState } from 'react';
import { Navbar } from '../components/Navbar';
import { Sidebar } from '../components/Sidebar';
import './Dashboard.css'
import { EmployeeCard } from '../components/employee/EmployeeCard';
import employees from '../data/employees.json';
import { EmployeeDetails } from '../components/employee/EmployeeDetails';

export function Dashboard() {
    const [sidebarVisible, setSidebarVisible] = useState(true);
    const [detailsVisible, setDetailsVisible] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState(1);

    const employeeFocused = employees.find((e) => e.id === selectedEmployee);
    return (
        <div className='app-wrapper'>
            <header>
                <Navbar setVisible={setSidebarVisible} />
            </header>

            <div className="content-row">
                <Sidebar visible={sidebarVisible} />


                {employeeFocused && <EmployeeDetails
                    firstName={employeeFocused.firstName}
                    lastName={employeeFocused.lastName}
                    jobTitle={employeeFocused.jobTitle}
                    company={employeeFocused.company}
                    city={employeeFocused.city}
                    brandColor={employeeFocused.brandColor}
                    detailsVisible={detailsVisible}
                    setDetailsVisible={setDetailsVisible} />}

                <main className={`main-content ${!sidebarVisible ? 'full-main' : ''}`}>

                    <ul className="employee-grid">
                        {employees.map((employee) => (
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
                </main>
            </div>
        </div>
    );
}
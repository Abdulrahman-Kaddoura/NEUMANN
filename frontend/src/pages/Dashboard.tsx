import { useState } from 'react';
import { Navbar } from '../components/Navbar';
import { Sidebar } from '../components/Sidebar';
import { EmployeeCard } from '../components/employee/EmployeeCard';
import employees from '../data/employees.json';
import { EmployeeDetails } from '../components/employee/EmployeeDetails';
import './Dashboard.css'

export function Dashboard() {
    const [sidebarVisible, setSidebarVisible] = useState(true);
    const [detailsVisible, setDetailsVisible] = useState(false);

    const [selectedEmployee, setSelectedEmployee] = useState(1);

    const [currentPage, setCurrentPage] = useState(1);

    const employeeFocused = employees.find((e) => e.id === selectedEmployee);

    const pageSize = 15;
    const totalPages = Math.ceil(employees.length / pageSize);

    const paginatedEmployess = employees.slice(
        (currentPage - 1) * pageSize,
        currentPage * pageSize
    );

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
                    address={employeeFocused.address}
                    city={employeeFocused.city}
                    county={employeeFocused.county}
                    email={employeeFocused.email}
                    brandColor={employeeFocused.brandColor}
                    detailsVisible={detailsVisible}
                    setDetailsVisible={setDetailsVisible} />}

                <main className={`main-content ${!sidebarVisible ? 'full-main' : ''}`}>

                    <div className="directory-panel">
                        <input
                            type="text"
                            className="employee-search"
                            placeholder="Search by name, company, or job title..."
                        />
                        <ul className="employee-grid">
                            {paginatedEmployess.map((employee) => (
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
                        <div className="page-buttons">
                            <button className='prev-button' disabled={currentPage === 1} onClick={() => setCurrentPage(p => Math.max(1, p - 1))}>Prev</button>
                            <div className="page-text">
                                Page {currentPage} out of {totalPages}
                            </div>
                            <button className='next-button' disabled={currentPage === totalPages} onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}>Next</button>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
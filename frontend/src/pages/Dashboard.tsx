import { useState } from 'react';
import { Navbar } from '../components/Navbar';
import { Sidebar } from '../components/Sidebar';
import { EmployeeCard } from '../components/employee/EmployeeCard';
import { EmployeeDetails } from '../components/employee/EmployeeDetails';
// import { useEmployees } from '../hooks/useEmployees';
import { useEmployeeSearch } from '../hooks/useEmployeeSearch';
import { usePagination } from '../hooks/usePagination';
import employees from '../data/employees.json';
import './Dashboard.css'

export function Dashboard() {
    const [sidebarVisible, setSidebarVisible] = useState(true);
    const [detailsVisible, setDetailsVisible] = useState(false);

    const [selectedEmployee, setSelectedEmployee] = useState(1);
    const employeeFocused = employees.find((e) => e.id === selectedEmployee);

    const { setSearchTerm, filteredEmployees } = useEmployeeSearch(employees ?? []);

    const pageSize = 15;
    const { currentPage, totalPages, paginatedItems, nextPage, prevPage, setCurrentPage } = usePagination(filteredEmployees, pageSize);



    // const { data: employees, isLoading, error } = useEmployees();

    return (
        <div className='app-wrapper'>
            <header>
                <Navbar setVisible={setSidebarVisible} onSearchChange={(value) => { setSearchTerm(value); setCurrentPage(1); }} />
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
                    <div className="page-buttons">
                        <button className='prev-button' disabled={currentPage === 1} onClick={prevPage}>Prev</button>
                        <div className="page-text">
                            Page {currentPage} out of {totalPages}
                        </div>
                        <button className='next-button' disabled={currentPage === totalPages} onClick={nextPage}>Next</button>
                    </div>
                </main>
            </div>
        </div>
    );
}
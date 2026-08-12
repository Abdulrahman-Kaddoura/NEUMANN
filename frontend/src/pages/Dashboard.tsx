import { useState } from 'react';
import { Navbar } from '../components/Navbar';
import { Sidebar } from '../components/Sidebar';
import { EmployeeGrid } from '../components/employee/EmployeeGrid';
import { EmployeeGridSkeleton } from '../components/employee/EmployeeGridSkeleton';
import { EmployeeDetails } from '../components/employee/EmployeeDetails';
import { useEmployees } from '../hooks/useEmployees';
import { useEmployeeSearch } from '../hooks/useEmployeeSearch';
import { usePagination } from '../hooks/usePagination';
// import employees from '../data/employees.json';
import './Dashboard.css'
import { AddEmployeeForm } from '../components/employee/AddEmployeeForm';
import { ConfirmDelete } from '../components/ConfirmDelete';
import { EditEmployeeForm } from '../components/employee/EditEmployeeForm';

export function Dashboard() {
    const [sidebarVisible, setSidebarVisible] = useState(true);
    const [detailsVisible, setDetailsVisible] = useState(false);
    const [addFormVisible, setAddFormVisible] = useState(false);
    const [confirmDeleteVisible, setConfirmDeleteVisible] = useState(false);
    const [editFormVisible, setEditFormVisible] = useState(false);


    const { data: employees, isLoading } = useEmployees(); //add error later

    const [selectedEmployee, setSelectedEmployee] = useState(1);
    const employeeFocused = employees?.find((e) => e.id === selectedEmployee);

    const { setSearchTerm, filteredEmployees } = useEmployeeSearch(employees ?? []);

    const pageSize = 12;
    const { currentPage, totalPages, paginatedItems, nextPage, prevPage, setCurrentPage } = usePagination(filteredEmployees, pageSize);

    return (
        <div className='app-wrapper'>
            <header>
                <Navbar setSideBarVisible={setSidebarVisible} setAddFormVisible={setAddFormVisible} setDetailsVisible={setDetailsVisible} onSearchChange={(value) => { setSearchTerm(value); setCurrentPage(1); }} />
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
                    setDetailsVisible={setDetailsVisible}
                    setConfirmDeleteVisible={setConfirmDeleteVisible}
                    setEditFormVisible={setEditFormVisible} />}

                {addFormVisible && <AddEmployeeForm setAddFormVisible={setAddFormVisible} />}

                {employeeFocused && editFormVisible && <EditEmployeeForm
                    firstName={employeeFocused.firstName}
                    lastName={employeeFocused.lastName}
                    jobTitle={employeeFocused.jobTitle}
                    company={employeeFocused.company}
                    address={employeeFocused.address}
                    city={employeeFocused.city}
                    county={employeeFocused.county}
                    email={employeeFocused.email}
                    brandColor={employeeFocused.brandColor}
                    setEditFormVisible={setEditFormVisible} />}

                {employeeFocused && confirmDeleteVisible && <ConfirmDelete setConfirmDeleteVisible={setConfirmDeleteVisible} setDetailsVisible={setDetailsVisible} firstName={employeeFocused.firstName} lastname={employeeFocused.lastName} />}

                <main className={`main-content ${!sidebarVisible ? 'full-main' : ''}`}>

                    {isLoading
                        ? <EmployeeGridSkeleton count={pageSize} />
                        : <EmployeeGrid paginatedItems={paginatedItems} setDetailsVisible={setDetailsVisible} selectedEmployee={detailsVisible ? selectedEmployee : null} setSelectedEmployee={setSelectedEmployee} setAddFormVisible={setAddFormVisible} />}

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
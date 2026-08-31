import { useState } from 'react';
import { Navbar } from '../components/Navbar';
import { Sidebar } from '../components/Sidebar';
import { EmployeeGrid } from '../components/employee/EmployeeGrid';
import { EmployeeGridSkeleton } from '../components/employee/EmployeeGridSkeleton';
import { EmployeeDetails } from '../components/employee/EmployeeDetails';
import { useEmployees } from '../hooks/employee/useEmployees';
import { AddEmployeeForm } from '../components/employee/AddEmployeeForm';
import { ConfirmDelete } from '../components/ConfirmDelete';
import { EditEmployeeForm } from '../components/employee/EditEmployeeForm';
import { useDebouncedValue } from '../hooks/useDebouncedValue';
import { useCompanies } from '../hooks/useCompanies';
import './Dashboard.css'
import { AdminFAB } from '../components/admin/AdminFAB';
import { useAuth } from '../hooks/useAuth';
import { UsersPanel } from '../components/admin/UsersPanel';

export function Dashboard() {
    const [sidebarVisible, setSidebarVisible] = useState(true);
    const [detailsVisible, setDetailsVisible] = useState(false);
    const [addFormVisible, setAddFormVisible] = useState(false);
    const [confirmDeleteVisible, setConfirmDeleteVisible] = useState(false);
    const [editFormVisible, setEditFormVisible] = useState(false);
    const [adminFABVisible, setAdminFABVisible] = useState(true);
    const [usersPanelVisible, setUsersPanelVisible] = useState(false);

    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);

    const pageSize = 12;
    const debouncedSearch = useDebouncedValue(searchTerm, 300);
    const { data: companies = [] } = useCompanies();
    const [selectedCompanies, setSelectedCompanies] = useState<string[]>([]);
    const { data: employees, isLoading, error } = useEmployees({ search: debouncedSearch, company: selectedCompanies, page: currentPage, pageSize });

    const { user } = useAuth();

    const [selectedEmployee, setSelectedEmployee] = useState(1);
    const employeeFocused = employees?.items.find((e) => e.id === selectedEmployee);
    const totalPages = employees ? Math.ceil(employees.total / pageSize) : 1;


    // const { setSearchTerm, filteredEmployees } = useEmployeeSearch(employees ?? []);
    // const { currentPage, totalPages, paginatedItems, nextPage, prevPage, setCurrentPage } = usePagination(filteredEmployees, pageSize);


    return (
        <div className='app-wrapper'>
            <header>
                <Navbar setSideBarVisible={setSidebarVisible} setAddFormVisible={setAddFormVisible} setDetailsVisible={setDetailsVisible} onSearchChange={(value) => { setSearchTerm(value); setCurrentPage(1); }} />
            </header>

            <div className="content-row">

                <Sidebar
                    visible={sidebarVisible}
                    companies={companies}
                    selectedCompanies={selectedCompanies}
                    setSelectedCompanies={setSelectedCompanies}
                    setCurrentPage={setCurrentPage}
                    onSearchChange={(value) => { setSearchTerm(value); setCurrentPage(1); }} />


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

                {editFormVisible && employeeFocused && <EditEmployeeForm
                    id={employeeFocused.id}
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

                {confirmDeleteVisible && employeeFocused && <ConfirmDelete
                    setConfirmDeleteVisible={setConfirmDeleteVisible}
                    setDetailsVisible={setDetailsVisible}
                    id={employeeFocused.id}
                    firstName={employeeFocused.firstName}
                    lastname={employeeFocused.lastName} />}

                {adminFABVisible && (user?.role === 'admin') && <AdminFAB setUsersPanelVisible={setUsersPanelVisible} setAdminFABVisible={setAdminFABVisible}/>}
                {usersPanelVisible && (user?.role === 'admin') && <UsersPanel setAdminFABVisible={setAdminFABVisible} setUsersPanelVisible={setUsersPanelVisible}/>}

                <main className={`main-content ${!sidebarVisible ? 'full-main' : ''}`}>

                    {error ?
                        <p>Something went wrong loading employees.</p>
                        : isLoading
                            ? <EmployeeGridSkeleton count={pageSize} />
                            : <EmployeeGrid paginatedItems={employees?.items} setDetailsVisible={setDetailsVisible} selectedEmployee={detailsVisible ? selectedEmployee : null} setSelectedEmployee={setSelectedEmployee} setAddFormVisible={setAddFormVisible} />}

                    {totalPages > 1 && <div className="page-buttons">
                        <button className='prev-button' disabled={currentPage === 1} onClick={() => setCurrentPage((c) => c - 1)}>Prev</button>
                        <div className="page-text">
                            Page {currentPage} out of {totalPages}
                        </div>
                        <button className='next-button' disabled={currentPage === totalPages} onClick={() => setCurrentPage((c) => c + 1)}>Next</button>
                    </div>}
                </main>
            </div>
        </div>
    );
}

import { useState } from 'react';
import { Navbar } from '../components/Navbar';
import { Sidebar } from '../components/Sidebar';
import './Dashboard.css'
import { EmployeeCard } from '../components/EmployeeCard';
import employees from '../data/employees.json';

export function Dashboard() {
    const [visible, setVisible] = useState(true);

    return (
        <div className='app-wrapper'>
            <header>
                <Navbar setVisible={setVisible} />
            </header>

            <div className="content-row">
                <Sidebar visible={visible} />

                <main className={`main-content ${!visible ? 'full-main' : ''}`}>

                    <ul className="employee-grid">
                        {employees.map((employee) => (
                            <li key={employee.id}>
                                <EmployeeCard firstName={employee.firstName}
                                    lastName={employee.lastName}
                                    jobTitle={employee.jobTitle}
                                    company={employee.company}
                                    city={employee.city}
                                    brandColor={employee.brandColor} />
                            </li>
                        ))}
                    </ul>
                </main>
            </div>
        </div>
    );
}
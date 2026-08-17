import { Link } from 'react-router';
import './Sidebar.css'

interface SidebarProps {
    visible: boolean;
    companies: string[];
    selectedCompanies: string[];
    setSelectedCompanies: React.Dispatch<React.SetStateAction<string[]>>;
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
    onSearchChange: (value: string) => void;
}

export function Sidebar({ visible, companies, selectedCompanies, setSelectedCompanies, setCurrentPage, onSearchChange }: SidebarProps) {

    return (
        <aside className={`sidebar ${visible ? '' : 'collapsed'}`}>
            <div className="sidebar-mobile-only">
                <input
                    id='sidebar-search-bar'
                    placeholder='Search name, company, city...'
                    onChange={(e) => onSearchChange(e.target.value)}
                />
            </div>

            <div className="filter-heading">Company</div>

            <div className="filter-options">
                <ul>
                    {companies.map((company) => (
                        <li key={company}>
                            <input
                                type="checkbox"
                                id={`company-${company}`}
                                checked={selectedCompanies.includes(company)}
                                onChange={(e) => {
                                    setSelectedCompanies((prev) =>
                                        e.target.checked
                                            ? [...prev, company]
                                            : prev.filter((c) => c !== company)
                                    );
                                    setCurrentPage(1);
                                }}
                            />
                            <label htmlFor={`company-${company}`}>{company}</label>
                        </li>
                    ))}
                </ul>
            </div>

            <Link className="sidebar-logout-button" to="/login">Logout</Link>
        </aside>
    );
}


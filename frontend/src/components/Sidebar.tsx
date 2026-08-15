import './Sidebar.css'

interface SidebarProps {
    visible: boolean;
    companies: string[];
    selectedCompanies: string[];
    setSelectedCompanies: React.Dispatch<React.SetStateAction<string[]>>;
}

export function Sidebar({ visible, companies, selectedCompanies, setSelectedCompanies }: SidebarProps) {

    return (
        <aside className={`sidebar ${visible ? '' : 'collapsed'}`}>
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
                                }}
                            />
                            <label htmlFor={`company-${company}`}>{company}</label>
                        </li>
                    ))}
                </ul>
            </div>
        </aside>
    );
}


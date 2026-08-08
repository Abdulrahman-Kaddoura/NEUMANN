import './Sidebar.css'

interface SidebarProps {
    visible: boolean;
}

export function Sidebar({ visible }: SidebarProps) {
    return (
        <aside className={`sidebar ${visible ? '' : 'collapsed'}`}>
            <div className="filter-heading">Company</div>

            <div className="filter-options">
                {/* company checkboxes are populated from GET /companies once the API is wired up */}
            </div>
        </aside>
    );
}


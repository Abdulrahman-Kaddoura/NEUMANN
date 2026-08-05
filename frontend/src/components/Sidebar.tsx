import { Link } from 'react-router';
import './Sidebar.css'

interface SidebarProps {
    visible: boolean;
}

export function Sidebar({ visible }: SidebarProps) {
    return (
        <div className={`sidebar ${visible ? '' : 'collapsed'}` }>
            <div className="title">
                NEUMANN
            </div>

            <div className="sections">
                <Link className="sidebar-btn" to="">Clients</Link>
                <Link className="sidebar-btn" to="/add-client">Add Client</Link>
                <Link className="sidebar-btn logout-btn" to="/login">Logout</Link>
            </div>

        </div>
    );
}


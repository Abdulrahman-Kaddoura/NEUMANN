import { Link } from 'react-router';
import './Sidebar.css'

export function Sidebar() {
    return (
        <div className='sidebar'>
            <div className="title">
                NEUMANN
            </div>

            <div className="sections">
                <Link className="sidebar-btn" to="">Clients</Link>
                <Link className="sidebar-btn" to="">Add Client</Link>
                <Link className="sidebar-btn logout-btn" to="/login">Logout</Link>
            </div>

        </div>
    );
}


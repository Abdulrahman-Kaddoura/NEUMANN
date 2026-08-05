import { Link } from 'react-router';
import './Sidebar.css'

export function Sidebar() {
    return (
        <div className='sidebar'>
            <div className="title">
                NEUMANN
            </div>

            <div className="sections">
                <Link id="sidebar-btn" to="">Clients</Link>
                <Link id="sidebar-btn" to="">Add Client</Link>
                <Link id="sidebar-btn" to="/login">Logout</Link>
            </div>

        </div>
    );
}


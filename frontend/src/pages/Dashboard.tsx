import { Navbar } from '../components/Navbar';
import { Sidebar } from '../components/Sidebar';
import './Dashboard.css'

export function Dashboard() {
    return (
        <div className='dashboard-wrapper'>
            <Sidebar />

            <div className="main-content">
                <Navbar />

                <div className="summary">

                </div>

                <div className="clients">

                </div>
            </div>
        </div>
    );
}
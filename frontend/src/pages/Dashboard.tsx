import { Sidebar } from '../components/Sidebar';
import './Dashboard.css'

export function Dashboard() {
    return (
        <div className='dashboard-wrapper'>
            <Sidebar />

            <div className="main-content">
                hello
            </div>
        </div>
    );
}
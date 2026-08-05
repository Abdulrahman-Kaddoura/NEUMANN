import { useState } from 'react';
import { Navbar } from '../components/Navbar';
import { Sidebar } from '../components/Sidebar';
import './Dashboard.css'

export function Dashboard() {
    const [visible, setVisible] = useState(true);

    return (
        <div className='dashboard-wrapper'>
            
            <Sidebar visible={visible}/>

            <div className={`main-content ${!visible ? 'full-main' : ''}`}>
                <Navbar setVisible={setVisible}/>

                <div className="summary">

                </div>

                <div className="clients">

                </div>
            </div>
        </div>
    );
}
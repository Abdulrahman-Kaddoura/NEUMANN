import { useState } from 'react';
import { Navbar } from '../components/Navbar';
import { Sidebar } from '../components/Sidebar';
import './AddClient.css'

export function AddClient() {
    const [visible, setVisible] = useState(true);
    
    return (
        <div className='client-wrapper'>

            <Sidebar visible={visible} />

            <div className={`main-content ${!visible ? 'full-main' : ''}`}>
                <Navbar setVisible={setVisible} />

                <form className="client-form">
                    <label></label>
                </form>
            </div>
        </div>
    );
}
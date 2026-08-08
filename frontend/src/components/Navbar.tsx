import { Link } from 'react-router';
import CollapseIcon from '../assets/collapse.svg';
import './Navbar.css'

interface NavbarProps {
    setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export function Navbar({ setVisible }: NavbarProps) {
    return (
        <nav>
            <button className="collapser" onClick={() => setVisible(v => !v)}>
                <img className="collapse-icon" src={CollapseIcon} alt="Toggle filter sidebar" />
            </button>

            <div className="logo">NEUMANN</div>

            {/* <div className="search">
                <input id='search-bar' placeholder='Search name, company, city...' />
            </div> */}

            <Link className="logout-button" to="/login">Logout</Link>
        </nav>
    );
}
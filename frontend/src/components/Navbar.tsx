import { Link } from 'react-router';
import CollapseIcon from '../assets/collapse.svg';
import './Navbar.css'

interface NavbarProps {
    setVisible: React.Dispatch<React.SetStateAction<boolean>>;
    onSearchChange: (value: string) => void;
}

export function Navbar({ setVisible, onSearchChange }: NavbarProps) {
    return (
        <nav>
            <button className="collapser" onClick={() => setVisible(v => !v)}>
                <img className="collapse-icon" src={CollapseIcon} alt="Toggle filter sidebar" />
            </button>

            <div className="logo">NEUMANN</div>

            <div className="search">
                <input
                    id='search-bar'
                    placeholder='Search name, company, city...'
                    onChange={(e) => onSearchChange(e.target.value)}
                />
            </div>

            <Link className="logout-button" to="/login">Logout</Link>
        </nav>
    );
}
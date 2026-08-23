import { useNavigate } from 'react-router';
import CollapseIcon from '../assets/collapse.svg';
import { useAuth } from '../hooks/useAuth';
import './Navbar.css'

interface NavbarProps {
    setSideBarVisible: React.Dispatch<React.SetStateAction<boolean>>;
    setAddFormVisible: React.Dispatch<React.SetStateAction<boolean>>;
    setDetailsVisible: React.Dispatch<React.SetStateAction<boolean>>;
    onSearchChange: (value: string) => void;
}

export function Navbar({ setSideBarVisible, setAddFormVisible, setDetailsVisible, onSearchChange }: NavbarProps) {
    const { logout, user } = useAuth();
    const navigate = useNavigate();

    function handleLogout() {
        logout();
        navigate('/login');
    }

    return (
        <nav>
            <button className="collapser" onClick={() => setSideBarVisible(v => !v)}>
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

            <div className="nav-actions">
                {user?.role === 'editor' && (
                    <button className="add-button" onClick={() => { setAddFormVisible(true); setDetailsVisible(false); }}>
                        <span className="add-icon">+</span> Add
                    </button>
                )}

                <button className="logout-button" onClick={handleLogout}>Logout</button>
            </div>
        </nav>
    );
}
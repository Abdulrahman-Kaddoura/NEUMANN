import { useNavigate } from 'react-router';
import SunIcon from '../assets/sun.svg';
import MoonIcon from '../assets/moon.svg';
import { useAuth } from '../hooks/useAuth';
import { useTheme } from '../hooks/useTheme';
import './Navbar.css'

interface NavbarProps {
    setSideBarVisible: React.Dispatch<React.SetStateAction<boolean>>;
    setAddFormVisible: React.Dispatch<React.SetStateAction<boolean>>;
    setDetailsVisible: React.Dispatch<React.SetStateAction<boolean>>;
    onSearchChange: (value: string) => void;
}

export function Navbar({ setSideBarVisible, setAddFormVisible, setDetailsVisible, onSearchChange }: NavbarProps) {
    const { logout, user } = useAuth();
    const { theme, toggleTheme } = useTheme();
    const navigate = useNavigate();

    function handleLogout() {
        logout();
        navigate('/login');
    }

    return (
        <nav>
            <button className="collapser" onClick={() => setSideBarVisible(v => !v)} aria-label="Toggle filter sidebar">
                <svg
                    className="collapse-icon"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <line x1="3" y1="6" x2="21" y2="6" />
                    <line x1="3" y1="12" x2="21" y2="12" />
                    <line x1="3" y1="18" x2="21" y2="18" />
                </svg>
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
                <p>Welcome {user?.fullName}</p>
                <button
                    className="theme-toggle"
                    onClick={toggleTheme}
                    aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
                    title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
                >
                    <img
                        className="theme-toggle-icon"
                        src={theme === 'dark' ? SunIcon : MoonIcon}
                        alt=""
                    />
                </button>

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
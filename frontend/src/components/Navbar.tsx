import CollapseIcon from '../assets/collapse.svg';
import PfpIcon from '../assets/pfp.svg';
import './Navbar.css'

interface NavbarProps {
    setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export function Navbar({ setVisible }: NavbarProps) {
    return (
        <nav>
            <button className="collapser" onClick={() => setVisible(v => !v)}>
                <img className="collapse-icon" src={CollapseIcon} alt="Collapse sidebar" />
            </button>

            <div className="search">
                <input id='search-bar' placeholder='Search'/>
            </div>

            <div className="pfp">
                <img className="pfp-icon" src={PfpIcon} alt="User profile" />
            </div>
        </nav>
    );
}
import UsersIcon from '../../assets/users.svg'
import './AdminFAB.css'

interface AdminFABProps {
    setAdminFABVisible: React.Dispatch<React.SetStateAction<boolean>>;
    setUsersPanelVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export function AdminFAB({ setAdminFABVisible, setUsersPanelVisible }: AdminFABProps) {
    return (
        <button
            className='floating-action-button'
            onClick={() => {setAdminFABVisible(false); setUsersPanelVisible(true)}}
        >
            <img src={UsersIcon} className='FAB-icon' alt="View all users" />
        </button>
    );
}
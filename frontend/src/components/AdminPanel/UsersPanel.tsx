import './UsersPanel.css'

interface UsersPanelProps {
    setAdminFABVisible: React.Dispatch<React.SetStateAction<boolean>>;
    setUsersPanelVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export function UsersPanel({ setAdminFABVisible, setUsersPanelVisible }: UsersPanelProps) {
    return (
        <div className='users-panel'>
            <button type='button' onClick={() => {setAdminFABVisible(true); setUsersPanelVisible(false)}}>×</button>
        </div>
    );
}

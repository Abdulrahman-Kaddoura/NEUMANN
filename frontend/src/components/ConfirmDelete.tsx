import './ConfirmDelete.css';

interface ConfirmDeleteProps {
    setConfirmDeleteVisible: React.Dispatch<React.SetStateAction<boolean>>;
    setDetailsVisible: React.Dispatch<React.SetStateAction<boolean>>;
    firstName: string;
    lastname: string;
}


export function ConfirmDelete({ setConfirmDeleteVisible, setDetailsVisible, firstName, lastname }: ConfirmDeleteProps) {

    return (
        <div className="modal">
            <div className="form-card">
                <form>
                    <h2 className="form-title">Delete {firstName} {lastname}?</h2>
                    <div className="action-buttons">
                        <button type='button' id='delete-button' onClick={() => { setConfirmDeleteVisible(false); setDetailsVisible(false); }}>Delete</button>
                        <button type='button' id='cancel-button' onClick={() => setConfirmDeleteVisible(false)}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

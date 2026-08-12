import './ConfirmDelete.css';

interface ConfirmDeleteProps {
    setConfirmDeleteVisible: React.Dispatch<React.SetStateAction<boolean>>;
}


export function ConfirmDelete({ setConfirmDeleteVisible }: ConfirmDeleteProps) {

    return (
        <div className="modal">
            <div className="form-card">
                <form>
                    <h2 className="form-title">Delete?</h2>
                    <div className="action-buttons">
                        <button type='submit' id='delete-button'>Delete</button>
                        <button type='button' id='cancel-button' onClick={() => setConfirmDeleteVisible(false)}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

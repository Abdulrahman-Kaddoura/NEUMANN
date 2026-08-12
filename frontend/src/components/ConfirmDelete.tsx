import './ConfirmDelete.css';


export function ConfirmDelete() {

    // const [error, setError] = useState("");

    return (
        <div className="modal">
            <div className="form-card">
                <form>
                    <h2 className="form-title">Delete?</h2>
                    {/* {error && <p className="form-error">{error}</p>} */}

                    <div className="action-buttons">
                        <button type='submit' id='delete-button'>Delete</button>
                        <button type='button' id='cancel-button'>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

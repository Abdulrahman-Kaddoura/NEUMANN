import { useState } from 'react';
import './form.css';


export function ConfirmDelete({ itemLabel, }: ConfirmDeleteProps) {

    // const [error, setError] = useState("");

    return (
        <div className="modal">
            <div className="form-card">
                <form>
                    <h2 className="form-title">Delete {itemLabel}?</h2>
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

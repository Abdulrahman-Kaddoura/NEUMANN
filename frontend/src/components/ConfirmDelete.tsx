import { useEffect, useRef } from 'react';
import { useDeleteEmployee } from '../hooks/employee/useDeleteEmployee';
import { useFocusTrap } from '../hooks/useFocusTrap';
import './ConfirmDelete.css';

interface ConfirmDeleteProps {
    setConfirmDeleteVisible: React.Dispatch<React.SetStateAction<boolean>>;
    setDetailsVisible: React.Dispatch<React.SetStateAction<boolean>>;
    id: number;
    firstName: string;
    lastname: string;
}


export function ConfirmDelete({ setConfirmDeleteVisible, setDetailsVisible, id, firstName, lastname }: ConfirmDeleteProps) {

    const { mutate, isSuccess, isPending, isError, error } = useDeleteEmployee();

    const panelRef = useRef<HTMLDivElement>(null);
    useFocusTrap(panelRef, true);

    useEffect(() => {
        function handleKeyDown(e: KeyboardEvent) {
            if (e.key === 'Escape') {
                setConfirmDeleteVisible(false);
            }
        }

        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [setConfirmDeleteVisible]);

    return (
        <div ref={panelRef} className="modal" role="dialog" aria-modal="true" aria-labelledby="confirm-delete-heading">
            <div className="form-card">
                <form onSubmit={(e) => {
                    e.preventDefault(); mutate(id, {
                        onSuccess: () => {
                            setTimeout(() => {setConfirmDeleteVisible(false); setDetailsVisible(false)}, 1200);
                        }
                    })
                }}>
                    <h2 id="confirm-delete-heading" className="form-title">Delete {firstName} {lastname}?</h2>

                    {isSuccess && <div className='form-group'>
                        <p className='success-message'>Employee deleted!</p>
                    </div>}

                    {isError && <div className='form-group'>
                        <p className='error-message'>Failed to delete{error ? `: ${error.message}` : ''}</p>
                    </div>}

                    <div className="action-buttons">
                        <button type='submit' id='delete-button' disabled={isPending}>Delete</button>
                        <button type='button' id='cancel-button' disabled={isPending} onClick={() => setConfirmDeleteVisible(false)}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

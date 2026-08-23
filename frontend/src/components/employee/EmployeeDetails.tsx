import { useEffect, useRef } from 'react';
import { useFocusTrap } from '../../hooks/useFocusTrap';
import './EmployeeDetails.css'

interface EmployeeDetailsProps {
    firstName: string,
    lastName: string,
    jobTitle: string,
    company: string,
    address: string,
    city: string,
    county: string,
    email?: string,
    brandColor: string,
    detailsVisible: boolean,
    setDetailsVisible: React.Dispatch<React.SetStateAction<boolean>>;
    setConfirmDeleteVisible: React.Dispatch<React.SetStateAction<boolean>>;
    setEditFormVisible: React.Dispatch<React.SetStateAction<boolean>>;
}
export function EmployeeDetails(
    { firstName,
        lastName,
        jobTitle,
        company,
        address,
        city,
        county,
        email,
        brandColor,
        detailsVisible,
        setDetailsVisible,
        setConfirmDeleteVisible,
        setEditFormVisible,

    }: EmployeeDetailsProps) {

    const panelRef = useRef<HTMLElement | null>(null);
    useFocusTrap(panelRef, detailsVisible);

    useEffect(() => {
        function handleKeyDown(e: KeyboardEvent) {
            if (e.key === 'Escape' && detailsVisible) {
                setDetailsVisible(false);
            }
        }

        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [detailsVisible, setDetailsVisible]);

    return (
        <>
            <div className={`panel-backdrop ${detailsVisible ? 'panel-backdrop-visible' : ''}`} onClick={() => setDetailsVisible(false)} />
            <aside
                ref={panelRef}
                className={`details-wrapper ${!detailsVisible ? 'invisible-details' : ''}`}
                role="dialog"
                aria-modal="true"
                aria-labelledby="employee-details-heading"
            >
                <div className='details-header' style={{ '--brand': brandColor } as React.CSSProperties}>
                    <button className='details-close-btn' onClick={() => { setDetailsVisible(false); setConfirmDeleteVisible(false) }}>×</button>
                    <div className='details-avatar'>
                        {firstName[0]}{lastName[0]}
                    </div>
                    <div id="employee-details-heading" className='details-name'>
                        {firstName} {lastName}
                    </div>
                </div>

                <div className='details-fields'>
                    <div className='details-field'>
                        <div className='details-label'>Job title</div>
                        <div className='details-value'>{jobTitle}</div>
                    </div>

                    <div className='details-field'>
                        <div className='details-label'>Company</div>
                        <div className='details-value'>{company}</div>
                    </div>

                    <div className='details-field'>
                        <div className='details-label'>Address</div>
                        <div className='details-value'>{address}</div>
                    </div>

                    <div className='details-field'>
                        <div className='details-label'>City</div>
                        <div className='details-value'>{city}</div>
                    </div>

                    <div className='details-field'>
                        <div className='details-label'>County</div>
                        <div className='details-value'>{county}</div>
                    </div>

                    <div className='details-field'>
                        <div className='details-label'>Email</div>
                        <div className='details-value'>{email ?? '—'}</div>
                    </div>
                </div>

                <div className='details-actions'>
                    <button type='button' className='details-edit-btn' onClick={() => { setEditFormVisible(true); setDetailsVisible(false) }}>Edit</button>
                    <button type='button' className='details-delete-btn' onClick={() => setConfirmDeleteVisible(true)}>Delete</button>
                </div>
            </aside>
        </>
    );
}
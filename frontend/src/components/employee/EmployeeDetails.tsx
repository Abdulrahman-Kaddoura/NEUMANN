import './EmployeeDetails.css'

interface EmployeeDetailsProps {
    firstName: string,
    lastName: string,
    jobTitle: string,
    company: string,
    city: string,
    email?: string,
    brandColor: string,
    detailsVisible: boolean,
    setDetailsVisible: React.Dispatch<React.SetStateAction<boolean>>;
}
export function EmployeeDetails(
    { firstName,
        lastName,
        jobTitle,
        company,
        city,
        email,
        brandColor,
        detailsVisible,
        setDetailsVisible
    }: EmployeeDetailsProps) {
    return (
        <aside className={`details-wrapper ${!detailsVisible ? 'invisible-details' : ''}`}>
            <div className='details-header' style={{ '--brand': brandColor } as React.CSSProperties}>
                <button className='details-close-btn' onClick={() => setDetailsVisible(false)}>×</button>
                <div className='details-avatar'>
                    {firstName[0]}{lastName[0]}
                </div>
                <div className='details-name'>{firstName} {lastName}</div>
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
                    <div className='details-label'>City</div>
                    <div className='details-value'>{city}</div>
                </div>

                <div className='details-field'>
                    <div className='details-label'>Email</div>
                    <div className='details-value'>{email}</div>
                </div>
            </div>

            <div className='details-actions'>
                <div className='details-edit-btn'>Edit</div>
                <div className='details-delete-btn'>Delete</div>
            </div>
        </aside >
    );
}
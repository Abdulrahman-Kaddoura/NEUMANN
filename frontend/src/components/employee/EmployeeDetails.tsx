import './EmployeeDetails.css'

interface EmployeeDetailsProps {
    firstName: string,
    lastName: string,
    jobTitle: string,
    company: string,
    city: string,
    county: string,
    email?: string,
    brandColor: string
}
export function EmployeeDetails(
    { firstName,
        lastName,
        jobTitle,
        company,
        city,
        county,
        email,
        brandColor,
    }: EmployeeDetailsProps) {
    return (
        <div className='details-wrapper'>
            <div className='details-header'>
                <div className='details-avatar' style={{ '--brand': brandColor } as React.CSSProperties}>
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
                    <div className='details-label'>County</div>
                    <div className='details-value'>{county}</div>
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
        </div >
    );
}
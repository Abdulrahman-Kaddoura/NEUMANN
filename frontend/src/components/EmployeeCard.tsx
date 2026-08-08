import './EmployeeCard.css'

interface EmployeeCardProps {
    firstName: string,
    lastName: string,
    jobTitle: string,
    company: string,
    city: string,
    brandColor: string
}

export function EmployeeCard({ firstName, lastName, jobTitle, company, city, brandColor }: EmployeeCardProps) {
    return (
        <div className='card-wrapper' style={{ '--brand': brandColor } as React.CSSProperties}>
            <div className='card-pfp-initials'>
                {firstName[0]}{lastName[0]}
            </div>

            <div className='card-text'>
                <div className='card-name'>{firstName} {lastName}</div>
                <div className='card-title'>{jobTitle}</div>
                <div className='card-meta'>{company} · {city}</div>
            </div>
        </div>
    );
}

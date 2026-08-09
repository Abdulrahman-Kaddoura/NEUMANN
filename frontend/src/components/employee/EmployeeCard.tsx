import './EmployeeCard.css'

interface EmployeeCardProps {
    employeeId: number,
    firstName: string,
    lastName: string,
    jobTitle: string,
    company: string,
    city: string,
    brandColor: string
    setDetailsVisible: React.Dispatch<React.SetStateAction<boolean>>;
    setSelectedEmployee: React.Dispatch<React.SetStateAction<number>>;
}

export function EmployeeCard({
    employeeId, firstName, lastName, jobTitle, company, city, brandColor, setDetailsVisible, setSelectedEmployee
}: EmployeeCardProps) {
    return (
        <div
            className='card-wrapper'
            style={{ '--brand': brandColor } as React.CSSProperties}
            onClick={() => {
                setDetailsVisible(true);
                setSelectedEmployee(employeeId);
            }}>
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

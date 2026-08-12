import './EmployeeCard.css'

interface EmployeeCardProps {
    employeeId: number,
    firstName: string,
    lastName: string,
    jobTitle: string,
    company: string,
    city: string,
    brandColor: string,
    isSelected: boolean,
    setDetailsVisible: React.Dispatch<React.SetStateAction<boolean>>;
    setSelectedEmployee: React.Dispatch<React.SetStateAction<number>>;
    setAddFormVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export function EmployeeCard({
    employeeId, firstName, lastName, jobTitle, company, city, brandColor, isSelected, setDetailsVisible, setSelectedEmployee, setAddFormVisible
}: EmployeeCardProps) {
    return (
        <div
            className={`card-wrapper ${isSelected ? 'card-selected' : ''}`}
            style={{ '--brand': brandColor } as React.CSSProperties}
            onClick={() => {
                setDetailsVisible(true);
                setSelectedEmployee(employeeId);
                setAddFormVisible(false);
            }}>
            <div className='card-body'>
                <div className='card-pfp-initials'>
                    {firstName[0]}{lastName[0]}
                </div>

                <div className='card-text'>
                    <div className='card-name'>{firstName} {lastName}</div>
                    <div className='card-title'>{jobTitle}</div>
                    <div className='card-meta'>{company} · {city}</div>
                </div>
            </div>

            <div className='card-bar' />
        </div>
    );
}

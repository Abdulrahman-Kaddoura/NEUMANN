import { resolvePhotoUrl } from '../../api/client';
import './EmployeeCard.css'

interface EmployeeCardProps {
    employeeId: number,
    firstName: string,
    lastName: string,
    jobTitle: string,
    company: string,
    city: string,
    brandColor: string,
    photoUrl: string | null,
    isSelected: boolean,
    setDetailsVisible: React.Dispatch<React.SetStateAction<boolean>>;
    setSelectedEmployee: React.Dispatch<React.SetStateAction<number>>;
    setAddFormVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export function EmployeeCard({
    employeeId, firstName, lastName, jobTitle, company, city, brandColor, photoUrl, isSelected, setDetailsVisible, setSelectedEmployee, setAddFormVisible
}: EmployeeCardProps) {
    const openDetails = () => {
        setDetailsVisible(true);
        setSelectedEmployee(employeeId);
        setAddFormVisible(false);
    };

    return (
        <div
            className={`card-wrapper ${isSelected ? 'card-selected' : ''}`}
            style={{ '--brand': brandColor } as React.CSSProperties}
            role='button'
            tabIndex={0}
            onClick={openDetails}
            onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    openDetails();
                }
            }}>
            <div className='card-body'>
                {photoUrl ? (
                    <img className='card-pfp-photo' src={resolvePhotoUrl(photoUrl)} alt='' />
                ) : (
                    <div className='card-pfp-initials'>
                        {firstName[0]}{lastName[0]}
                    </div>
                )}

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

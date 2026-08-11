import './EmployeeCard.css'
import './EmployeeCardSkeleton.css'

export function EmployeeCardSkeleton() {
    return (
        <div className='card-wrapper skeleton-card'>
            <div className='card-body'>
                <div className='card-pfp-initials skeleton-block' />

                <div className='card-text'>
                    <div className='skeleton-block skeleton-line skeleton-name' />
                    <div className='skeleton-block skeleton-line skeleton-title' />
                    <div className='skeleton-block skeleton-line skeleton-meta' />
                </div>
            </div>

            <div className='card-bar skeleton-block' />
        </div>
    );
}

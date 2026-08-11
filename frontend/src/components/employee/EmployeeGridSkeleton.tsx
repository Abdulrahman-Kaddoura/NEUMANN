import { EmployeeCardSkeleton } from './EmployeeCardSkeleton';
import './EmployeeGrid.css'

interface EmployeeGridSkeletonProps {
    count: number;
}

export function EmployeeGridSkeleton({ count }: EmployeeGridSkeletonProps) {
    const skeletons = [];

    for (let i = 0; i < count; i++) {
        skeletons.push(
            <EmployeeCardSkeleton key={i} />
        );
    }

    return (
        <ul className="employee-grid">
            {skeletons}
        </ul>
    );
}

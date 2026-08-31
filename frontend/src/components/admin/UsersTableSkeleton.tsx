import './UsersTable.css'
import './UsersTableSkeleton.css'

const SKELETON_ROWS = 5;

export function UsersTableSkeleton() {
    return (
        <table className='users-table'>
            <colgroup>
                <col style={{ width: '30%' }} />
                <col style={{ width: '15%' }} />
                <col style={{ width: '55%' }} />
            </colgroup>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Role</th>
                    <th>Email</th>
                </tr>
            </thead>
            <tbody>
                {Array.from({ length: SKELETON_ROWS }).map((_, i) => (
                    <tr key={i}>
                        <td><div className='skeleton-block skeleton-line skeleton-name' /></td>
                        <td><div className='skeleton-block skeleton-line skeleton-role' /></td>
                        <td><div className='skeleton-block skeleton-line skeleton-email' /></td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

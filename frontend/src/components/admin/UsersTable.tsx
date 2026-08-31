import { useUsers } from '../../hooks/useUsers';
import { UsersTableSkeleton } from './UsersTableSkeleton';
import './UsersTable.css'


export function UsersTable() {
    const { data: users, isLoading, error } = useUsers();

    if (isLoading) return <UsersTableSkeleton />;
    if (error) return <p>Failed to load users: {error.message}</p>;

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
                {users?.items.map((user) => (
                    <tr key={user.id}>
                        <td>{user.fullName}</td>
                        <td><span className={`role-badge ${user.role}`}>{user.role}</span></td>
                        <td>{user.email}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}
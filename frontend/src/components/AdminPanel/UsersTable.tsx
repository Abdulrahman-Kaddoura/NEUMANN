import { useUsers } from '../../hooks/useUsers';
import { UsersTableSkeleton } from './UsersTableSkeleton';
import './UsersTable.css'


export function UsersTable() {
    const { data: users, isLoading, error } = useUsers();

    if (isLoading) return <UsersTableSkeleton />;
    if (error) return <p>Failed to load users: {error.message}</p>;

    return (
        <table className='users-table'>
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
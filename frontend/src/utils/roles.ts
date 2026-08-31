export function canManageEmployees(role: string | undefined | null): boolean {
    return role === 'editor' || role === 'admin';
}

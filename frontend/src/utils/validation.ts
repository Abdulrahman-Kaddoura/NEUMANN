export function isBlank(value: string | undefined | null): boolean {
    return !value || value.trim().length === 0;
}

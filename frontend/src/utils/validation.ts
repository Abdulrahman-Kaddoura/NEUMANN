export function isBlank(value: string | undefined | null): boolean {
    return !value || value.trim().length === 0;
}

export function isValidEmail(value: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

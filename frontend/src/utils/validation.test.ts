import { describe, expect, it } from 'vitest';
import { isBlank, isValidEmail } from './validation';

describe('isBlank', () => {
    it('returns true for undefined', () => {
        expect(isBlank(undefined)).toBe(true);
    });

    it('returns true for null', () => {
        expect(isBlank(null)).toBe(true);
    });

    it('returns true for empty string', () => {
        expect(isBlank('')).toBe(true);
    });

    it('returns true for whitespace-only string', () => {
        expect(isBlank('   ')).toBe(true);
    });

    it('returns false for a non-blank string', () => {
        expect(isBlank('a')).toBe(false);
    });

    it('returns false for a string with surrounding whitespace but real content', () => {
        expect(isBlank('  a  ')).toBe(false);
    });
});

describe('isValidEmail', () => {
    it('accepts a standard email', () => {
        expect(isValidEmail('jane@neumann.io')).toBe(true);
    });

    it('accepts an email with a subdomain', () => {
        expect(isValidEmail('jane@mail.neumann.io')).toBe(true);
    });

    it('rejects a string with no @', () => {
        expect(isValidEmail('janeneumann.io')).toBe(false);
    });

    it('rejects a string with no domain dot', () => {
        expect(isValidEmail('jane@neumann')).toBe(false);
    });

    it('rejects a string containing spaces', () => {
        expect(isValidEmail('jane doe@neumann.io')).toBe(false);
    });

    it('rejects an empty string', () => {
        expect(isValidEmail('')).toBe(false);
    });
});

import { renderHook, waitFor, act } from '@testing-library/react';
import { http, HttpResponse } from 'msw';
import { beforeEach, describe, expect, it } from 'vitest';
import { AuthProvider } from './AuthProvider';
import { useAuth } from '../hooks/useAuth';
import { server } from '../test/mocks/server';
import { mockUser } from '../test/mocks/fixtures';

beforeEach(() => {
    localStorage.clear();
});

function setup() {
    return renderHook(() => useAuth(), { wrapper: AuthProvider });
}

describe('AuthProvider', () => {
    it('starts loading with no user when there is no stored token', async () => {
        const { result } = setup();

        await waitFor(() => expect(result.current.isLoading).toBe(false));

        expect(result.current.user).toBeNull();
        expect(result.current.token).toBeNull();
    });

    it('restores the session when a valid token is already stored', async () => {
        localStorage.setItem('token', 'fake-access-token');

        const { result } = setup();

        await waitFor(() => expect(result.current.isLoading).toBe(false));

        expect(result.current.user).toEqual(mockUser);
        expect(result.current.token).toBe('fake-access-token');
    });

    it('clears the session when the stored token is rejected by /auth/me', async () => {
        server.use(
            http.get('*/auth/me', () => new HttpResponse(null, { status: 401 }))
        );
        localStorage.setItem('token', 'stale-token');

        const { result } = setup();

        await waitFor(() => expect(result.current.isLoading).toBe(false));

        expect(result.current.user).toBeNull();
        expect(result.current.token).toBeNull();
        expect(localStorage.getItem('token')).toBeNull();
    });

    it('login stores the token and populates the user on success', async () => {
        const { result } = setup();
        await waitFor(() => expect(result.current.isLoading).toBe(false));

        await act(async () => {
            await result.current.login('jane@neumann.io', 'password123');
        });

        expect(result.current.user).toEqual(mockUser);
        expect(result.current.token).toBe('fake-access-token');
        expect(localStorage.getItem('token')).toBe('fake-access-token');
    });

    it('login throws and leaves state cleared on invalid credentials', async () => {
        const { result } = setup();
        await waitFor(() => expect(result.current.isLoading).toBe(false));

        await expect(
            act(async () => {
                await result.current.login('jane@neumann.io', 'wrong-password');
            })
        ).rejects.toBeTruthy();

        expect(result.current.user).toBeNull();
        expect(result.current.token).toBeNull();
        expect(localStorage.getItem('token')).toBeNull();
    });

    it('logout clears token, user, and localStorage', async () => {
        localStorage.setItem('token', 'fake-access-token');

        const { result } = setup();
        await waitFor(() => expect(result.current.isLoading).toBe(false));
        expect(result.current.user).toEqual(mockUser);

        act(() => {
            result.current.logout();
        });

        expect(result.current.user).toBeNull();
        expect(result.current.token).toBeNull();
        expect(localStorage.getItem('token')).toBeNull();
    });
});

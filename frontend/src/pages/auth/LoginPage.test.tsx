import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MemoryRouter, Routes, Route } from 'react-router';
import { beforeEach, describe, expect, it } from 'vitest';
import { LoginPage } from './LoginPage';
import { AuthProvider } from '../../context/AuthProvider';

function renderLoginPage() {
    const queryClient = new QueryClient({
        defaultOptions: { queries: { retry: false } },
    });

    return render(
        <QueryClientProvider client={queryClient}>
            <MemoryRouter initialEntries={['/login']}>
                <AuthProvider>
                    <Routes>
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/" element={<p>Dashboard Home</p>} />
                    </Routes>
                </AuthProvider>
            </MemoryRouter>
        </QueryClientProvider>
    );
}

beforeEach(() => {
    localStorage.clear();
});

describe('LoginPage', () => {
    it('logs in with valid credentials and redirects to /', async () => {
        const user = userEvent.setup();
        renderLoginPage();

        await user.type(screen.getByLabelText('Email'), 'jane@neumann.io');
        await user.type(screen.getByLabelText('Password'), 'password123');
        await user.click(screen.getByRole('button', { name: 'Login' }));

        expect(await screen.findByText('Dashboard Home')).toBeInTheDocument();
    });

    it('shows an inline error and does not navigate on invalid credentials', async () => {
        const user = userEvent.setup();
        renderLoginPage();

        await user.type(screen.getByLabelText('Email'), 'jane@neumann.io');
        await user.type(screen.getByLabelText('Password'), 'wrong-password');
        await user.click(screen.getByRole('button', { name: 'Login' }));

        expect(await screen.findByRole('alert')).toHaveTextContent(
            'Invalid email or password.'
        );
        expect(screen.queryByText('Dashboard Home')).not.toBeInTheDocument();
    });
});

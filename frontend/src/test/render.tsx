import type { ReactElement } from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MemoryRouter } from 'react-router';
import { AuthProvider } from '../context/AuthProvider';
import { ThemeProvider } from '../context/ThemeProvider';

type RenderOptions = {
    route?: string;
};

export function renderWithProviders(
    ui: ReactElement,
    { route = '/' }: RenderOptions = {}
) {
    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                retry: false,
            },
        },
    });

    const user = userEvent.setup();

    const result = render(
        <QueryClientProvider client={queryClient}>
            <MemoryRouter initialEntries={[route]}>
                <AuthProvider>
                    <ThemeProvider>
                        {ui}
                    </ThemeProvider>
                </AuthProvider>
            </MemoryRouter>
        </QueryClientProvider>
    );

    return {
        ...result,
        queryClient,
        user,
    };
}
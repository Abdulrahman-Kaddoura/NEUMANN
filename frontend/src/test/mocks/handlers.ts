import { http, HttpResponse } from 'msw';
import { mockEmployeePage, mockEmployees, mockUser } from './fixtures';

export const handlers = [
    http.post('*/auth/login', async ({ request }) => {
        const body = await request.json() as {
            email: string;
            password: string;
        };

        if (
            body.email === 'jane@neumann.io' &&
            body.password === 'password123'
        ) {
            return HttpResponse.json({
                accessToken: 'fake-access-token',
                tokenType: 'bearer',
            });
        }

        return new HttpResponse(null, {
            status: 401,
        });
    }),

    http.get('*/auth/me', ({ request }) => {
        const authorization = request.headers.get('Authorization');

        if (!authorization) {
            return new HttpResponse(null, {
                status: 401,
            });
        }

        return HttpResponse.json(mockUser);
    }),

    http.post('*/auth/register', () => {
        return HttpResponse.json({
            accessToken: 'fake-access-token',
            tokenType: 'bearer',
        });
    }),

    http.get('*/employees', () => {
        return HttpResponse.json(mockEmployeePage());
    }),

    http.get('*/companies', () => {
        const companies = [...new Set(
            mockEmployees.map((employee) => employee.company)
        )];

        return HttpResponse.json(companies);
    }),

    http.post('*/employees', async ({ request }) => {
        const body = await request.json() as Record<string, unknown>;

        return HttpResponse.json(
            {
                id: 999,
                ...body,
            },
            { status: 201 }
        );
    }),

    http.put('*/employees/:id', () => {
        return new HttpResponse(null, {
            status: 200,
        });
    }),

    http.delete('*/employees/:id', () => {
        return new HttpResponse(null, {
            status: 204,
        });
    }),
];
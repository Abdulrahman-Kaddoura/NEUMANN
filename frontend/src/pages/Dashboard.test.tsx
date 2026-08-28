import { screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it } from 'vitest';
import { Dashboard } from './Dashboard';
import { renderWithProviders } from '../test/render';

beforeEach(() => {
    localStorage.setItem('token', 'fake-access-token');
});

describe('Dashboard employee flows', () => {
    it('adds an employee through the add form', async () => {
        const user = userEvent.setup();
        renderWithProviders(<Dashboard />);

        const addButton = await screen.findByRole('button', { name: '+ Add' });
        await user.click(addButton);

        const dialog = screen.getByRole('dialog', { name: 'Add Employee' });

        await user.type(within(dialog).getByLabelText('First Name'), 'New');
        await user.type(within(dialog).getByLabelText('Last Name'), 'Hire');
        await user.selectOptions(within(dialog).getByLabelText('Company'), 'Benton');
        await user.type(within(dialog).getByLabelText('Job Title'), 'Intern');
        await user.type(within(dialog).getByLabelText('Address'), '1 New St');
        await user.type(within(dialog).getByLabelText('City'), 'Beirut');
        await user.type(within(dialog).getByLabelText('County'), 'Beirut');

        await user.click(within(dialog).getByRole('button', { name: 'Create' }));

        expect(
            await within(dialog).findByText('Employee Created!', {}, { timeout: 3000 })
        ).toBeInTheDocument();

        await waitFor(
            () => expect(screen.queryByRole('dialog', { name: 'Add Employee' })).not.toBeInTheDocument(),
            { timeout: 3000 }
        );
    }, 10000);

    it('edits an employee through the details panel', async () => {
        const user = userEvent.setup();
        renderWithProviders(<Dashboard />);

        const card = await screen.findByRole(
            'button',
            { name: /Jane Neumann/ },
            { timeout: 3000 }
        );
        await user.click(card);

        const detailsDialog = screen.getByRole('dialog', { name: 'Jane Neumann' });
        await user.click(within(detailsDialog).getByRole('button', { name: 'Edit' }));

        const editDialog = screen.getByRole('dialog', { name: 'Edit Employee Details' });

        expect(within(editDialog).getByLabelText('First Name')).toHaveValue('Jane');
        expect(within(editDialog).getByLabelText('Last Name')).toHaveValue('Neumann');

        const jobTitleInput = within(editDialog).getByLabelText('Job Title');
        await user.clear(jobTitleInput);
        await user.type(jobTitleInput, 'Staff Engineer');

        await user.click(within(editDialog).getByRole('button', { name: 'Submit' }));

        expect(
            await within(editDialog).findByText('Employee Edited!', {}, { timeout: 3000 })
        ).toBeInTheDocument();
    }, 10000);

    it('deletes an employee through the confirm dialog', async () => {
        const user = userEvent.setup();
        renderWithProviders(<Dashboard />);

        const card = await screen.findByRole(
            'button',
            { name: /Jane Neumann/ },
            { timeout: 3000 }
        );
        await user.click(card);

        const detailsDialog = screen.getByRole('dialog', { name: 'Jane Neumann' });
        await user.click(within(detailsDialog).getByRole('button', { name: 'Delete' }));

        const confirmDialog = screen.getByRole('dialog', { name: 'Delete Jane Neumann?' });
        await user.click(within(confirmDialog).getByRole('button', { name: 'Delete' }));

        expect(
            await within(confirmDialog).findByText('Employee deleted!', {}, { timeout: 3000 })
        ).toBeInTheDocument();

        await waitFor(
            () => expect(screen.queryByRole('dialog', { name: 'Delete Jane Neumann?' })).not.toBeInTheDocument(),
            { timeout: 3000 }
        );
    }, 10000);
});

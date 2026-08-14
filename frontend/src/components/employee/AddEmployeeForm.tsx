import { useState } from 'react';
import './AddEmployeeForm.css'
import { useCreateEmployee } from '../../hooks/useCreateEmployee';

interface AddEmployeeFormProps {
    setAddFormVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export function AddEmployeeForm({ setAddFormVisible }: AddEmployeeFormProps) {

    const [form, setForm] = useState({
        firstName: '',
        lastName: '',
        company: '',
        jobTitle: '',
        email: '',
        address: '',
        city: '',
        county: ''
    });

    const { mutate, isPending, isSuccess, isError, error } = useCreateEmployee();

    return (
        <aside className='add-form-wrapper'>
            <form className='add-form' onSubmit={(e) => {
                e.preventDefault();
                mutate({ ...form, email: form.email || null }, {
                    onSuccess: () => {
                        setTimeout(() => setAddFormVisible(false), 1200);
                    },
                });
            }}>

                <div className='add-form-header'>
                    <h1>Add Employee</h1>
                    <p>Fill in the details below to add a new employee.</p>
                </div>

                <div className='add-form-fields'>
                    <div className='form-group'>
                        <label htmlFor='first-name'>First Name</label>
                        <input className='form-input' value={form.firstName} onChange={(e) => { setForm((f) => ({ ...f, firstName: e.target.value })) }} required id='first-name' placeholder='Enter First Name' />
                    </div>

                    <div className='form-group'>
                        <label htmlFor='last-name'>Last Name</label>
                        <input className='form-input' value={form.lastName} onChange={(e) => { setForm((f) => ({ ...f, lastName: e.target.value })) }} required id='last-name' placeholder='Enter Last Name' />
                    </div>

                    <div className='form-group'>
                        <label htmlFor='company'>Company</label>
                        <select className='form-input' value={form.company} onChange={(e) => { setForm((f) => ({ ...f, company: e.target.value })) }} required id='company'>
                            <option value="" disabled>
                                Select Company
                            </option>
                            <option value='Benton'>Benton</option>
                            <option value='Chanay'>Chanay</option>
                            <option value='Chemel'>Chemel</option>
                            <option value='Feltz Printing'>Feltz Printing</option>
                            <option value='Commercial Press'>Commercial Press</option>
                            <option value='Yummy'>Yummy</option>
                        </select>
                    </div>

                    <div className='form-group'>
                        <label htmlFor='job-title'>Job Title</label>
                        <input className='form-input' value={form.jobTitle} onChange={(e) => { setForm((f) => ({ ...f, jobTitle: e.target.value })) }} required id='job-title' placeholder='Enter Job Title' />
                    </div>

                    <div className='form-group'>
                        <label htmlFor='email'>Email</label>
                        <input className='form-input' value={form.email} onChange={(e) => { setForm((f) => ({ ...f, email: e.target.value })) }} id='email' type='email' placeholder='Enter Email' />
                    </div>

                    <div className='form-group'>
                        <label htmlFor='address'>Address</label>
                        <input className='form-input' value={form.address} onChange={(e) => { setForm((f) => ({ ...f, address: e.target.value })) }} required id='address' placeholder='Enter Address' />
                    </div>

                    <div className='form-group'>
                        <label htmlFor='city'>City</label>
                        <input className='form-input' value={form.city} onChange={(e) => { setForm((f) => ({ ...f, city: e.target.value })) }} required id='city' placeholder='Enter City' />
                    </div>

                    <div className='form-group'>
                        <label htmlFor='county'>County</label>
                        <input className='form-input' value={form.county} onChange={(e) => { setForm((f) => ({ ...f, county: e.target.value })) }} required id='county' placeholder='Enter County' />
                    </div>

                    {isSuccess && <div className='form-group'>
                        <p className='success-message'>Employee Created!</p>
                    </div>}

                    {isError && <div className='form-group'>
                        <p className='error-message'>Failed to Create{error ? `: ${error.message}` : ''}</p>
                    </div>}

                </div>

                <div className='add-form-buttons'>
                    <button type='submit' disabled={isPending} className='add-submit-button'>{isPending ? 'Creating...' : 'Create'}</button>
                    <button type='button' disabled={isPending} className='add-cancel-button' onClick={() => setAddFormVisible(false)}>Cancel</button>
                </div>
            </form>
        </aside>
    );
}

import { useState } from 'react';
import { useEditEmployee } from '../../hooks/employee/useEditEmployee';
import './AddEmployeeForm.css'
//inherits from addemployeeform css cause i dont feel like making new css file tbh

interface EditFormProps {
    setEditFormVisible: React.Dispatch<React.SetStateAction<boolean>>;
    id: number;
    firstName: string,
    lastName: string,
    jobTitle: string,
    company: string,
    address: string,
    city: string,
    county: string,
    email?: string,
    brandColor: string,
}

export function EditEmployeeForm({ setEditFormVisible,
    id,
    firstName,
    lastName,
    jobTitle,
    company,
    address,
    city,
    county,
    email, }: EditFormProps) {

    const [canSubmit, setCanSubmit] = useState(false);
    const [form, setForm] = useState({
        id,
        firstName,
        lastName,
        company,
        jobTitle,
        email,
        address,
        city,
        county
    });

    const { mutate, isSuccess, isPending, isError, error } = useEditEmployee();

    return (
        <>
            <div className='panel-backdrop panel-backdrop-visible' onClick={() => setEditFormVisible(false)} />
            <aside className='add-form-wrapper'>
            <form
                className='add-form'
                onSubmit={(e) => {
                    e.preventDefault(); 
                    mutate({ ...form, email: form.email || null },
                        {onSuccess: () => {
                            setTimeout(() => setEditFormVisible(false) ,1200);
                        }}
                    );
                }}>

            <div className='add-form-header'>
                <h1>Edit Employee Details</h1>
                <p>Edit in the details below to add a new employee.</p>
            </div>

            <div className='add-form-fields'>
                <div className='form-group'>
                    <label htmlFor='first-name'>First Name</label>
                    <input className='form-input' value={form.firstName} onChange={(e) => { setForm(f => ({ ...f, firstName: e.target.value })); setCanSubmit(true) }} required id='first-name' placeholder='Enter First Name' />
                </div>

                <div className='form-group'>
                    <label htmlFor='last-name'>Last Name</label>
                    <input className='form-input' value={form.lastName} onChange={(e) => { setForm(f => ({ ...f, lastName: e.target.value })); setCanSubmit(true); }} required id='last-name' placeholder='Enter Last Name' />
                </div>

                <div className='form-group'>
                    <label htmlFor='company'>Company</label>
                    <select className='form-input' value={form.company} onChange={(e) => { setForm(f => ({ ...f, company: e.target.value })); setCanSubmit(true); }} required id='company'>
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
                    <input className='form-input' value={form.jobTitle} onChange={(e) => { setForm(f => ({ ...f, jobTitle: e.target.value })); setCanSubmit(true); }} required id='job-title' placeholder='Enter Job Title' />
                </div>

                <div className='form-group'>
                    <label htmlFor='email'>Email</label>
                    <input className='form-input' value={form.email ?? ''} onChange={(e) => { setForm(f => ({ ...f, email: e.target.value })); setCanSubmit(true); }} id='email' type='email' placeholder='Enter Email' />
                </div>

                <div className='form-group'>
                    <label htmlFor='address'>Address</label>
                    <input className='form-input' required value={form.address} onChange={(e) => { setForm(f => ({ ...f, address: e.target.value })); setCanSubmit(true); }} id='address' placeholder='Enter Address' />
                </div>

                <div className='form-group'>
                    <label htmlFor='city'>City</label>
                    <input className='form-input' required value={form.city} onChange={(e) => { setForm(f => ({ ...f, city: e.target.value })); setCanSubmit(true); }} id='city' placeholder='Enter City' />
                </div>

                <div className='form-group'>
                    <label htmlFor='county'>County</label>
                    <input className='form-input' required value={form.county} onChange={(e) => { setForm(f => ({ ...f, county: e.target.value })); setCanSubmit(true); }} id='county' placeholder='Enter County' />
                </div>

                {isSuccess && <div className='form-group'>
                    <p className='success-message'>Employee Edited!</p>
                </div>}

                {isError && <div className='form-group'>
                    <p className='error-message'>Failed to Edit{error ? `: ${error.message}` : ''}</p>
                </div>}

            </div>

            <div className='add-form-buttons'>
                <button type='submit' disabled={!canSubmit || isPending} className='add-submit-button'>Submit</button>
                <button type='button' className='add-cancel-button' disabled={isPending} onClick={() => { setEditFormVisible(false); setCanSubmit(false); }}>Cancel</button>
            </div>
        </form>
        </aside>
        </>
    );
}

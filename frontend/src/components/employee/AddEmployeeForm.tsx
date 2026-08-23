import { useEffect, useRef, useState } from 'react';
import './AddEmployeeForm.css'
import { useCreateEmployee } from '../../hooks/employee/useCreateEmployee';
import { useFocusTrap } from '../../hooks/useFocusTrap';
import { isBlank, isValidEmail } from '../../utils/validation';

interface AddEmployeeFormProps {
    setAddFormVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const REQUIRED_FIELDS = ['firstName', 'lastName', 'company', 'jobTitle', 'address', 'city', 'county'] as const;

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
    const [errors, setErrors] = useState<Record<string, string>>({});

    const { mutate, isPending, isSuccess, isError, error } = useCreateEmployee();

    const panelRef = useRef<HTMLElement>(null);
    useFocusTrap(panelRef, true);

    useEffect(() => {
        function handleKeyDown(e: KeyboardEvent) {
            if (e.key === 'Escape') {
                setAddFormVisible(false);
            }
        }

        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [setAddFormVisible]);

    return (
        <>
            <div className='panel-backdrop panel-backdrop-visible' onClick={() => setAddFormVisible(false)} />
            <aside ref={panelRef} className='add-form-wrapper'
                role="dialog"
                aria-modal="true"
                aria-labelledby="add-employee-heading">
                <form className='add-form' onSubmit={(e) => {
                    e.preventDefault();

                    const nextErrors: Record<string, string> = {};
                    for (const field of REQUIRED_FIELDS) {
                        if (isBlank(form[field])) {
                            nextErrors[field] = 'This field cannot be empty';
                        }
                    }
                    if (!isBlank(form.email) && !isValidEmail(form.email.trim())) {
                        nextErrors.email = 'Enter a valid email address';
                    }
                    setErrors(nextErrors);
                    if (Object.keys(nextErrors).length > 0) return;

                    const trimmed = {
                        ...form,
                        firstName: form.firstName.trim(),
                        lastName: form.lastName.trim(),
                        company: form.company.trim(),
                        jobTitle: form.jobTitle.trim(),
                        address: form.address.trim(),
                        city: form.city.trim(),
                        county: form.county.trim(),
                    };

                    mutate({ ...trimmed, email: form.email.trim() || null }, {
                        onSuccess: () => {
                            setTimeout(() => setAddFormVisible(false), 1200);
                        },
                    });
                }}>

                    <div className='add-form-header'>
                        <h1 id="add-employee-heading">Add Employee</h1>
                        <p>Fill in the details below to add a new employee.</p>
                    </div>

                    <div className='add-form-fields'>
                        <div className='form-group'>
                            <label htmlFor='first-name'>First Name</label>
                            <input className='form-input' value={form.firstName} onChange={(e) => { setForm((f) => ({ ...f, firstName: e.target.value })) }} required id='first-name' placeholder='Enter First Name' />
                            {errors.firstName && <p className='form-error'>{errors.firstName}</p>}
                        </div>

                        <div className='form-group'>
                            <label htmlFor='last-name'>Last Name</label>
                            <input className='form-input' value={form.lastName} onChange={(e) => { setForm((f) => ({ ...f, lastName: e.target.value })) }} required id='last-name' placeholder='Enter Last Name' />
                            {errors.lastName && <p className='form-error'>{errors.lastName}</p>}
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
                            {errors.company && <p className='form-error'>{errors.company}</p>}
                        </div>

                        <div className='form-group'>
                            <label htmlFor='job-title'>Job Title</label>
                            <input className='form-input' value={form.jobTitle} onChange={(e) => { setForm((f) => ({ ...f, jobTitle: e.target.value })) }} required id='job-title' placeholder='Enter Job Title' />
                            {errors.jobTitle && <p className='form-error'>{errors.jobTitle}</p>}
                        </div>

                        <div className='form-group'>
                            <label htmlFor='email'>Email</label>
                            <input className='form-input' value={form.email} onChange={(e) => { setForm((f) => ({ ...f, email: e.target.value })) }} id='email' type='email' placeholder='Enter Email' />
                            {errors.email && <p className='form-error'>{errors.email}</p>}
                        </div>

                        <div className='form-group'>
                            <label htmlFor='address'>Address</label>
                            <input className='form-input' value={form.address} onChange={(e) => { setForm((f) => ({ ...f, address: e.target.value })) }} required id='address' placeholder='Enter Address' />
                            {errors.address && <p className='form-error'>{errors.address}</p>}
                        </div>

                        <div className='form-group'>
                            <label htmlFor='city'>City</label>
                            <input className='form-input' value={form.city} onChange={(e) => { setForm((f) => ({ ...f, city: e.target.value })) }} required id='city' placeholder='Enter City' />
                            {errors.city && <p className='form-error'>{errors.city}</p>}
                        </div>

                        <div className='form-group'>
                            <label htmlFor='county'>County</label>
                            <input className='form-input' value={form.county} onChange={(e) => { setForm((f) => ({ ...f, county: e.target.value })) }} required id='county' placeholder='Enter County' />
                            {errors.county && <p className='form-error'>{errors.county}</p>}
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
        </>
    );
}

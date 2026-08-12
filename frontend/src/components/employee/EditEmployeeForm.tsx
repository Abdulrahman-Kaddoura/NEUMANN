import './AddEmployeeForm.css'

interface EditFormProps {
    setEditFormVisible: React.Dispatch<React.SetStateAction<boolean>>;
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
    firstName,
    lastName,
    jobTitle,
    company,
    address,
    city,
    county,
    email, }: EditFormProps) {
    return (
        <aside className='add-form-wrapper'>
            <form className='add-form'>

                <div className='add-form-header'>
                    <h1>Edit Employee Details</h1>
                    <p>Edit in the details below to add a new employee.</p>
                </div>

                <input type='hidden' id='employeeId' />

                <div className='form-group'>
                    <label htmlFor='first-name'>First Name</label>
                    <input className='form-input' value={firstName} required id='first-name' placeholder='Enter First Name' />
                </div>

                <div className='form-group'>
                    <label htmlFor='last-name'>Last Name</label>
                    <input className='form-input' value={lastName} required id='last-name' placeholder='Enter Last Name' />
                </div>

                <div className='form-group'>
                    <label htmlFor='company'>Company</label>
                    <select className='form-input' value={company} required id='company'>
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
                    <input className='form-input' value={jobTitle} required id='job-title' placeholder='Enter Job Title' />
                </div>

                <div className='form-group'>
                    <label htmlFor='email'>Email</label>
                    <input className='form-input' value={email} id='email' type='email' placeholder='Enter Email' />
                </div>

                <div className='form-group'>
                    <label htmlFor='address'>Address</label>
                    <input className='form-input' required value={address} id='address' placeholder='Enter Address' />
                </div>

                <div className='form-group'>
                    <label htmlFor='city'>City</label>
                    <input className='form-input' required value={city} id='city' placeholder='Enter City' />
                </div>

                <div className='form-group'>
                    <label htmlFor='county'>County</label>
                    <input className='form-input' required value={county} id='county' placeholder='Enter County' />
                </div>

                <div className='add-form-buttons'>
                    <button type='submit' className='add-submit-button'>Submit</button>
                    <button type='button' className='add-cancel-button' onClick={() => setEditFormVisible(false)}>Cancel</button>
                </div>
            </form>
        </aside>
    );
}

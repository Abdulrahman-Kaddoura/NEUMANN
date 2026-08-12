import './AddEmployeeForm.css'

interface AddEmployeeFormProps {
    setAddFormVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export function AddEmployeeForm({ setAddFormVisible }: AddEmployeeFormProps) {
    return (
        <aside className='add-form-wrapper'>
            <form className='add-form'>

                <div className='add-form-header'>
                    <h1>Add Employee</h1>
                    <p>Fill in the details below to add a new employee.</p>
                </div>

                <div className='form-group'>
                    <label htmlFor='first-name'>First Name</label>
                    <input className='form-input' required id='first-name' placeholder='Enter First Name' />
                </div>

                <div className='form-group'>
                    <label htmlFor='last-name'>Last Name</label>
                    <input className='form-input' required id='last-name' placeholder='Enter Last Name' />
                </div>

                <div className='form-group'>
                    <label htmlFor='company'>Company</label>
                    <select className='form-input' required id='company'>
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
                    <input className='form-input' required id='job-title' placeholder='Enter Job Title' />
                </div>

                <div className='form-group'>
                    <label htmlFor='email'>Email</label>
                    <input className='form-input' id='email' type='email' placeholder='Enter Email' />
                </div>

                <div className='form-group'>
                    <label htmlFor='address'>Address</label>
                    <input className='form-input' required id='address' placeholder='Enter Address' />
                </div>

                <div className='form-group'>
                    <label htmlFor='city'>City</label>
                    <input className='form-input' required id='city' placeholder='Enter City' />
                </div>

                <div className='form-group'>
                    <label htmlFor='county'>County</label>
                    <input className='form-input' required id='county' placeholder='Enter County' />
                </div>

                <div className='add-form-buttons'>
                    <button type='submit' className='add-submit-button'>Create</button>
                    <button type='button' className='add-cancel-button' onClick={() => setAddFormVisible(false)}>Cancel</button>
                </div>
            </form>
        </aside>
    );
}

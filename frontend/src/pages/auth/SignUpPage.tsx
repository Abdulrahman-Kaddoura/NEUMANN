import { useState } from 'react';
import { Link } from 'react-router';
import './auth.css'

export function SignUpPage() {
    const [pass, setPass] = useState("");
    const [confirmPass, setConfirmPass] = useState("");
    const [error, setError] = useState("");

    function checkPass(event: React.SubmitEvent<HTMLFormElement>) {
        event.preventDefault();
        if (pass !== confirmPass) {
            setError("Passwords do not match");
            return;
        }

        setError("");
    }

    return (
        <div className="login-wrapper">
            <title>SignUp</title>
            <div className='login-container'>
                <h1>Sign Up</h1>

                <form onSubmit={checkPass} className="login-submission">
                    <div className="form-group">
                        <label htmlFor="username">Email</label>
                        <input
                            id="email"
                            type="text"
                            placeholder="Enter email"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input
                            id="name"
                            type="text"
                            placeholder="Enter name"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            id="password"
                            type="password"
                            placeholder="Enter password"
                            required
                            onChange={(e) => {
                                setPass(e.target.value);
                            }}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="confirm-password">Confirm Password</label>
                        <input
                            id="confirm-password"
                            type="password"
                            placeholder="Confirm password"
                            required
                            onChange={(e) => {
                                setConfirmPass(e.target.value);
                            }}
                        />
                    </div>

                    {error && <p style={{ color: 'red' }}>{error}</p>}

                    <div className="login-options">
                        <label className="remember-me">
                            <input type="checkbox" required />
                            I agree to the <Link to="/terms">terms and conditions</Link>
                        </label>
                    </div>

                    <button type="submit">Create Account</button>

                    <p className="signup-link">Have an account? <Link to="/login">Login</Link></p>
                </form>
            </div>
        </div>
    );
}
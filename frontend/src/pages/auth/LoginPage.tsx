import { Link, useNavigate } from 'react-router';
import { useState, type FormEvent } from 'react';
import { login } from '../../api/authApi';
import './auth.css'

export function LoginPage() {
    // const navigate = useNavigate();

    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const await login(form);
    }

    const [form, setForm] = useState({email: '', password: ''});

    return (
        <div className="login-wrapper">
            <title>Login</title>
            <div className='login-container'>
                <h1>Login</h1>

                <form className="login-submission" onSubmit={handleSubmit}>
                    <div className="form-group">

                        <label htmlFor="email">Email</label>
                        <input
                            id="email"
                            type="text"
                            placeholder="Enter email"
                            required
                            value={form.email}
                            onChange={(e) => { setForm((f) => ({...f, email: e.target.value}))}}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            id="password"
                            type="password"
                            placeholder="Enter password"
                            required
                            value={form.password}
                            onChange={(e) => { setForm((f) => ({...f, password: e.target.value}))}}
                        />
                    </div>

                    <div className="login-options">
                        <label className="remember-me">
                            <input type="checkbox" />
                            Remember me
                        </label>

                        <Link to="/forgot-password">Forgot password?</Link>
                    </div>

                    <button type="submit">Login</button>

                    <p className="signup-link">Not a member? <Link to="/signup">Register</Link></p>
                </form>
            </div>
        </div>
    );
}
import { Link, useNavigate } from 'react-router';
import { useState, type FormEvent } from 'react';
import { useAuth } from '../../hooks/useAuth';
import EyeIcon from '../../assets/eye.svg';
import './auth.css'

export function LoginPage() {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showPass, setShowPass] = useState(false);

    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setError('');
        setIsSubmitting(true);
        try {
            await login(form.email, form.password);
            navigate('/');
        } catch {
            setError('Invalid email or password.');
        } finally {
            setIsSubmitting(false);
        }
    }

    const [form, setForm] = useState({ email: '', password: '' });

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
                            onChange={(e) => { setForm((f) => ({ ...f, email: e.target.value })) }}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <div className="password-input">
                            <input
                                id="password"
                                type={showPass ? "text" : "password"}
                                placeholder="Enter password"
                                required
                                value={form.password}
                                onChange={(e) => { setForm((f) => ({ ...f, password: e.target.value })) }}
                            />
                            <button
                                type="button"
                                className="reveal-pass"
                                onClick={() => setShowPass((v) => !v)}
                            >
                                <img className="eye-icon" src={EyeIcon} />
                            </button>
                        </div>
                    </div>

                    {error && <p className="form-error" role="alert">{error}</p>}

                    <button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? 'Logging in...' : 'Login'}
                    </button>

                    <p className="signup-link">Not a member? <Link to="/signup">Register</Link></p>
                </form>
            </div>
        </div>
    );
}
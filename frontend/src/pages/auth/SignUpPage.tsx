import { useState } from 'react';
import type { FormEvent } from 'react';
import { isAxiosError } from 'axios';
import { Link, useNavigate } from 'react-router';
import { useAuth } from '../../hooks/useAuth';
import type { Role } from '../../types/auth';
import EyeIcon from '../../assets/eye.svg';
import './auth.css'

function extractErrorMessage(err: unknown, fallback: string): string {
    if (isAxiosError(err) && typeof err.response?.data?.detail === 'string') {
        return err.response.data.detail;
    }
    return fallback;
}

export function SignUpPage() {
    const navigate = useNavigate();
    const { register } = useAuth();

    const [form, setForm] = useState({ fullName: '', email: '', password: '' });
    const [confirmPass, setConfirmPass] = useState('');
    const [role, setRole] = useState<Role>('viewer');
    const [showPass, setShowPass] = useState(false);
    const [showConfirmPass, setShowConfirmPass] = useState(false);
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    function validate(): string | null {
        if (!form.fullName.trim() || !form.email.trim() || !form.password) {
            return 'Please fill in all required fields.';
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
            return 'Please enter a valid email address.';
        }
        if (form.password.length < 8) {
            return 'Password must be at least 8 characters long.';
        }
        if (form.password !== confirmPass) {
            return 'Passwords do not match.';
        }
        return null;
    }

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const validationError = validate();
        if (validationError) {
            setError(validationError);
            return;
        }

        setError('');
        setIsSubmitting(true);
        try {
            await register({
                fullName: form.fullName.trim(),
                email: form.email.trim(),
                password: form.password,
                role,
            });
            navigate('/');
        } catch (err) {
            setError(extractErrorMessage(err, 'Could not create account. Please try again.'));
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <div className="login-wrapper">
            <title>SignUp</title>
            <div className='login-container'>
                <h1>Sign Up</h1>

                <form onSubmit={handleSubmit} className="login-submission">

                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input
                            id="name"
                            type="text"
                            placeholder="Enter name"
                            required
                            value={form.fullName}
                            onChange={(e) => setForm((f) => ({ ...f, fullName: e.target.value }))}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            id="email"
                            type="text"
                            placeholder="Enter email"
                            required
                            value={form.email}
                            onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="role">Account type</label>
                        <select
                            id="role"
                            value={role}
                            onChange={(e) => setRole(e.target.value as Role)}
                        >
                            <option value="viewer">Viewer</option>
                            <option value="editor">Editor</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <div className='password-input'>
                            <input
                                id="password"
                                type={showPass ? "text" : "password"}
                                placeholder="Enter password"
                                required
                                value={form.password}
                                onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
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

                    <div className="form-group">
                        <label htmlFor="confirm-password">Confirm Password</label>
                        <div className='password-input'>
                            <input
                                id="confirm-password"
                                type={showConfirmPass ? "text" : "password"}
                                placeholder="Confirm password"
                                required
                                value={confirmPass}
                                onChange={(e) => setConfirmPass(e.target.value)}
                            />
                            <button
                                type="button"
                                className="reveal-pass"
                                onClick={() => setShowConfirmPass((v) => !v)}
                            >
                                <img className="eye-icon" src={EyeIcon} />
                            </button>
                        </div>
                    </div>

                    {error && <p className="form-error" role="alert">{error}</p>}

                    <div className="login-options">
                        <label className="remember-me">
                            <input type="checkbox" required />
                            I agree to the <Link to="/terms" target="_blank" rel="noopener noreferrer">terms and conditions</Link>
                        </label>
                    </div>

                    <button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? 'Creating account...' : 'Create Account'}
                    </button>

                    <p className="signup-link">Have an account? <Link to="/login">Login</Link></p>
                </form>
            </div>
        </div>
    );
}

import { Link } from 'react-router';
import './SignUpPage.css'

export function SignUpPage() {
    return (
        <div className="login-wrapper">
            <div className='login-container'>
                <h1>Sign Up</h1>

                <form className="login-submission">
                    <div className="form-group">
                        <label htmlFor="username">Email</label>
                        <input
                            id="email"
                            type="text"
                            placeholder="Enter email"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input
                            id="name"
                            type="text"
                            placeholder="Enter name"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            id="password"
                            type="password"
                            placeholder="Enter password"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="confirm-password">Confirm Password</label>
                        <input
                            id="confirm-password"
                            type="password"
                            placeholder="Confirm password"
                        />
                    </div>

                    <div className="login-options">
                        <label className="remember-me">
                            <input type="checkbox" />
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
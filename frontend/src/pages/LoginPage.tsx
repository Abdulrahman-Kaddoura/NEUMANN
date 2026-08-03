import { Link } from 'react-router';
import './LoginPage.css'

export function LoginPage() {
    return (
        <div className="login-wrapper">
            <div className='login-container'>
                <h1>Login</h1>

                <form className="login-submission">
                    <div className="form-group">

                        <label htmlFor="username">Username</label>
                        <input
                            id="username"
                            type="text"
                            placeholder="Enter username"
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
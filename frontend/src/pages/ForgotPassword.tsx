import { Link } from "react-router";

export function ForgotPassword() {
    return (
        <div className="login-wrapper">
            <div className='login-container'>
                <h1>Reset Password</h1>

                <form className="login-submission">
                    <div className="form-group">
                        <label htmlFor="username">Email</label>
                        <input
                            id="email"
                            type="text"
                            placeholder="Enter email"
                            required
                        />
                    </div>

                    <button type="submit">Send reset link</button>

                    <p className="signup-link">Have an account? <Link to="/login">Login</Link></p>
                </form>
            </div>
        </div>
    );
}
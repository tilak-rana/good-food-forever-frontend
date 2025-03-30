import React, { useState } from 'react';
import '../Styles/LoginPage.css';
import navHook from './navHook'; // Adjusted import for navHook

const LoginPage = ({ navigate }) => {
    // Initialize state for form fields
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'email') setEmail(value);
        if (name === 'password') setPassword(value);
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5500/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });
            const result = await response.json();
            if (response.ok) {
                console.log(alert(result.message));
                localStorage.setItem('authToken', result.user.email);
                localStorage.setItem('userName', result.user.name);

                // Check for profile image and store it, or use a default image
                const profileImage = result.user.profileImage || '/assets/default-profile.png';
                localStorage.setItem('profileImage', profileImage);

                navigate('/'); // Redirect to home page after successful login
            } else {
                alert(result.message || 'Login failed');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred during login');
        }
        setEmail('');
        setPassword('');
    };

    return (
        <div className="container-fluid login-page">
            <div className="row justify-content-center align-items-center vh-100">
                <div className="col-12 col-md-6 col-lg-4 login-form">
                    <div className="text-center mb-4">
                        <img
                            src="./assets/nightlife.png"
                            alt="GFF Logo"
                            className="img-fluid mb-3"
                        />
                        <h2>Login</h2>
                        <p>Welcome back! Log in to access your account.</p>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email address</label>
                            <input type="email" className="form-control" id="email" name="email" value={email} onChange={handleChange} placeholder="Enter email" required />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input type="password" className="form-control" id="password" name="password" value={password} onChange={handleChange} placeholder="Password" required />
                        </div>

                        <button type="submit" className="btn btn-danger w-100 mt-4">
                            Login
                        </button>

                        <div className="text-center mt-3">
                            <small>or login with</small>
                        </div>

                        <div className="d-flex justify-content-between mt-3">
                            <button type="button" className="btn btn-outline-secondary w-100 me-2">
                                <i className="bi bi-google"></i> Google
                            </button>
                            <button type="button" className="btn btn-outline-secondary w-100 ms-2">
                                <i className="bi bi-facebook"></i> Facebook
                            </button>
                        </div>

                        <div className="text-center mt-4">
                            <a href="#forgot-password">Forgot Password?</a>
                        </div>

                        <div className="text-center mt-3">
                            <small>
                                Don't have an account? <a href="/signup">Sign Up</a>
                            </small>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default navHook(LoginPage);

import React, { useState } from 'react';
import '../Styles/SignupPage.css';
import navHook from './navHook'; // Adjusted import for navHook

const SignupPage = ({ navigate }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5500/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            const result = await response.json();

            if (response.ok) {
                // Store token and user details in localStorage
                console.log(result);
                localStorage.setItem('authToken', result.Signup.email);
                localStorage.setItem('userName', result.Signup.name);

                // Check for profile image and store it, or use a default image
                const profileImage = result.Signup.profileImage || '/assets/default-profile.png';
                localStorage.setItem('profileImage', profileImage);

                // console.log("success", result.Signup.email);
                // console.log("success", result.Signup.name);
                console.log(alert(result.message));
                navigate('/'); // Redirect to home page
            } else {
                alert(result.message || 'Signup failed');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred during signup');
        }

        setFormData({
            name: '',
            email: '',
            password: ''
        });
    };

    return (
        <div className="container-fluid signup-page">
            <div className="row justify-content-center align-items-center vh-100">
                <div className="col-12 col-md-6 col-lg-4 signup-form">
                    <div className="text-center mb-4">
                        <img
                            src="./assets/nightlife.png"
                            alt="GFF Logo"
                            className="img-fluid mb-3"
                        />
                        <h2>Sign Up</h2>
                        <p>Create your account and start exploring.</p>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Name</label>
                            <input type="text" className="form-control" id="name" name="name" value={formData.name} onChange={handleChange} placeholder="Enter your name" required />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email address</label>
                            <input type="email" className="form-control" id="email" name="email" value={formData.email} onChange={handleChange} placeholder="Enter email" required />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input type="password" className="form-control" id="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" required />
                        </div>

                        <button type="submit" className="btn btn-danger w-100 mt-4">
                            Sign Up
                        </button>

                        <div className="text-center mt-4">
                            <small>Already have an account? <a href="/login">Log In</a></small>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default navHook(SignupPage);

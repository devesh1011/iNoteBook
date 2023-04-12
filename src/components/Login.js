import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Login = (props) => {
    const [credentials, setCredentials] = useState({ email: "", password: "" });
    let navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password })
        });

        const json = await response.json();

        if (json.success) {
            // redirect
            localStorage.setItem('token', json.authToken)
            props.showAlert("You are successfully Logged In", "success")

            navigate("/")
        } else {
            props.showAlert("Invalid Credentials", "danger")
        }
    }

    const onchange = (e) => {
        setCredentials({
            ...credentials, [e.target.name]: e.target.value
        })
    }

    return (
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-md-8 col-lg-6">
                    <form onSubmit={handleSubmit}>
                        <h1 class="text-center mb-4">Sign in to your account</h1>
                        <div class="mb-3">
                            <label for="email" class="form-label">Email</label>
                            <input type="email" class="form-control" id="email" required onChange={onchange} name='email' value={credentials.email}/>
                        </div>
                        <div class="mb-3">
                            <label for="password" class="form-label">Password</label>
                            <input type="password" class="form-control" id="password" required onChange={onchange} name='password' value={credentials.password}/>
                        </div>
                        <div class="mb-3 form-check">
                            <button type="submit" class="btn btn-dark btn-block">Sign-In</button>
                            <Link to="#" class="float-end">Forgot password?</Link>
                        </div>

                        <p class="text-center mt-3">New to iNoteBook? <Link to="/signup">Create your iNoteBook account</Link></p>
                    </form>
                </div>
            </div>
        </div>

    )
}

export default Login

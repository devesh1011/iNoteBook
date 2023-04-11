import React from 'react'

const Login = () => {

    const handleSubmit = async (e) => {
        e.preventDefault();

        fetch('http://localhost:5000/api/auth/login')

        const response = await fetch(`http://localhost:5000/api/auth/login`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
        });

        const json = await response.json();
        console.log(json)
    }

    return (
        <div className="container login-form">
            <h1 className='text-center'>Login Form</h1>
            <form>
                <div class="mb-3">
                    <label htmlFor="email" class="form-label">Email address</label>
                    <input type="email" class="form-control" id="email" aria-describedby="emailHelp" />
                    <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div class="mb-3">
                    <label htmlFor="password" class="form-label">Password</label>
                    <input type="password" class="form-control" id="password" />
                </div>
                <button type="submit" class="btn btn-dark" onSubmit={handleSubmit}>Submit</button>
            </form>
        </div>
    )
}

export default Login

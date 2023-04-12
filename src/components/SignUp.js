import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

const SignUp = (props) => {
	const [newCredentials, setNewCredentials] = useState({ name: "", email: "", password: "", passwordconfirm: "" })
	let navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();
		const { name, email, password } = newCredentials;

		const response = await fetch("http://localhost:5000/api/auth/createUser", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({ name, email, password })
		})

		const json = await response.json();
		console.log(json)

		if (json.success) {
			localStorage.setItem('token', json.authtoken);
			props.showAlert("Start your new journey with iNoteBokk", "success")

			navigate("/")
		} else {
			props.showAlert("User with this email already exists", "danger")
		}
	}

	const onchange = (e) => {
		setNewCredentials({
			...newCredentials, [e.target.name]: e.target.value
		})
	}

	return (
		<div>
			<div className="container">
				<div className="row justify-content-center">
					<div className="col-md-8 col-lg-6">
						<form onSubmit={handleSubmit}>
							<h1 className="text-center mb-4">Create account</h1>
							<div className="mb-3">
								<label htmlFor="name" className="form-label">Your name</label>
								<input type="text" className="form-control" id="name" onChange={onchange} required name="name" />
							</div>
							<div className="mb-3">
								<label htmlFor="email" className="form-label">Email</label>
								<input type="email" className="form-control" id="email" onChange={onchange} required name="email" />
							</div>
							<div className="mb-3">
								<label htmlFor="password" className="form-label">Password</label>
								<input type="password" className="form-control" id="password" onChange={onchange} required name="password" />
							</div>
							<div className="mb-3">
								<label htmlFor="passwordconfirm" className="form-label">Re-enter password</label>
								<input type="password" className="form-control" id="passwordconfirm" onChange={onchange} required name="passwordconfirm" />
							</div>
							<div className="mb-3 form-check">
								<input type="checkbox" className="form-check-input" id="terms" />
								<label className="form-check-label" htmlFor="terms">I agree to the terms and conditions</label>
							</div>
							<button type="submit" className="btn btn-dark btn-block">Create your iNoteBook account</button>
							<p className="text-center mt-3">Already have an account? <Link to="/login">Sign in</Link></p>
						</form>
					</div>
				</div>
			</div>

		</div>
	)
}

export default SignUp

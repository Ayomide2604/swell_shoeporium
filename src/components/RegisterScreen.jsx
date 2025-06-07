import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import useAuthStore from "../store/useAuthStore";

const RegisterScreen = () => {
	const { register } = useAuthStore();
	const [email, setEmail] = useState("");
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [password1, setPassword1] = useState("");
	const [password2, setPassword2] = useState("");
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (password1 !== password2) {
			alert("Passwords do not match");
			return;
		}

		setLoading(true);
		setError(null);

		try {
			await register(email, password1, firstName, lastName);
			navigate("/"); // Redirect after successful registration
		} catch (err) {
			console.error("Registration failed:", err);
			setError("Registration failed. Please try again.");
		} finally {
			setLoading(false);
		}
	};

	return (
		<section className="d-flex align-items-center justify-content-center my-5">
			<div className="container">
				<div className="row justify-content-center">
					<div className="col-md-6 col-lg-5">
						<div className="card p-4 shadow-lg">
							<h3 className="text-center mb-4">Register Your Account</h3>

							{error && <div className="alert alert-danger">{error}</div>}

							<form className="contact__form" onSubmit={handleSubmit}>
								<div className="row">
									<div className="form-group col-6">
										<label htmlFor="first-name">First Name:</label>
										<input
											type="text"
											className="w-100"
											id="first-name"
											placeholder="First Name"
											value={firstName}
											onChange={(e) => setFirstName(e.target.value)}
											required
										/>
									</div>
									<div className="form-group col-6">
										<label htmlFor="last-name">Last Name:</label>
										<input
											type="text"
											className="w-100"
											id="last-name"
											placeholder="Last Name"
											value={lastName}
											onChange={(e) => setLastName(e.target.value)}
											required
										/>
									</div>
								</div>

								<div className="form-group">
									<label htmlFor="email">Email address:</label>
									<input
										type="email"
										className="w-100"
										id="email"
										placeholder="Enter email"
										value={email}
										onChange={(e) => setEmail(e.target.value)}
										required
									/>
								</div>

								<div className="form-group">
									<label htmlFor="password1">Password:</label>
									<input
										type="password"
										className="w-100"
										id="password1"
										placeholder="Password"
										value={password1}
										onChange={(e) => setPassword1(e.target.value)}
										required
									/>
								</div>

								<div className="form-group">
									<label htmlFor="password2">Confirm Password:</label>
									<input
										type="password"
										className="w-100"
										id="password2"
										placeholder="Confirm Password"
										value={password2}
										onChange={(e) => setPassword2(e.target.value)}
										required
									/>
								</div>

								<button
									type="submit"
									className="btn site-btn btn-block mt-3"
									disabled={loading}
								>
									{loading ? "Registering..." : "Signup"}
								</button>
							</form>

							<p className="text-center mt-3 mb-0">
								Already have an account? <Link to="/login">Login</Link>
							</p>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default RegisterScreen;

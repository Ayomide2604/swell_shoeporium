import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import useAuthStore from "../store/useAuthStore";

const LoginScreen = () => {
	const { login, loading, user, error } = useAuthStore();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const navigate = useNavigate();

	const handleSubmit = (e) => {
		e.preventDefault();
		login("shoeporiumng@gmail.com", "Toydap45!");
	};

	useEffect(() => {
		if (user) {
			navigate("/");
		}
	}, [user, navigate]);

	return (
		<section className="d-flex align-items-center justify-content-center my-5">
			<div className="container">
				<div className="row justify-content-center">
					<div className="col-md-6 col-lg-5">
						<div className="card p-4 shadow-sm">
							<h3 className="text-center mb-4">Login to Your Account</h3>
							{error && <p className="text-danger text-center mb-3">{error}</p>}
							<form className="contact__form" onSubmit={handleSubmit}>
								<div className="form-group mb-3">
									<label htmlFor="email">Email address:</label>
									<input
										type="email"
										className="form-control w-100"
										id="email"
										placeholder="Enter email"
										value={email}
										onChange={(e) => setEmail(e.target.value)}
										required
									/>
								</div>
								<div className="form-group mb-3">
									<label htmlFor="password">Password:</label>
									<input
										type="password"
										className="form-control w-100"
										id="password"
										placeholder="Password"
										value={password}
										onChange={(e) => setPassword(e.target.value)}
										required
									/>
								</div>
								<div className="form-group d-flex justify-content-between align-items-center">
									<div className="form-check d-flex align-items-center">
										<input
											type="checkbox"
											className="form-check-input"
											id="remember"
										/>
										<label
											className="form-check-label small ms-2"
											htmlFor="remember"
										>
											Remember me
										</label>
									</div>
									<a href="#" className="small">
										Forgot password?
									</a>
								</div>
								<button
									type="submit"
									className="btn site-btn btn-block mt-3"
									disabled={loading}
								>
									{loading ? "Logging in..." : "Login"}
								</button>
							</form>
							<p className="text-center mt-3 mb-0">
								Don't have an account? <Link to="/signup">Sign up</Link>
							</p>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default LoginScreen;

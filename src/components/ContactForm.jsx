const ContactForm = () => {
	return (
		<div className="contact__form">
			<form action="#">
				<div className="row ">
					<div className="col-md-6">
						<input type="text" placeholder="First Name" required />
					</div>
					<div className="col-md-6">
						<input type="text" placeholder="Last Name" required />
					</div>
					<div className="col-lg-12">
						<input type="email" placeholder="Email" required />
					</div>
					<div className="col-lg-12">
						<input type="text" placeholder="Subject" required />
					</div>
					<div className="col-lg-12">
						<textarea placeholder="Message" defaultValue={""} />
						<button type="submit" className="site-btn">
							Send Message
						</button>
					</div>
				</div>
			</form>
		</div>
	);
};

export default ContactForm;

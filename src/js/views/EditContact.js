import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import PropTypes from "prop-types";

export const EditContact = props => {
	const { store, actions } = useContext(Context);
	const contactId = props.match.params.id;
	const [contact, setContact] = useState({
		full_name: "",
		email: "",
		agenda_slug: "",
		phone: "",
		address: ""
	});

	useEffect(() => {
		if (store.contacts !== null) {
			let contact = store.contacts.filter(contact => {
				return contact.id === contactId;
			});
			setContact(contact[0]); //le paso el parametro nuevo con los obj q coincidan con el id
		}
	}, []);

	const handleChange = e => {
		const { name, value } = e.target;
		setContact({ ...contact, [name]: value });
	};

	// const handleChange = e => {
	// 	const { name, value } = e.target;
	// 	const newcontact = Object.assign({}, contact);
	// 	newcontact[name] = value;
	// 	setContact(newcontact[0]);
	// };

	return (
		<div className="container">
			<div>
				<h1 className="text-center mt-5">Edit contact</h1>
				<form>
					<div className="form-group">
						<label>Full Name</label>
						<input
							type="text"
							name="full_name"
							className="form-control"
							placeholder="Full Name"
							value={contact.full_name}
							onChange={handleChange}
						/>
					</div>
					<div className="form-group">
						<label>Email</label>
						<input
							type="email"
							name="email"
							className="form-control"
							placeholder="Enter email"
							value={contact.email}
							onChange={handleChange}
						/>
					</div>
					<div className="form-group">
						<label>Phone</label>
						<input
							type="phone"
							name="phone"
							className="form-control"
							placeholder="Enter phone"
							value={contact.phone}
							onChange={handleChange}
						/>
					</div>
					<div className="form-group">
						<label>Address</label>
						<input
							type="text"
							name="address"
							className="form-control"
							placeholder="Enter address"
							value={contact.address}
							onChange={handleChange}
						/>
					</div>
					<button
						type="button"
						className="btn btn-success form-control"
						onClick={() => {
							actions.editContact("/" + contactId, contact);
						}}>
						Save
					</button>
					<Link className="mt-3 w-100 text-center" to="/">
						Go back to contacts
					</Link>
				</form>
			</div>
		</div>
	);
};
/**
 * Define the data-types for
 * your component's properties
 **/

EditContact.propTypes = {
	history: PropTypes.object,
	match: PropTypes.object
};

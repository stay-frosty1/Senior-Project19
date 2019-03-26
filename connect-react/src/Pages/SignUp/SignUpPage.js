import React, { Component } from 'react';
import { Button, Form } from "react-bootstrap";
import CustomFormGroup from "../../components/CustomFormGroup";
import Redirect from "react-router/Redirect";
import axios from "axios";

export default class SignUpPage extends Component {
	constructor(props) {
		super(props);

		this.state = {
			username: '',
			email: '',
			password: '',
			firstName: '',
			lastName: '',
			description: '',
			profileType: ('',''),
			snowSports: ('','',''),
			landSports: ('','',''),
			redirect: false
		}
	}

	// Validates form for style purposes and so that we cannot send empty data to api
	validateForm() {
		const { username, email, password,firstName, lastName, profileType, snowSports } = this.state;

		return username.length > 0 &&
//			email.length > 0 &&
			password.length > 0 &&
//			firstName.length > 0 &&
//			lastName.length > 0 &&
			typeof profileType == 'string';
	}

	// Handles state change for each input in the state object
	handleChange = event => {
		this.setState({
			[event.target.id]: event.target.value
		});
	};

	handleUserChange = event => {


		this.setState({

			[event.target.id]: event.target.value
		});

	};

	handleSubmit = e => {
		e.preventDefault();
		console.log('Submitted form:', this.state);
		alert(this.state.profileType + this.state.snow_sports +'this.state.profileType');
		axios.post('http://localhost:8000/users', {
			username: this.state.username,
			password: this.state.password,
			email: this.state.email,
			first_name: this.state.firstName,
			last_name: this.state.lastName,
			description: this.state.description,
			type: ['athlete'],
			snow_sports: ['snowboard'],
			water_sports: [''],
			land_sports: [''],
			air_sports: ['']


		})
			.then(results => {

				this.state.userId= results.data.check;

				if(this.state.userId > 0) {
					alert("created profile userId: " + this.state.userId);
					localStorage.setItem('userId', this.state.userId);
					this.setState({redirect: true});

				}
				else {
					alert("failed username is already taken");

					this.setState({redirect: false});
				}
			});

	};

	render() {
		console.log('State', this.state);
		const { redirect } = this.state;
		if(redirect) {
			return <Redirect to={`/dashboard/profile/${localStorage.getItem('userId')}`}/>;
		}

		return (
			<div className="Login" style={{ height: '80%', top: '42%' }}>
				<h3 style={{ textAlign: 'center', marginTop: '5%' }}>Sign Up</h3>
				<form onSubmit={this.handleSubmit}>

					<CustomFormGroup value={this.state.username} label="Username"	controlId="username"
									 type="text"	onChange={this.handleUserChange} />

					<CustomFormGroup value={this.state.password} label="Password"	controlId="password"
									 type="password"	onChange={this.handleChange} />

					<CustomFormGroup value={this.state.email} label="email"	controlId="email"
									 type="text"	onChange={this.handleChange} />

					<CustomFormGroup value={this.state.firstName} label="First Name"	controlId="firstName"
						type="text"	onChange={this.handleChange} />

					<CustomFormGroup value={this.state.lastName} label="Last Name"	controlId="lastName"
						type="text"	onChange={this.handleChange} />

					<CustomFormGroup value={this.state.description} label="Description(something about yourself)"	controlId="description"
									 type="text"	onChange={this.handleChange} />

					<Form.Group controlId="winter sport type">
						<Form.Label>Sport Type</Form.Label>
						<Form.Control value={this.state.snowSports} placeholder="Select a Sport" onChange={this.handleChange} as="select">
							<option disabled value={-1}>Select an option...</option>
							<option> </option>
							<option>Snowboarding</option>
							<option>Ski</option>
							<option>Snowmobile</option>
						</Form.Control>
					</Form.Group>

					<Form.Group controlId="land sport type">
						<Form.Label>Sport Type</Form.Label>
						<Form.Control value={this.state.landSports} placeholder="Select a Sport" onChange={this.handleChange} as="select">
							<option disabled value={-1}>Select an option...</option>
							<option> </option>
							<option>Skateboard</option>
							<option>BMX</option>
						</Form.Control>
					</Form.Group>

					<Form.Group controlId="profileType">
						<Form.Label>Profile Type</Form.Label>
						<Form.Control value={this.state.profileType} placeholder="Select type of profile..." onChange={this.handleChange} as="select">
							<option disabled value={-1}>Select an option...</option>
							<option>Athlete</option>
							<option>Photographer</option>
						</Form.Control>
					</Form.Group>

					<Button style={{ marginTop: '20px' }}	block disabled={!this.validateForm()} type="submit">Sign In</Button>
				</form>
			</div>
		);
	}
}
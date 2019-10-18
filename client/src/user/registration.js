import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom'
import { Card, Layout, Form, FormLayout, TextField, PageActions, Checkbox, Stack, Page, Banner } from '@shopify/polaris';
import { gql } from 'apollo-boost';
import { useMutation } from '@apollo/react-hooks';
import PrivacyPolicy, { TermsUsed } from './modals';

const RegisterMutation = gql`
    mutation RegisterMutation($email: String,$password : String,$firstName : String,$lastName : String,$brandName:String){
		addUser(email:$email,password:$password,firstName:$firstName,lastName:$lastName,brandName:$brandName){
			email,
			response
		}
	}`
export default function RegisterForm() {
	const [addNewUser, { loading, error, data }] = useMutation(RegisterMutation);
	const [companyPolicy, setCompanyPolicy] = useState(false);
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [brandName, setBrandName] = useState('');
	const [bannerStatus, setBannerStatus] = useState('critical');
	const [userExist, setUserExist] = useState('');
	const [emailError, setEmailError] = useState('');
	const [passwordError, setPasswordError] = useState('');
	const [confirmPasswordError, setConfirmPasswordError] = useState('');
	const [firstNameError, setFirstNameError] = useState('');
	const [lastNameError, setLastNameError] = useState('');
	const [brandNameError, setBrandNameError] = useState('');
	const [bannerError, setBannerError] = useState('');
	const emailFieldPattern = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{1,4})$/;

	const handleFirstNameChange = (value) => {
		setFirstName(value)
		setFirstNameError('')
		isValidName(value, 'firstName');
	};
	const handleLastNameChange = (value) => {
		setLastName(value)
		setLastNameError('')
		isValidName(value, 'lastName');
	};
	const handleBrandNameChange = (value) => {
		setBrandName(value)
		setBrandNameError('')
		isValidName(value, 'brandName');
	};
	const handleEmailChange = (value) => {
		setEmail(value);
		const emailErrorString = isValidEmail(email, emailFieldPattern) ? '' : 'Invalid email entered!';
		setEmailError(emailErrorString);
	};
	const handlePasswordChange = (value) => {
		setPassword(value);
		isValidPassword(value);
	};
	const handleConfirmPasswordChange = (value) => {
		setConfirmPassword(value);
		isValidConfirmPassword(value);
	};
	const handleCompanyPolicyChange = (value) => {
		const checkBoxValue = document.getElementById("agreeCheckbox").value;
		if (checkBoxValue !== "false") {
			setCompanyPolicy(false)
		}
		else {
			setCompanyPolicy(true)
		}
	}
	const handleSubmit = (e) => {
		if (!isValidName(firstName, 'firstName') || !isValidName(lastName, 'lastName')) {
			return false;
		}
		if (emailError.trim() !== '' || email === '') {
			setEmailError('Invalid email entered!');
			return false;
		}
		if (!isValidPassword(password)) {
			return false;
		}
		if (!isValidConfirmPassword(confirmPassword)) {
			return false;
		}
		if (!isValidName(brandName, 'brandName')) {
			return false;
		}
		if (!companyPolicy) {
			setBannerError('Please accept policy and terms of use to register');
			return false;
		}

		setUserExist('');
		e.preventDefault();
		addNewUser({ variables: { email: email, password: password, firstName: firstName, lastName: lastName, brandName: brandName } });
	}

	const isValidEmail = (value, pattern) => {
		if (value === '') {
			return true;
		}
		return pattern.test(value);
	};
	const isValidPassword = (pass) => {
		setPasswordError('');
		if (pass.length < 8) {
			setPasswordError('Password must be 8 character long.')
			return false;
		}
		return true
	}
	const isValidConfirmPassword = (confirmPass) => {
		setConfirmPasswordError('');
		if (confirmPass !== password) {
			setConfirmPasswordError('Passwords do not match.');
			return false
		}
		return true
	}
	const isValidName = (value, name) => {
		if (value === '') {
			switch (name) {
				case 'firstName': setFirstNameError('Please enter first name!');
					break;
				case 'lastName': setLastNameError('Please enter last name!');
					break;
				case 'brandName': setBrandNameError('Please enter brand name!');
					break;
			}
			return false;
		}
		return true;
	}

	if (data) {
		if (data.addUser.response !== userExist) {
			setUserExist(data.addUser.response);
			setBannerStatus('critical')
			setBannerError(data.addUser.response);
		}
	}


	const privacyPolicy = (<PrivacyPolicy />);
	const termsUsed = (<TermsUsed />);

	return (
		<Page>
			{bannerError ? <Banner title={bannerError} status={bannerStatus} onDismiss={() => { setBannerError('') }}></Banner> : ''}
			<br />
			<Form onSubmit={handleSubmit}>
				<Layout>
					<Layout.AnnotatedSection
						title="Welcome to Marketcube.io"
						description="Join the world's largest dropshipping community and sell to millions of businesses and customers worldwide"
					>
						<Card sectioned>
							<FormLayout>
								<TextField
									value={firstName}
									onChange={handleFirstNameChange}
									label="First Name*"
									type="text"
									error={firstNameError}
								/>
								<TextField
									value={lastName}
									onChange={handleLastNameChange}
									label="Last Name*"
									type="text"
									error={lastNameError}
								/>
								<TextField
									value={email}
									onChange={handleEmailChange}
									label="Email*"
									type="email"
									id="emailField"
									error={emailError}
								/>
								<TextField
									value={password}
									onChange={handlePasswordChange}
									label="Password*"
									type="password"
									error={passwordError}
								/>
								<TextField
									value={confirmPassword}
									onChange={handleConfirmPasswordChange}
									label="Confirm Password*"
									type="password"
									error={confirmPasswordError}
								/>
								<TextField
									value={brandName}
									onChange={handleBrandNameChange}
									label="Brand Name*"
									type="text"
									error={brandNameError}
								/>
							</FormLayout>
							<br />
							<Stack wrap={true}>
								<Checkbox
									checked={companyPolicy}
									value={companyPolicy}
									onChange={handleCompanyPolicyChange}
									id="agreeCheckbox"
								/>
								<label htmlFor="agreeCheckbox" onClick={handleCompanyPolicyChange}>I agree with the {privacyPolicy} & {termsUsed}.</label>
							</Stack>
						</Card>
						<PageActions
							primaryAction={{
								content: 'Register',
								submit: true
							}}
						/>
					</Layout.AnnotatedSection>
				</Layout>
			</Form>
			{data && data.addUser && data.addUser.email && localStorage.setItem('registered', true)}
			{data && data.addUser && data.addUser.email && <Redirect to="/login" />}
		</Page>
	);
}

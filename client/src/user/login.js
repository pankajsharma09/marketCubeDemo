import React, { useState } from 'react';
import { Redirect } from 'react-router-dom'
import { Card, Layout, Form, FormLayout, TextField, PageActions, FooterHelp, Link, Page, Banner } from '@shopify/polaris';
import { gql } from 'apollo-boost';
import { useMutation } from '@apollo/react-hooks';

const LoginMutation = gql`
    mutation LoginMutation($email: String!,$password : String!){
      userAuthenticate(email:$email,password:$password){
		email,
		password,
		response
        }
    }`

export default function LoginForm() {
	const [addUser, { loading, error, data }] = useMutation(LoginMutation);
//	const addUser ={}, loading = {}, error = {}, data = {}
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [bannerStatus, setBannerStatus] = useState('critical');
	const [bannerMessage, setBannerMessage] = useState('');
	const [validUser, setValidUser] = useState('');

	const handleSubmit = (e) => {
		
		if (email.trim() === '' || password.trim() === '') {
			setBannerMessage('Both email and password is required');
			setBannerStatus('critical')
			return false;
		}
		
		setValidUser('');
		setBannerMessage('');
		e.preventDefault();
		console.log(email, password);
		addUser({ variables: { email: email, password: password } });
		
	};
	const handleEmailChange = (value) => setEmail(value);
	const handlePasswordChange = (value) => setPassword(value);
	const isRegistered = localStorage.getItem('registered');
	if (isRegistered) {
		setBannerMessage('You are successfully registered.');
		setBannerStatus('success');
		localStorage.removeItem('registered');
	}
	
	if (data) {
		if (data.userAuthenticate.response === 'INVALID' && data.userAuthenticate.response !== validUser) {
			setValidUser(data.userAuthenticate.response);
			setBannerStatus('critical')
			setBannerMessage(`${data.userAuthenticate.response} CREDENTIALS!`);
		}
		else if (data.userAuthenticate.response === 'VALID') {
			
			return (<Redirect to='/user-list' />)
		}
	}

	return (
			
		<Page>
			{bannerMessage ? <Banner title={bannerMessage} status={bannerStatus}></Banner> : ''}
			<br />
			<Form onSubmit={handleSubmit}>
				<Layout>
					<Layout.AnnotatedSection
						title="Log in to your MarketCube Dashboard"
						description="Access your dashboard to manage products and orders"
					>
						<Card sectioned>
							<FormLayout>
								<TextField
									value={email}
									onChange={handleEmailChange}
									label="Username"
									name="email"
								/>
								<TextField
									value={password}
									onChange={handlePasswordChange}
									label="Password"
									type="password"
									name="password"
								/>
							</FormLayout>
						</Card>
						<PageActions
							primaryAction={{
								content: 'Login',
								submit: true
							}}
							secondaryActions={[
								{
									content: 'Forgotten Password',
									plain: true,
									ariaPressed: true,
									url: '/'
								},
								{
									content: 'Resend Verification Email',
									plain: true,
									ariaPressed: true,
									url: '/'
								},
							]}
						/>
					</Layout.AnnotatedSection>
				</Layout>
			</Form>
			<FooterHelp>
				MarketCube Vendor?{' '}
				<Link url="/register">
					Register here
			</Link>
			</FooterHelp>
		</Page>
	);
}

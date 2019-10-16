import React, {useState} from 'react';
import {Card, Layout, Form, FormLayout, TextField, PageActions, FooterHelp, Link, Page} from '@shopify/polaris';
import {gql} from 'apollo-boost';
import { useMutation } from '@apollo/react-hooks';

const LoginMutation = gql`
    mutation LoginMutation($email: String!,$password : String!){
      userAuthenticate(email:$email,password:$password){
		email,
		password,
		response
        }
    }
    `

export default function LoginForm() {
  const [addUser, { loading, error, data }] = useMutation(LoginMutation);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  console.log('data',data);
  if (loading) return <p>Loading...</p>;
  if (error) {
	  return (
		  <p>${error}</p>
	  )
	};
  const handleSubmit = (e) => {
	setPassword('');
    e.preventDefault();
    addUser({ variables: { email:email,password:password } });
  };
  const handleEmailChange = (value) => setEmail(value);
  const handlePasswordChange = (value) => setPassword(value);
  return (
	  <Page>
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
							type="email"
							/>
							<TextField
							value={password}
							onChange={handlePasswordChange}
							label="Password"
							type="password"
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
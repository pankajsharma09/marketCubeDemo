import React, {useCallback, useState} from 'react';
import {Card, Layout, Form, FormLayout, TextField, PageActions, FooterHelp, Link, Page} from '@shopify/polaris';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = useCallback((_event) => {
	setEmail('');
	setPassword('');
  }, []);
  

  const handleEmailChange = useCallback((value) => setEmail(value), []);
  const handlePasswordChange = useCallback((value) => setPassword(value), []);

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
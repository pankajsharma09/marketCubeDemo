import React, {useCallback, useState} from 'react';
import {Card, Layout, Form, FormLayout, TextField, PageActions, FooterHelp, Link, Checkbox, Button, Stack, Page} from '@shopify/polaris';

export default function RegisterForm() {
  const [companyPolicy, setCompanyPolicy] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [first_name,setFirstName] = useState('');
  const [last_name,setLastName] = useState('');
  const [brand_name,setBrandName] = useState('');
  const handleSubmit = useCallback((_event) => {

  const handleSubmit = (event) => {
	setEmail('');
	setPassword('');
	setFirstName('');
	setLastName('');
	setBrandName('');
    setCompanyPolicy(false);
  };

    const handleCompanyPolicyChange =
        (value) => {
    const handleCompanyPolicyChange = (value) => {
            const checkBoxValue = document.getElementById("agreeCheckbox").value;
            if (checkBoxValue !== "false") {
                setCompanyPolicy(false)
            }
            else {
                setCompanyPolicy(true)
            }
        }

  const handleEmailChange = (value) => setEmail(value);
  const handlePasswordChange = (value) => setPassword(value);
  const handleFirstNameChange = (value) => setFirstName(value);
  const handleLastNameChange = (value) => setLastName(value);
  const handleBrandNameChange = (value) => setBrandName(value);
        };

  const handleEmailChange = (value) => setEmail(value);
  const handlePasswordChange = (value) => setPassword(value);

  const privacyPolicy = ( <Button plain>Privacy Policy</Button> );
  const termsUsed = ( <Button plain>Terms of Use</Button> );

  return (
	  <Page>
		<Form onSubmit={handleSubmit}>
			<Layout>
				<Layout.AnnotatedSection
				title="Welcome to Marketcube.io"
				description="Join the world's largest dropshipping community and sell to millions of businesses and customers worldwide"
				>
					<Card sectioned>
						<FormLayout>
						    <TextField
							value={first_name}
							onChange={handleFirstNameChange}
							label="First Name*"
							type="text"
							/>
							 <TextField
							value={last_name}
							onChange={handleLastNameChange}
							label="Last Name*"
							type="text"
							/>
							<TextField
							value={email}
							onChange={handleEmailChange}
							label="Email*"
							type="email"
							/>
							 <TextField
							value={brand_name}
							onChange={handleBrandNameChange}
							label="Brand Name*"
							type="text"
							/>
							<TextField
							value={password}
							onChange={handlePasswordChange}
							label="Password*"
							type="password"
							/>
                            <TextField
							value={password}
							onChange={handlePasswordChange}
							label="Confirm Password*"
							type="password"
							/>
						</FormLayout>
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
	</Page>
  );
}
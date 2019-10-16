import React, {useCallback, useState} from 'react';
import {Card, Layout, Form, FormLayout, TextField, PageActions, FooterHelp, Link, Checkbox, Button, Stack, Page} from '@shopify/polaris';

export default function RegisterForm() {
  const [companyPolicy, setCompanyPolicy] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = useCallback((_event) => {
	setEmail('');
	setPassword('');
    setCompanyPolicy(false);
  }, []);

    const handleCompanyPolicyChange = useCallback(
        (value) => {
            const checkBoxValue = document.getElementById("agreeCheckbox").value;
            if (checkBoxValue !== "false") {
                setCompanyPolicy(false)
            }
            else {
                setCompanyPolicy(true)
            }
        },
        [],
    );

  const handleEmailChange = useCallback((value) => setEmail(value), []);
  const handlePasswordChange = useCallback((value) => setPassword(value), []);

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
							value={email}
							onChange={handleEmailChange}
							label="Email*"
							type="email"
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
import React, { useState} from 'react';
import {Card, Layout, Form, FormLayout, TextField, PageActions, FooterHelp, Link, Checkbox, Button, Stack, Page} from '@shopify/polaris';
import {gql} from 'apollo-boost';
import { useMutation } from '@apollo/react-hooks';

const RegisterMutation = gql`
    mutation RegisterMutation($email: String!,$password : String!,$firstName : String!,$lastName : String!,$brandName:String!){
		addUser(email:$email,password:$password,firstName:$firstName,lastName:$lastName,brandName:$brandName){
			email,
			password,
			response
			}
		}`
export default function RegisterForm() {
  const [addNewUser, { loading, error, data }] = useMutation(RegisterMutation);
  const [companyPolicy, setCompanyPolicy] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName,setFirstName] = useState('');
  const [lastName,setLastName] = useState('');
  const [brandName,setBrandName] = useState('');
  console.log('data',data)
//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>Error..</p>;
  const handleSubmit = (e) => {
	setEmail('');
	setPassword('');
	setFirstName('');
	setLastName('');
	setBrandName('');
	setCompanyPolicy(false);
	e.preventDefault();
	//console.log(lastName);
    addNewUser({ variables: { email:email,password:password,firstName:firstName,lastName:lastName,brandName:brandName } });
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

  const handleEmailChange = (value) => setEmail(value);
  const handlePasswordChange = (value) => setPassword(value);
  const handleFirstNameChange = (value) => setFirstName(value);
  const handleLastNameChange = (value) => setLastName(value);
  const handleBrandNameChange = (value) => setBrandName(value);

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
							value={firstName}
							onChange={handleFirstNameChange}
							label="First Name*"
							type="text"
							/>
							 <TextField
							value={lastName}
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
							value={brandName}
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
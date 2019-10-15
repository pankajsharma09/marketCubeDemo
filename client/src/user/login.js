import React, {useCallback, useState} from 'react';
import {Card, Layout, Button, Form, FormLayout, TextField, Page} from '@shopify/polaris';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = useCallback((_event) => {
    setEmail('');
  }, []);

  const handleEmailChange = useCallback((value) => setEmail(value), []);
  const handlePasswordChange = useCallback((value) => setPassword(value), []);

  return (
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
                        label="Email"
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
            </Layout.AnnotatedSection>
        </Layout>
    </Form>
  );
}
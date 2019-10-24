import React from 'react';
import TestRenderer from 'react-test-renderer';
import { MockedProvider } from '@apollo/react-testing';
import { cleanup } from '@testing-library/react';
import { gql } from 'apollo-boost';
import Login from '../user/login';
import { AppProvider } from '@shopify/polaris';
import Adapter from 'enzyme-adapter-react-16';
import { configure, mount } from 'enzyme';

configure({ adapter: new Adapter() });

describe('Login Component', () => {
    beforeEach(cleanup);

    window.matchMedia = jest.fn().mockImplementation(query => {
        return {
            matches: false,
            media: query,
            onchange: null,
            addListener: jest.fn(),
            removeListener: jest.fn(),
        };
    });

    const LOGIN_MUTATION = gql`
    mutation LoginMutation($email: String!,$password : String!){
      userAuthenticate(email:"test1@gmail.com",password:"12345678"){
		email,
		response
        }
    }`

    const mocks = [
        {
            request: {
                query: LOGIN_MUTATION,
            },
            result: {
                "data": {
                    "userAuthenticate": {
                        "email": "test10@gmail.com",
                        "response": "VALID"
                    }
                },
            },
        }
    ];

    const component = mount(
        <MockedProvider mocks={mocks} addTypename={false}>
            <AppProvider>
                <Login />
            </AppProvider>
        </MockedProvider>
    );

    it('should match the snapshot', async () => {
        let loginSnap;
        await TestRenderer.act(async () => {
            loginSnap = TestRenderer.create(
                <MockedProvider mocks={mocks} addTypename={false}>
                    <AppProvider>
                        <Login />
                    </AppProvider>
                </MockedProvider>
            );
        });
        expect(loginSnap).toMatchSnapshot();
    });

    it('should match the title', () => {

        const heading = component.find('h2');
        expect(heading.props().children).toEqual('Log in to your MarketCube Dashboard');
    });

    it('should match the description', () => {

        console.log('loginSnap', component.debug())
        const description = component.find('p');
        expect(description.props().children).toEqual('Access your dashboard to manage products and orders');
    });


    it('should match number of text fields', () => {

        const textField = component.find('TextField');
        expect(textField.length).toEqual(2);
    });

    it('should have email & password', () => {

        expect(component.find('TextField[name="email"]').length).toEqual(1);
        expect(component.find('TextField[name="password"]').length).toEqual(1);
    });

});

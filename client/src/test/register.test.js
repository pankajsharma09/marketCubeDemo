import React from 'react';
import { MockedProvider } from '@apollo/react-testing';
import { cleanup, render } from '@testing-library/react';
import Register,{ RegisterMutation } from '../user/registration';
import { AppProvider } from '@shopify/polaris';
import Adapter from 'enzyme-adapter-react-16';
import { configure, mount } from 'enzyme';

configure({ adapter: new Adapter() });

describe('Register Component', () => {
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
    const registerUser = { email: 'aman@23.com' };
    const mocks = [
        {
            request: {
                query: RegisterMutation,
                variables: { email: 'aman@23.com', password: '123456', firstName: 'Aman', lastName: 'Rattan', brandName: 'abc' },
            },
            data: {
                addUser: {
                    registerUser
                }
            },
        },
    ];
    const component = mount(
        <MockedProvider mocks={mocks} addTypename={false}>
            <AppProvider>
                <Register />
            </AppProvider>
        </MockedProvider>
    );

    // it('should render loading state initially', () => {
    //     const button = component.find('input[type="button"]');
    //     button.simulate('click') // fires the mutation
    //     const tree = component.toJSON();
    //     expect(tree.children).toContain('Loading...');
    // });

    it('should match the snapshot', () => {
        const registerSnap = render(
            <MockedProvider mocks={mocks} addTypename={false}>
                <AppProvider>
                    <Register />
                </AppProvider>
            </MockedProvider>
        );

        expect(registerSnap).toMatchSnapshot();
    });

    it('should match the title', () => {
        const heading = component.find('h2');
        expect(heading.props().children).toEqual('Welcome to Marketcube.io');
    });

    it('should match the description', () => {
        const description = component.find('p');
        expect(description.props().children).toEqual('Join the world\'s largest dropshipping community and sell to millions of businesses and customers worldwide');
    });


    it('should match number of text fields', () => {
        const textField = component.find('TextField');
        expect(textField.length).toEqual(6);
    });
    it('should contain checkbox', () => {
        expect(component.find('input[type="checkbox"]').length).toEqual(1);
    });

});
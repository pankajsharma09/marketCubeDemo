import React from 'react';
import renderer from 'react-test-renderer';

import Login from '../user/login';
import { AppProvider } from '@shopify/polaris';

window.matchMedia = jest.fn().mockImplementation(query => {
  return {
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
  };
});

it('renders correctly when there are no items', () => {
  const tree = renderer.create(
    <AppProvider>
        <Login />
    </AppProvider>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

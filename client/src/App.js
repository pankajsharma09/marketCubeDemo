import React from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import ApolloClient from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import { getMainDefinition } from 'apollo-utilities';
import { split } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { WebSocketLink } from 'apollo-link-ws';
import { InMemoryCache } from 'apollo-cache-inmemory';

import { AppProvider, Frame, TopBar, Page, Caption, Button, TextStyle } from "@shopify/polaris";
import en from '@shopify/polaris/locales/en.json';
import "@shopify/polaris/styles.css";

import Login from "./user/login"
import Register from "./user/registration"
import UserList from "./user/userList"
import ProductList from "./product/productList"

const httpLink = new HttpLink({
    uri: process.env.REACT_APP_APOLLO_GRAPHQL_URI,
});


const wsLink = new WebSocketLink({
    uri: process.env.REACT_APP_APOLLO_SUBSCRIPTION_URI,
    options: {
      reconnect: true,
    },
});



const link = split(
	({ query }) => {
		const { kind, operation } = getMainDefinition(query);
		return (
			kind === 'OperationDefinition' && operation === 'subscription'
		);
	},
	wsLink,
	httpLink,
);

const cache = new InMemoryCache();
const client = new ApolloClient({ link, cache });

const theme = {
	colors: {
		topBar: {
			background: "#36454f"
		}
	},
	logo: {
		width: 200,
		topBarSource:
			"images/logo_and_text.png",
		contextualSaveBarSource:
			"images/logo_and_text.png",
		url: "/",
		accessibilityLabel: "Jaded Pixel"
	}
};

const topBarMarkup = <TopBar />;

function App(props) {
	console.log(process.env.REACT_APP_APOLLO_GRAPHQL_URI)
	return (
		<ApolloProvider client={client}>
			<AppProvider
				theme={theme}
				i18n={en}
			>
				<br />
				<Frame topBar={topBarMarkup} >
					<Router>
						<Route exact path="/" render={(props) => <Redirect to="/login" />} />
						<Route path="/login" component={Login} />
						<Route path="/register" component={Register} />
						<Route path="/user-list" component={UserList} />
						<Route path="/product-list" component={ProductList} />
						</Router>
					<br />
					<div style={{ textAlign: "center" }}>
						<Caption>
							<TextStyle variation="subdued">Powered by &nbsp;
								<Button external plain ariaPressed url='https://www.marketcube.io/'>
									Marketcube.io
								</Button>
							</TextStyle>
						</Caption>
					</div>
				</Frame>
			</AppProvider>
		</ApolloProvider>
	);
}

export default App;
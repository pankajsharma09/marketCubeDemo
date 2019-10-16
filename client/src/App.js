import React from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

import { AppProvider, Frame, TopBar, Page,Caption, Button, TextStyle } from "@shopify/polaris";
import en from '@shopify/polaris/locales/en.json';
import "@shopify/polaris/styles.css";

import Login from "./user/login"
import Register from "./user/registration"

const client = new ApolloClient({ uri: 'http://localhost:9000/graphql' });

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
	return (
		<ApolloProvider client={client}>
			<AppProvider
				theme={theme}
				i18n={en}
			>
				<br/>
				<Frame topBar={topBarMarkup} >
					<Router>
						<Route exact path="/" render={(props) => <Redirect to="/login" />} />
						<Route path="/login" component={Login} />
						<Route path="/register" component={Register} />
					{/* <Route path="/user-list" component={UserList} /> */}
					</Router>
					<br/>
					<div style={{textAlign: "center"}}>
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
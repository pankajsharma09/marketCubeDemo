import React from "react";
import { BrowserRouter as Router, Link, Route, Redirect } from "react-router-dom";

import { AppProvider, Frame, TopBar, Page, Caption, Button, TextStyle } from "@shopify/polaris";
import en from '@shopify/polaris/locales/en.json';
import "@shopify/polaris/styles.css";

import Login from "./user/login"
import Register from "./user/registration"

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
		accessibilityLabel: "MarketCube"
	}
};

const topBarMarkup = <TopBar />;

function App(props) {
	return (
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
	);
}

export default App;
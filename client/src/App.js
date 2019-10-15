import React from "react";
import { BrowserRouter as Router, Link, Route, Redirect } from "react-router-dom";

import { AppProvider, Frame, TopBar, Page } from "@shopify/polaris";
import en from '@shopify/polaris/locales/en.json';
import "@shopify/polaris/styles.css";

import Login from "./user/login"

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
		<AppProvider
			theme={theme}
			i18n={en}
		>
			<Frame topBar={topBarMarkup} >
				<Page>
					<Router>
						<Route exact path="/" render={(props) => <Redirect to="/login" />} />
						<Route path="/login" component={Login} />
						{/* <Route path="/register" component={Register} />
                    <Route path="/user-list" component={UserList} /> */}
					</Router>
				</Page>
			</Frame>
		</AppProvider>
	);
}

export default App;
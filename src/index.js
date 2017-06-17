import React from "react";
import ReactDOM from "react-dom";
import {Provider} from "react-redux";
import {BrowserRouter as Router, Route, Redirect} from "react-router-dom";

import {createStore, applyMiddleware} from "redux";

import thunkMiddleware from "redux-thunk";
import {createLogger} from "redux-logger";

import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";

import injectTapEventPlugin from "react-tap-event-plugin";

import registerServiceWorker from "./registerServiceWorker";
import CharacterSheet from "./components/characterSheet";
import {Home} from "./components/home";
import {Login} from "./components/login";
import {d20App, auth, isAuthenticated} from "./components/app"

import "./index.css";

const loggerMiddleware = createLogger();

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

registerServiceWorker();

let store = createStore(
    d20App,
    applyMiddleware(thunkMiddleware, loggerMiddleware),
);

function PrivateRoute({component: Component, authed, ...rest}) {
    return (
        <Route
            {...rest}
            render={props =>
                isAuthenticated() === true
                    ? <Component {...props} />
                    : <Redirect
                          to={{
                              pathname: "/login",
                              state: {from: props.location},
                          }}
                      />}
        />
    );
}

function PublicRoute({component: Component, authed, ...rest}) {
    return (
        <Route
            {...rest}
            render={props =>
                isAuthenticated() === false
                    ? <Component {...props} />
                    : <Redirect to="/" />}
        />
    );
}

class App extends React.Component {
    state = {};

    componentDidMount() {
        this.removeListener = auth.onAuthStateChanged(user => {
            if (user) {
                console.log("have user");
                this.setState({
                    authed: true,
                    loading: false,
                });
            } else {
                console.log("no user");
                this.setState({
                    authed: false,
                    loading: false,
                });
            }
        });
    }

    componentWillUnmount() {
        this.removeListener();
    }

    render() {
        return (
            <MuiThemeProvider>
                <Provider store={store}>
                    <Router>
                        <div>
                            <PublicRoute
                                authed={this.state.authed}
                                exact
                                path="/login"
                                component={Login}
                            />
                            <PrivateRoute
                                authed={this.state.authed}
                                path="/character/:name"
                                component={CharacterSheet}
                            />
                            <PrivateRoute
                                authed={this.state.authed}
                                exact
                                path="/"
                                component={Home}
                            />
                        </div>
                    </Router>
                </Provider>
            </MuiThemeProvider>
        );
    }
}

ReactDOM.render(<App />, document.getElementById("root"));

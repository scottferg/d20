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
import AddItem from "./components/addItem";
import AddSpell from "./components/addSpell";
import CharacterSheet from "./components/characterSheet";
import CreateCharacter from "./components/createCharacter";
import SelectClass from "./components/selectClass";
import SelectBackground from "./components/selectBackground";
import SelectAbilityScores from "./components/selectAbilityScores";
import SelectSkills from "./components/selectSkills";
import {SelectDetails, EditDetails} from "./components/selectDetails";
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
                            <PublicRoute
                                authed={this.state.authed}
                                exact
                                path="/index.html"
                                component={Login}
                            />
                            <PrivateRoute
                                authed={this.state.authed}
                                exact
                                path="/character/:name/items/add"
                                component={AddItem}
                            />
                            <PrivateRoute
                                authed={this.state.authed}
                                exact
                                path="/character/:name/spells/add"
                                component={AddSpell}
                            />
                            <PrivateRoute
                                authed={this.state.authed}
                                exact
                                path="/character/:name/details/edit"
                                component={EditDetails}
                            />
                            <PrivateRoute
                                authed={this.state.authed}
                                exact
                                path="/character/new/race"
                                component={CreateCharacter}
                            />
                            <PrivateRoute
                                authed={this.state.authed}
                                exact
                                path="/character/new/class"
                                component={SelectClass}
                            />
                            <PrivateRoute
                                authed={this.state.authed}
                                exact
                                path="/character/new/background"
                                component={SelectBackground}
                            />
                            <PrivateRoute
                                authed={this.state.authed}
                                exact
                                path="/character/new/abilities"
                                component={SelectAbilityScores}
                            />
                            <PrivateRoute
                                authed={this.state.authed}
                                exact
                                path="/character/new/skills"
                                component={SelectSkills}
                            />
                            <PrivateRoute
                                authed={this.state.authed}
                                exact
                                path="/character/new/details"
                                component={SelectDetails}
                            />
                            <PrivateRoute
                                authed={this.state.authed}
                                exact
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

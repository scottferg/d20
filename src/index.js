import React from "react";
import ReactDOM from "react-dom";
import {Provider} from "react-redux";
import {BrowserRouter as Router, Route, Link} from "react-router-dom";

import {connect} from "react-redux";

import {createStore, applyMiddleware} from "redux";

import thunkMiddleware from "redux-thunk";
import {createLogger} from "redux-logger";

import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";

import injectTapEventPlugin from "react-tap-event-plugin";

import registerServiceWorker from "./registerServiceWorker";
import CharacterSheet from "./components/characterSheet";
import Portrait from "./components/portrait";
import d20App from "./components/app";

import "./index.css";

const loggerMiddleware = createLogger();

// TODO: Multiple characters from server
//      - Need to toggle "characterSelected" state to indicate whether or not
//        CharacterSheet should refresh
// TODO: Responsive
// TODO: Spell preparation for Wizard and Clerics
// TODO: Spell slots
// TODO: Character creation

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

registerServiceWorker();

let store = createStore(
    d20App,
    applyMiddleware(thunkMiddleware, loggerMiddleware),
);

const receiveCharacterList = json => {
    return {
        type: "GET_CHARACTER_LIST_SUCCESS",
        isLoading: false,
        list: json,
    };
};

const characterListRequested = () => {
    return {
        type: "CHARACTER_LIST_REQUESTED",
        isLoading: true,
    };
};

export function fetchCharacterList() {
    return function(dispatch) {
        dispatch(characterListRequested());

        var url = "/c";

        if (window.location.href.includes("localhost")) {
            url = "http://localhost:8080" + url;
        } else if (window.location.href.includes("192.")) {
            url = "http://192.168.86.185:8080" + url;
        }

        return fetch(url)
            .then(response => response.json())
            .then(json => dispatch(receiveCharacterList(json)));
    };
}

const Title = () =>
    <div id="title">
        d20
    </div>;

class HomeComponent extends React.Component {
    render() {
        if (this.props.list !== undefined) {
            var characterList = this.props.list.map(function(c, index) {
                var route = "/" + c.name.toLowerCase();

                return (
                    <div className="loader-container">
                        <Link
                            className="loader-portrait"
                            key={index}
                            to={route}>
                            <Portrait character={c} />
                        </Link>
                    </div>
                );
            });

            return (
                <div id="home">
                    <Title />
                    {characterList}
                </div>
            );
        } else {
            this.props.dispatch(fetchCharacterList());
            return null;
        }
    }
}

const Home = connect((s, p) => {
    return {list: s.characterReducer.list};
})(HomeComponent);

const App = () =>
    <MuiThemeProvider>
        <Provider store={store}>
            <Router>
                <div>
                    <Route exact path="/" component={Home} />
                    <Route path="/:name" component={CharacterSheet} />
                </div>
            </Router>
        </Provider>
    </MuiThemeProvider>;

ReactDOM.render(<App />, document.getElementById("root"));

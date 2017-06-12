import React from "react";
import ReactDOM from "react-dom";
import {Provider} from "react-redux";
import {BrowserRouter as Router, Route} from "react-router-dom";

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

// TODO: Spell preparation for Wizard and Clerics
// TODO: Spell slots
// TODO: AC for Combat module
// TODO: Remove WebPack cache busting for resources
// TODO: Character creation
// TODO: Responsive
//      - Ability Scores, Status, and Combat should display below portrait
//        on phones. This will require re-laying out via JS
// TODO: Multiple characters from server
//      - Logic is currently janky. Should be cleaner updates of Redux state
//        between page transitions.

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

const characterSelected = () => {
    return {
        type: "CHARACTER_SELECTED",
        selected: true,
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
    onCharacterSelect(route) {
        this.props.dispatch(characterSelected());
        this.props.history.push(route);
    }

    render() {
        if (this.props.list !== undefined) {
            var that = this;
            var characterList = this.props.list.map(function(c, index) {
                var route = "/" + c.name.toLowerCase();

                return (
                    <li key={index} className="loader-container" onClick={() => that.onCharacterSelect(route)}>
                        <Portrait character={c} />
                    </li>
                );
            });

            return (
                <div id="home">
                    <Title />
                    <ul id="character-list">
                        {characterList}
                    </ul>
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

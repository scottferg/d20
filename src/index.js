import React from "react";
import ReactDOM from "react-dom";
import {Provider} from "react-redux";
import {createStore, applyMiddleware} from "redux";
import thunkMiddleware from "redux-thunk";
import {createLogger} from "redux-logger";

import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";

import injectTapEventPlugin from "react-tap-event-plugin";

import registerServiceWorker from "./registerServiceWorker";
import CharacterSheet from "./components/characterSheet";
import d20App from "./components/app";

import "./index.css";

const loggerMiddleware = createLogger();

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

const App = () =>
    <MuiThemeProvider>
        <Provider store={store}>
            <CharacterSheet />
        </Provider>
    </MuiThemeProvider>;

ReactDOM.render(<App />, document.getElementById("root"));

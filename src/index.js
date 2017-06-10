import React from "react";
import ReactDOM from "react-dom";
import {Provider} from "react-redux";
import {createStore} from "redux";

import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";

import injectTapEventPlugin from "react-tap-event-plugin";

import CharacterSheet from "./components/characterSheet";
import d20App from "./components/app";

import "./index.css";

// TODO: Responsive
// TODO: Fullscreen on tablet/phone

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

let store = createStore(d20App);

const App = () =>
    <MuiThemeProvider>
        <Provider store={store}>
            <CharacterSheet />
        </Provider>
    </MuiThemeProvider>;

ReactDOM.render(<App />, document.getElementById("root"));

import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

import { 
    createStore, 
    applyMiddleware 
} from "redux";

import thunkMiddleware from "redux-thunk";
import { createLogger } from "redux-logger";

import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";

import injectTapEventPlugin from "react-tap-event-plugin";

import registerServiceWorker from "./registerServiceWorker";
import CharacterSheet from "./components/characterSheet";
import d20App from "./components/app";

import "./index.css";

const loggerMiddleware = createLogger();

// TODO: Multiple characters from server
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

const Home = () => 
    <div id="home">
        <Link to="/varis">Varis</Link>
    </div>

const App = () =>
    <MuiThemeProvider>
        <Provider store={store}>
            <Router>
                <div>
                    <Route exact path="/" component={Home}/>
                    <Route path="/:name" component={CharacterSheet}/>
                </div>
            </Router>
        </Provider>
    </MuiThemeProvider>;

ReactDOM.render(<App />, document.getElementById("root"));

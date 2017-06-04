import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { createStore } from 'redux'

import CharacterSheet from './components/characterSheet'
import d20App from './components/app'

import './index.css';

// TODO: Player class
// TODO: SASS/LESS
// TODO: Responsive
// TODO: Fullscreen on tablet/phone

let store = createStore(d20App)

ReactDOM.render(
    <Provider store={store}>
        <CharacterSheet />
    </Provider>,
    document.getElementById('root')
);

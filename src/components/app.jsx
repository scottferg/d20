import {combineReducers} from "redux";
import {firebaseStateReducer} from "react-redux-firebase";

import firebase from "firebase";

import {spellInfoReducer} from "../reducers/spells.js";
import {itemInfoReducer} from "../reducers/item.js";
import {characterReducer} from "../reducers/character.js";

let config = {
    apiKey: "AIzaSyBT4qdrlbonYOk9tmO9kSOzS_sYpxgRxVU",
    authDomain: "d20-drzaius-io.firebaseapp.com",
    databaseURL: "https://d20-drzaius-io.firebaseio.com",
    projectId: "d20-drzaius-io",
    storageBucket: "d20-drzaius-io.appspot.com",
    messagingSenderId: "1029083345244",
};

//the root app just in case we need it
export const firebaseApp = firebase.initializeApp(config);

export const db = firebaseApp.database(); //the real-time database
export const auth = firebaseApp.auth(); //the firebase auth namespace
export const provider = new firebase.auth.GoogleAuthProvider();

export const storageKey = "D20_STORE_KEY";

export const isAuthenticated = () => {
    return !!auth.currentUser || !!localStorage.getItem(storageKey);
};

export const d20App = combineReducers({
    firebase: firebaseStateReducer,
    spellInfoReducer: spellInfoReducer,
    itemInfoReducer: itemInfoReducer,
    characterReducer: characterReducer,
});

import {combineReducers} from "redux";

import firebase from "firebase";

import {spellInfoReducer} from "../reducers/spells";
import {itemInfoReducer} from "../reducers/item";
import {characterReducer} from "../reducers/character";
import {createCharacterReducer} from "../reducers/createCharacter";
import {backgroundReducer} from "../reducers/background";

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
    spellInfoReducer: spellInfoReducer,
    itemInfoReducer: itemInfoReducer,
    backgroundReducer: backgroundReducer,
    characterReducer: characterReducer,
    createCharacterReducer: createCharacterReducer,
});

import {auth, db} from "../components/app";

import Player from "../models/player";

export const fetchCharacter = name => {
    return function(dispatch) {
        dispatch(characterRequested());

        var userId = auth.currentUser.uid;
        return db
            .ref("/users/" + userId + "/characters/" + name)
            .once("value")
            .then(snapshot => dispatch(receiveCharacter(name, snapshot.val())));
    };
};

export const receiveCharacterList = json => {
    return {
        type: "GET_CHARACTER_LIST_SUCCESS",
        isLoading: false,
        list: json,
    };
};

export const fetchCharacterList = () => {
    return function(dispatch) {
        dispatch(characterListRequested());

        var userId = auth.currentUser.uid;
        return db 
            .ref("/users/" + userId + "/characters")
            .once("value")
            .then(snapshot => dispatch(receiveCharacterList(snapshot.val())));
    };
}

export const characterListRequested = () => {
    return {
        type: "CHARACTER_LIST_REQUESTED",
        isLoading: true,
    };
};

export const characterSelected = () => {
    return {
        type: "CHARACTER_SELECTED",
        selected: true,
    };
};

export const receiveCharacter = (name, json) => {
    return {
        type: "GET_CHARACTER_SUCCESS",
        isLoading: false,
        character: new Player(json),
    };
};

export const characterRequested = () => {
    return {
        type: "CHARACTER_REQUESTED",
        isLoading: true,
        selected: false,
    };
};

export const fetchCharacterStatus = (name) => {
    return function(dispatch) {
        dispatch(characterStatusRequested());

        var userId = auth.currentUser.uid;
        return db
            .ref(
                "/users/" +
                    userId +
                    "/statuses/" +
                    name.toLowerCase(),
            )
            .once("value")
            .then(snapshot => dispatch(receiveCharacterStatus(snapshot.val())));
    };
};

export const receiveCharacterStatus = (stat) => {
    return {
        type: "RECEIVE_CHARACTER_STATUS",
        characterStatus: stat,
    };
};

export const characterStatusRequested = () => {
    return {
        type: "CHARACTER_STATUS_REQUESTED",
    };
};

export const setHP = (characterStatus, hp, name) => {
    return function(dispatch) {
        characterStatus.hp = characterStatus.hp + hp;

        if (characterStatus.hp < 0) {
            characterStatus.hp = 0;
        } else if (characterStatus.hp > characterStatus.max_hp) {
            characterStatus.hp = characterStatus.max_hp;
        }

        var userId = auth.currentUser.uid;
        return db
            .ref(
                "/users/" +
                    userId +
                    "/statuses/" +
                    name.toLowerCase(),
            )
            .set(characterStatus)
            .then(() => dispatch(updateHP(characterStatus)));
    };
};

const updateHP = (characterStatus) => {
    return {
        type: "UPDATE_CHARACTER_HP",
        characterStatus: characterStatus,
    };
};

export const toggleCreateCharacterDialog = (visible) => {
    return {
        type: "TOGGLE_CREATE_CHARACTER_DIALOG",
        displayCreateDialog: visible,
    };
};

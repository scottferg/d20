import Player from "../models/player"

export const receiveCharacterList = json => {
    return {
        type: "GET_CHARACTER_LIST_SUCCESS",
        isLoading: false,
        list: json,
    };
};

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


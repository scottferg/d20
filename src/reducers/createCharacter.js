import Player from "../models/player"

export const createCharacterReducer = function(
    state = {
        character: new Player(),
        characterStatus: {max_hp: 0, hp: 0, temp_hp: 0},
        raceList: [],
        classList: [],
        backgroundList: [],
        fetching: false,
    },
    action,
) {
    switch (action.type) {
        case "RACE_LIST_REQUESTED":
            return {
                ...state,
                fetching: true,
            };
        case "RECEIVE_RACE_LIST":
            return {
                ...state,
                fetching: false,
                raceList: action.list,
            };
        case "SELECT_RACE":
            return {
                ...state,
                character: action.character,
            };
        case "CLASS_LIST_REQUESTED":
            return {
                ...state,
                fetching: true,
            };
        case "RECEIVE_CLASS_LIST":
            return {
                ...state,
                fetching: false,
                classList: action.list,
            };
        case "SELECT_CLASS":
            return {
                ...state,
                character: action.character,
            };
        case "BACKGROUND_LIST_REQUESTED":
            return {
                ...state,
                fetching: true,
            };
        case "RECEIVE_BACKGROUND_LIST":
            return {
                ...state,
                fetching: false,
                backgroundList: action.list,
            };
        case "SELECT_BACKGROUND":
            return {
                ...state,
                character: action.character,
            };
        case "SET_ABILITY_SCORE":
            var character = state.character;
            character[action.ability] = action.score;

            return {
                ...state,
                character: character,
            };
        default:
            return state;
    }
};

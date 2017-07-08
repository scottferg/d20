import Player from "../models/player";

export const characterReducer = function(
    state = {
        items: [],
        characterStatus: {max_hp: 0, hp: 0, temp_hp: 0},
        selected: false,
        isLoading: false,
        list: [],
        progress: 0,
    },
    action,
) {
    switch (action.type) {
        case "SET_CHARACTER":
            return {
                ...state,
                character: action.character,
            };
        case "UPDATE_CHARACTER_HP":
            return {
                ...state,
                characterStatus: action.characterStatus,
            };
        case "UPDATE_CHARACTER_HP_REQUESTED":
            return {
                ...state,
                characterStatus: action.characterStatus,
            };
        case "RECEIVE_CHARACTER_STATUS":
            return {
                ...state,
                characterStatus: action.characterStatus,
                fetching: false,
            };
        case "CHARACTER_STATUS_REQUESTED":
            return {
                ...state,
                fetching: true,
            };
        case "CHARACTER_REQUESTED":
            return {
                ...state,
            };
        case "GET_CHARACTER_REQUEST":
            return {
                ...state,
            };
        case "GET_CHARACTER_FAILURE":
            return {
                ...state,
                selected: false,
            };
        case "GET_CHARACTER_SUCCESS":
            return {
                ...state,
                character: action.character,
                selected: false,
            };
        case "CHARACTER_SELECTED":
            return {
                ...state,
                character: action.character,
            };
        case "CHARACTER_LIST_REQUESTED":
            return {
                ...state,
                isLoading: true,
            };
        case "GET_CHARACTER_LIST_SUCCESS":
            return {
                ...state,
                isLoading: false,
                list: action.list,
            };
        case "SET_PORTRAIT_URL":
            var character = state.character;

            character.playerImage = action.url;

            return {
                ...state,
                character: character,
            };
        case "SET_UPLOAD_PROGRESS":
            return {
                ...state,
                progress: action.progress,
            };
        case "SET_SKILL":
            var charSkill = new Player(Object.assign({}, state.character));
            charSkill.setSkill(action.skill, action.proficient, action.expertise);

            return {
                ...state,
                character: charSkill,
            };
        default:
            return state;
    }
};

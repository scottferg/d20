import Player from "../models/player";

export const createCharacterReducer = function(
    state = {
        character: new Player(),
        characterStatus: {max_hp: 0, hp: 0, temp_hp: 0},
        raceList: [],
        classList: [],
        backgroundList: [],
        fetching: false,
        progress: 0,
    },
    action,
) {
    var character = state.character;

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
            character[action.ability] = action.score;

            return {
                ...state,
                character: character,
            };
        case "SET_SKILL":
            var charSkill = new Player(Object.assign({}, state.character));
            charSkill.setSkill(action.skill, action.proficient, action.expertise);

            return {
                ...state,
                character: charSkill,
                skills: character.skills
            };
        case "SET_NEW_PORTRAIT_URL":
            character.playerImage = action.url;

            return {
                ...state,
                character: character,
            };
        case "CHARACTER_SAVED":
            var clearPlayer = new Player();

            return {
                ...state,
                character: clearPlayer,
            };
        case "SET_UPLOAD_PROGRESS":
            return {
                ...state,
                progress: action.progress,
            };
        default:
            return state;
    }
};

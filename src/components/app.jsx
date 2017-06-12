import {combineReducers} from "redux";

var spellInfoReducer = function(state = {}, action) {
    switch (action.type) {
        case "SET_SPELL":
            return {
                ...state,
                spell: action.spell,
            };
        default:
            return state;
    }
};

var itemInfoReducer = function(state = {}, action) {
    switch (action.type) {
        case "SET_ITEM":
            return {
                ...state,
                item: action.item,
            };
        default:
            return state;
    }
};

var characterReducer = function(state = { selected: false }, action) {
    switch (action.type) {
        case "SET_CHARACTER":
            return {
                ...state,
                character: action.character,
            };
        case "UPDATE_CHARACTER_HP":
            return {
                ...state,
                character: action.character,
            };
        case "CHARACTER_REQUESTED":
            return {
                ...state,
                isLoading: action.isLoading,
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
                isLoading: action.isLoading,
                character: action.character,
                selected: false,
            };
        case "CHARACTER_LIST_REQUESTED":
            return {
                ...state,
                isLoading: action.isLoading,
            };
        case "GET_CHARACTER_LIST_SUCCESS":
            return {
                ...state,
                isLoading: action.isLoading,
                list: action.list,
            };
        default:
            return state;
    }
};

const d20App = combineReducers({
    spellInfoReducer,
    itemInfoReducer,
    characterReducer,
});

export default d20App;

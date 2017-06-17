export const characterReducer = function(state = { selected: false }, action) {
    switch (action.type) {
        case "SET_CHARACTER":
            return {
                ...state,
                character: action.character,
                hp: action.character.hp,
            };
        case "UPDATE_CHARACTER_HP":
            return {
                ...state,
                character: action.character,
                hp: action.current_hp,
            };
        case "UPDATE_CHARACTER_EQUIPMENT":
            return {
                ...state,
                character: action.character,
            };
        case "UPDATE_CHARACTER_SPELLS":
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
                hp: action.character.hp,
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

export const spellInfoReducer = function(state = {}, action) {
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

export const spellInfoReducer = (state = { spellList: [], displaySpellList: false, }, action) => {
    switch (action.type) {
        case "RECEIVE_SPELLS_LIST":
            return {
                ...state,
                spellList: action.spellList,
            };
        case "SET_SPELL":
            return {
                ...state,
                spell: action.spell,
            };
        case "SPELLS_LIST_REQUESTED":
            return {
                ...state,
                displaySpellList: action.displaySpellList,
            };
        case "TOGGLE_SPELL_LIST":
            return {
                ...state,
                displaySpellList: action.displaySpellList,
            };
        default:
            return state;
    }
};

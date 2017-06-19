export const spellInfoReducer = (
    state = {spellList: [], characterSpells: [], fetching: false},
    action,
) => {
    switch (action.type) {
        case "RECEIVE_SPELLS_LIST":
            return {
                ...state,
                spellList: action.spellList,
                fetching: false,
            };
        case "SET_SPELL":
            return {
                ...state,
                spell: action.spell,
            };
        case "SPELLS_LIST_REQUESTED":
            return {
                ...state,
                fetching: true,
            };
        case "CHARACTER_SPELLS_REQUESTED":
            return {
                ...state,
                fetching: true,
            };
        case "RECEIVE_CHARACTER_SPELLS":
            return {
                ...state,
                characterSpells: action.characterSpells,
                fetching: false,
            };
        case "UPDATE_CHARACTER_SPELLS":
            return {
                ...state,
                characterSpells: action.characterSpells,
            };
        default:
            return state;
    }
};

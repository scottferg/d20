import {db} from "../components/app";

export const displaySpellDialog = spell => {
    return {
        type: "SET_SPELL",
        spell: spell,
    };
};

export const receiveSpellsList = (spellList) => {
    return {
        type: "RECEIVE_SPELLS_LIST",
        spellList: spellList,
    };
};

export const spellsListRequested = () => {
    return {
        type: "SPELLS_LIST_REQUESTED",
        displaySpellList: false,
    };
};

export const toggleSpellList = (visible) => {
    return {
        type: "TOGGLE_SPELL_LIST",
        displaySpellList: visible,
    };
};

export const fetchSpells = () => {
    return function(dispatch) {
        dispatch(spellsListRequested());
        return db
            .ref("/compendium/spells/")
            .once("value")
            .then(snapshot => dispatch(receiveSpellsList(snapshot.val())));
    };
};

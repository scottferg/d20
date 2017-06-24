import {auth, db} from "../components/app";

export const displaySpellDialog = spell => {
    return {
        type: "SET_SPELL",
        spell: spell,
    };
};

export const receiveSpellsList = spellList => {
    return {
        type: "RECEIVE_SPELLS_LIST",
        spellList: spellList,
    };
};

export const spellsListRequested = () => {
    return {
        type: "SPELLS_LIST_REQUESTED",
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

export const fetchCharacterSpells = name => {
    return function(dispatch) {
        var userId = auth.currentUser.uid;
        return db
            .ref("/users/" + userId + "/spells/" + name.toLowerCase())
            .once("value")
            .then(snapshot => dispatch(receiveCharacterSpells(snapshot.val())));
    };
};

export const receiveCharacterSpells = spells => {
    if (spells === null) {
        spells = [];
    }

    return {
        type: "RECEIVE_CHARACTER_SPELLS",
        characterSpells: spells,
    };
};

export const characterSpellsRequested = () => {
    return {
        type: "CHARACTER_SPELLS_REQUESTED",
    };
};

export const prepareSpell = (character, spells, spell, prepared) => {
    return function(dispatch) {
        spells.forEach(function(s, index) {
            if (s.name === spell.name) {
                spells[index].prepared = prepared;
            }
        });

        var userId = auth.currentUser.uid;
        return db
            .ref("/users/" + userId + "/spells/" + character.name.toLowerCase())
            .set(spells)
            .then(() => dispatch(updateSpells(spells)));
    };
};

export const addSpell = (character, spells, spell) => {
    return function(dispatch) {
        spell.prepared = true;
        spells.push(spell);

        var userId = auth.currentUser.uid;
        return db
            .ref("/users/" + userId + "/spells/" + character.name.toLowerCase())
            .set(spells)
            .then(() => dispatch(updateSpells(spells)));
    };
};

export const removeSpell = (character, spells, spell) => {
    return function(dispatch) {
        spells.forEach(function(s, index) {
            if (s.name === spell.name) {
                spells.splice(index, 1);
            }
        });

        var userId = auth.currentUser.uid;
        return db
            .ref("/users/" + userId + "/spells/" + character.name.toLowerCase())
            .set(spells)
            .then(() => dispatch(updateSpells(spells)));
    };
};

const updateSpells = spells => {
    return {
        type: "UPDATE_CHARACTER_SPELLS",
        characterSpells: spells,
    };
};

import {auth, db} from "../components/app";

import Player from "../models/player";

export const fetchCharacter = name => {
    return function(dispatch) {
        dispatch(characterRequested());

        var userId = auth.currentUser.uid;
        return db
            .ref("/users/" + userId + "/characters/" + name)
            .once("value")
            .then(snapshot => dispatch(receiveCharacter(name, snapshot.val())));
    };
};

export const receiveCharacterList = json => {
    return {
        type: "GET_CHARACTER_LIST_SUCCESS",
        isLoading: false,
        list: json,
    };
};

export const characterListRequested = () => {
    return {
        type: "CHARACTER_LIST_REQUESTED",
        isLoading: true,
    };
};

export const characterSelected = () => {
    return {
        type: "CHARACTER_SELECTED",
        selected: true,
    };
};

export const receiveCharacter = (name, json) => {
    return {
        type: "GET_CHARACTER_SUCCESS",
        isLoading: false,
        character: new Player(json),
    };
};

export const characterRequested = () => {
    return {
        type: "CHARACTER_REQUESTED",
        isLoading: true,
        selected: false,
    };
};

export const addItem = (character, item) => {
    return function(dispatch) {
        item.quantity = 1;
        item.owned = true;
        character.items.push(item);

        var userId = auth.currentUser.uid;
        return db
            .ref(
                "/users/" +
                    userId +
                    "/characters/" +
                    character.name.toLowerCase(),
            )
            .set({
                ...character,
                items: character.items,
            })
            .then(() => dispatch(updateEquipment(character)));
    };
};

export const removeItem = (character, item) => {
    return function(dispatch) {
        character.items.splice(character.items.indexOf(item), 1);

        var userId = auth.currentUser.uid;
        return db
            .ref(
                "/users/" +
                    userId +
                    "/characters/" +
                    character.name.toLowerCase(),
            )
            .set({
                ...character,
                items: character.items,
            })
            .then(() => dispatch(updateEquipment(character)));
    };
};

const updateEquipment = character => {
    return {
        type: "UPDATE_CHARACTER_EQUIPMENT",
        character: character,
    };
};

export const addSpell = (character, spell) => {
    return function(dispatch) {
        character.spells.push(spell);

        var userId = auth.currentUser.uid;
        return db
            .ref(
                "/users/" +
                    userId +
                    "/characters/" +
                    character.name.toLowerCase(),
            )
            .set({
                ...character,
                spells: character.spells,
            })
            .then(() => dispatch(updateSpells(character)));
    };
};

export const removeSpell = (character, spell) => {
    return function(dispatch) {
        character.spells.splice(character.spells.indexOf(spell), 1);

        var userId = auth.currentUser.uid;
        return db
            .ref(
                "/users/" +
                    userId +
                    "/characters/" +
                    character.name.toLowerCase(),
            )
            .set({
                ...character,
                spells: character.spells,
            })
            .then(() => dispatch(updateSpells(character)));
    };
};

const updateSpells = character => {
    return {
        type: "UPDATE_CHARACTER_SPELLS",
        character: character,
    };
};

// TODO: Writing the entire character is slow
export const setHP = (character, hp) => {
    return function(dispatch) {
        character.hp = character.hp + hp;

        if (character.hp < 0) {
            character.hp = 0;
        } else if (character.hp > character.max_hp) {
            character.hp = character.max_hp;
        }

        var userId = auth.currentUser.uid;
        return db
            .ref(
                "/users/" +
                    userId +
                    "/characters/" +
                    character.name.toLowerCase(),
            )
            .set({
                ...character,
                hp: character.hp,
            })
            .then(() => dispatch(updateHP(character, hp)));
    };
};

const updateHP = (character, hp) => {
    return {
        type: "UPDATE_CHARACTER_HP",
        character: character,
        current_hp: character.hp,
    };
};

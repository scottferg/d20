import {auth, db, storage} from "../components/app";
import {uploadPortrait} from "./common"

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

export const fetchCharacterList = () => {
    return function(dispatch) {
        dispatch(characterListRequested());

        var userId = auth.currentUser.uid;
        return db 
            .ref("/users/" + userId + "/characters")
            .once("value")
            .then(snapshot => dispatch(receiveCharacterList(snapshot.val())));
    };
}

export const characterListRequested = () => {
    return {
        type: "CHARACTER_LIST_REQUESTED",
        isLoading: true,
    };
};

export const characterSelected = (character) => {
    return {
        type: "CHARACTER_SELECTED",
        character: character,
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

export const fetchCharacterStatus = (name) => {
    return function(dispatch) {
        dispatch(characterStatusRequested());

        var userId = auth.currentUser.uid;
        return db
            .ref(
                "/users/" +
                    userId +
                    "/statuses/" +
                    name.toLowerCase(),
            )
            .once("value")
            .then(snapshot => dispatch(receiveCharacterStatus(snapshot.val())));
    };
};

export const receiveCharacterStatus = (stat) => {
    return {
        type: "RECEIVE_CHARACTER_STATUS",
        characterStatus: stat,
    };
};

export const characterStatusRequested = () => {
    return {
        type: "CHARACTER_STATUS_REQUESTED",
    };
};

export const setHP = (characterStatus, hp, name) => {
    return function(dispatch) {
        characterStatus.hp = characterStatus.hp + hp;

        if (characterStatus.hp < 0) {
            characterStatus.hp = 0;
        } else if (characterStatus.hp > characterStatus.max_hp) {
            characterStatus.hp = characterStatus.max_hp;
        }

        var userId = auth.currentUser.uid;
        return db
            .ref(
                "/users/" +
                    userId +
                    "/statuses/" +
                    name.toLowerCase(),
            )
            .set(characterStatus)
            .then(() => dispatch(updateHP(characterStatus)));
    };
};

const updateHP = (characterStatus) => {
    return {
        type: "UPDATE_CHARACTER_HP",
        characterStatus: characterStatus,
    };
};

export const setPortraitUrl = url => {
    return {
        type: "SET_PORTRAIT_URL",
        url: url,
    };
};

export const setUploadProgress = progress => {
    return {
        type: "SET_UPLOAD_PROGRESS",
        progress: progress,
    };
};

export const setCharacterPortrait = file => {
    return function(dispatch) {
        dispatch(setPortraitUrl(undefined));
        dispatch(setUploadProgress(0));

        var userId = auth.currentUser.uid;
        var imageRef = storage.child(userId + "portraits/" + Date.now());

        var uploadTask = imageRef.put(file);

        return uploadPortrait(uploadTask, 
            (url) => { dispatch(setPortraitUrl(url)) },
            (progress) => { dispatch(setUploadProgress(progress)) });
    };
};

export const saveCharacterWithDetails = (
    name,
    hp,
    inspiration,
    character,
) => {
    character.name = name;
    character.inspiration = inspiration;
    character.rolled_hp = hp;
    character.max_hp =
        hp + character.abilityBonus(character.conScore()) * character.level();
    character.hp = character.max_hp;

    return saveCharacter(character);
};

export const saveCharacter = (character) => {
    return function(dispatch) {
        var userId = auth.currentUser.uid;
        return db
            .ref(
                "/users/" +
                    userId +
                    "/characters/" +
                    character.name.toLowerCase(),
            )
            .set(character)
            .then(() => dispatch(saveCharacterStatus(character)));
    };
};

export const saveCharacterStatus = character => {
    return function(dispatch) {
        var characterStatus = {
            max_hp: character.max_hp,
            hp: character.max_hp,
            temp_hp: 0,
        };

        var userId = auth.currentUser.uid;
        return db
            .ref(
                "/users/" +
                    userId +
                    "/statuses/" +
                    character.name.toLowerCase(),
            )
            .set(characterStatus)
            .then(() => dispatch(characterSaved(character)));
    };
};

export const characterSaved = (character) => {
    return {
        type: "CHARACTER_SAVED",
        character: character
    };
};

export const setSkill = (skill, character) => {
    return function(dispatch) {
        character.setSkill(skill.name, skill.proficient, skill.expertise);

        dispatch(saveCharacter(character));

        return {
            type: "SET_SKILL",
            character: character,
        }
    };
};

export const setAbilityScore = (ability, val, character) => {
    return function(dispatch) {
        character[ability] = val;

        dispatch(saveCharacter(character));

        return {
            type: "SET_ABILITY_SCORE",
            character: character,
        };
    };
};

import {auth, db, storage} from "../components/app";
import {uploadPortrait} from "./common"

export const receiveRaceList = list => {
    if (list === null) {
        list = [];
    }

    return {
        type: "RECEIVE_RACE_LIST",
        list: list,
    };
};

export const raceListRequested = () => {
    return {
        type: "RACE_LIST_REQUESTED",
    };
};

export const fetchRaceList = () => {
    return function(dispatch) {
        dispatch(raceListRequested());

        return db
            .ref("/compendium/races")
            .once("value")
            .then(snapshot => dispatch(receiveRaceList(snapshot.val())));
    };
};

export const selectRace = (character, race) => {
    character["race"] = race;
    return {
        type: "SELECT_RACE",
        character: character,
    };
};

export const receiveClassList = list => {
    if (list === null) {
        list = [];
    }

    return {
        type: "RECEIVE_CLASS_LIST",
        list: list,
    };
};

export const classListRequested = () => {
    return {
        type: "CLASS_LIST_REQUESTED",
    };
};

export const fetchClassList = () => {
    return function(dispatch) {
        dispatch(classListRequested());

        return db
            .ref("/compendium/classes")
            .once("value")
            .then(snapshot => dispatch(receiveClassList(snapshot.val())));
    };
};

export const selectClass = (character, cls) => {
    character["classes"] = [];
    character["classes"].push({
        cls: cls,
        level: 1,
    });

    return {
        type: "SELECT_CLASS",
        character: character,
    };
};

export const receiveBackgroundList = list => {
    if (list === null) {
        list = [];
    }

    return {
        type: "RECEIVE_BACKGROUND_LIST",
        list: list,
    };
};

export const backgroundListRequested = () => {
    return {
        type: "BACKGROUND_LIST_REQUESTED",
    };
};

export const fetchBackgroundList = () => {
    return function(dispatch) {
        dispatch(backgroundListRequested());

        return db
            .ref("/compendium/backgrounds")
            .once("value")
            .then(snapshot => dispatch(receiveBackgroundList(snapshot.val())));
    };
};

export const selectBackground = (character, background) => {
    character["background"] = background;

    return {
        type: "SELECT_BACKGROUND",
        character: character,
    };
};

export const setAbilityScore = (ability, val) => {
    return {
        type: "SET_ABILITY_SCORE",
        ability: ability,
        score: val,
    };
};

export const setNewSkill = (skill) => {
    return {
        type: "SET_NEW_SKILL",
        skill: skill.name,
        proficient: skill.proficient,
        expertise: skill.expertise,
    };
};

export const setPortraitUrl = url => {
    return {
        type: "SET_NEW_PORTRAIT_URL",
        url: url,
    };
};

export const setUploadProgress = progress => {
    return {
        type: "SET_UPLOAD_PROGRESS",
        progress: progress,
    };
};

export const setNewCharacterPortrait = file => {
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

export const saveNewCharacterWithDetails = (
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
            .then(() => dispatch(saveNewCharacterStatus(character)));
    };
};

export const saveNewCharacterStatus = character => {
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
            .then(() => dispatch(characterSaved()));
    };
};

export const characterSaved = () => {
    return {
        type: "CHARACTER_SAVED",
    };
};

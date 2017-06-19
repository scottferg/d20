import {db} from "../components/app";

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
    }
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
    }
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
    }
};

export const setAbilityScore = (ability, val) => {
    return {
        type: "SET_ABILITY_SCORE",
        ability: ability,
        score: val,
    }
};

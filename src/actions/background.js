import {auth, db} from "../components/app";

export const receiveCharacterClassFeatures = (features) => {
    if (features === null) {
        features = [];
    }

    return {
        type: "RECEIVE_CHARACTER_CLASSFEATURES",
        classFeatures: features,
    };
};

export const characterClassFeaturesRequested = () => {
    return {
        type: "CHARACTER_CLASSFEATURES_REQUESTED",
    };
}

export const fetchCharacterClassFeatures = (name) => {
    return function(dispatch) {
        dispatch(characterClassFeaturesRequested());

        var userId = auth.currentUser.uid;
        return db
            .ref(
                "/users/" +
                    userId +
                    "/classFeatures/" +
                    name.toLowerCase(),
            )
            .once("value")
            .then(snapshot => dispatch(receiveCharacterClassFeatures(snapshot.val())));
    };
};

export const addClassFeature = (character, features, feature) => {
    return function(dispatch) {
        features.push(feature);

        var userId = auth.currentUser.uid;
        return db
            .ref(
                "/users/" +
                    userId +
                    "/classFeatures/" +
                    character.name.toLowerCase(),
            )
            .set(features)
            .then(() => dispatch(updateFeatures(features)));
    };
};

export const removeClassFeature = (character, features, feature) => {
    return function(dispatch) {
        features.splice(features.indexOf(feature), 1);

        var userId = auth.currentUser.uid;
        return db
            .ref(
                "/users/" +
                    userId +
                    "/classFeatures/" +
                    character.name.toLowerCase(),
            )
            .set(features)
            .then(() => dispatch(updateFeatures(features)));
    };
};

const updateFeatures = (features) => {
    return {
        type: "UPDATE_CHARACTER_CLASSFEATURES",
        classFeatures: features,
    };
};

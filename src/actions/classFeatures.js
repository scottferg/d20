import {auth, db} from "../components/app";

export const addClassFeature = (feature, featureList, character) => {
    return function(dispatch) {
        feature.key = Date.now() + ":" + feature.name;

        featureList.push(feature);

        var userId = auth.currentUser.uid;
        return db
            .ref(
                "/users/" +
                    userId +
                    "/classFeatures/" +
                    character.name.toLowerCase(),
            )
            .set(featureList)
            .then(() => dispatch(updateClassFeatures(featureList)));
    };
};

export const removeClassFeature = (character, featureList, feature) => {
    return function(dispatch) {
        featureList.forEach(function(i, index) {
            if (i.key === feature.key) {
                featureList.splice(index, 1);
            }
        });

        var userId = auth.currentUser.uid;
        return db
            .ref(
                "/users/" +
                    userId +
                    "/featureList/" +
                    character.name.toLowerCase(),
            )
            .set(featureList)
            .then(() => dispatch(updateClassFeatures(featureList)));
    };
};

const updateClassFeatures = (featureList) => {
    return {
        type: "UPDATE_CHARACTER_CLASSFEATURES",
        classFeatures: featureList,
    };
};

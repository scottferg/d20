export const backgroundReducer = function(state = { classFeatures: [], fetching: false, }, action) {
    switch (action.type) {
        case "RECEIVE_CHARACTER_CLASSFEATURES":
            return {
                ...state,
                classFeatures: action.classFeatures,
                fetching: false,
            };
        case "CHARACTER_CLASSFEATURES_REQUESTED":
            return {
                ...state,
                fetching: true,
            };
        case "UPDATE_CHARACTER_CLASSFEATURES":
            return {
                ...state,
                classFeatures: action.classFeatures,
            };
        default:
            return state;
    }
};

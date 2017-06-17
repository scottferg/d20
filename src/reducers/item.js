export const itemInfoReducer = function(state = {}, action) {
    switch (action.type) {
        case "SET_ITEM":
            return {
                ...state,
                item: action.item,
            };
        default:
            return state;
    }
};


export const itemInfoReducer = function(state = { characterItems: [], itemList: [], fetching: false, }, action) {
    switch (action.type) {
        case "RECEIVE_CHARACTER_EQUIPMENT":
            return {
                ...state,
                characterItems: action.characterItems,
                fetching: false,
            };
        case "RECEIVE_ITEMS_LIST":
            return {
                ...state,
                itemList: action.itemList,
                fetching: false,
            };
        case "UPDATE_CHARACTER_EQUIPMENT":
            return {
                ...state,
                characterItems: action.characterItems,
                displayItemList: false,
            };
        case "CHARACTER_ITEMS_REQUESTED":
            return {
                ...state,
                fetching: true,
            };
        case "SET_ITEM":
            return {
                ...state,
                item: action.item,
            };
        case "ITEMS_LIST_REQUESTED":
            return {
                ...state,
                fetching: true,
            };
        default:
            return state;
    }
};


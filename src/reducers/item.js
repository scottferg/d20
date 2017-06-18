export const itemInfoReducer = function(state = { characterItems: [], itemList: [], displayItemList: false, fetching: false, }, action) {
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
                displayItemList: action.displayItemList,
            };
        case "TOGGLE_ITEM_LIST":
            return {
                ...state,
                displayItemList: action.displayItemList,
            };
        default:
            return state;
    }
};


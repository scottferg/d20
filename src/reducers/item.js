export const itemInfoReducer = function(state = { itemList: [], displayItemList: false, }, action) {
    switch (action.type) {
        case "RECEIVE_ITEMS_LIST":
            return {
                ...state,
                itemList: action.itemList,
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


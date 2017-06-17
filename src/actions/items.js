import {db} from "../components/app";

export const displayItemDialog = item => {
    console.log(item);
    return {
        type: "SET_ITEM",
        item: item,
    };
};

export const receiveItemsList = (itemList) => {
    return {
        type: "RECEIVE_ITEMS_LIST",
        itemList: itemList,
    };
};

export const itemsListRequested = () => {
    return {
        type: "ITEMS_LIST_REQUESTED",
        displayItemList: false,
    };
};

export const toggleItemList = (visible) => {
    return {
        type: "TOGGLE_ITEM_LIST",
        displayItemList: visible,
    };
};

export const fetchItems = () => {
    return function(dispatch) {
        dispatch(itemsListRequested());
        return db
            .ref("/compendium/items/")
            .once("value")
            .then(snapshot => dispatch(receiveItemsList(snapshot.val())));
    };
};

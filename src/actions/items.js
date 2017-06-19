import {auth, db} from "../components/app";

export const displayItemDialog = item => {
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

export const receiveCharacterItems = (items) => {
    if (items === null) {
        items = [];
    }

    return {
        type: "RECEIVE_CHARACTER_EQUIPMENT",
        characterItems: items,
    };
};

export const characterItemsRequested = () => {
    return {
        type: "CHARACTER_ITEMS_REQUESTED",
    };
}

export const fetchCharacterItems = (name) => {
    return function(dispatch) {
        dispatch(characterItemsRequested());

        var userId = auth.currentUser.uid;
        return db
            .ref(
                "/users/" +
                    userId +
                    "/items/" +
                    name.toLowerCase(),
            )
            .once("value")
            .then(snapshot => dispatch(receiveCharacterItems(snapshot.val())));
    };
};

export const addItem = (character, items, item) => {
    return function(dispatch) {
        item.quantity = 1;
        item.owned = true;
        items.push(item);

        var userId = auth.currentUser.uid;
        return db
            .ref(
                "/users/" +
                    userId +
                    "/items/" +
                    character.name.toLowerCase(),
            )
            .set(items)
            .then(() => dispatch(updateEquipment(items)));
    };
};

export const removeItem = (character, items, item) => {
    return function(dispatch) {
        items.splice(items.indexOf(item), 1);

        var userId = auth.currentUser.uid;
        return db
            .ref(
                "/users/" +
                    userId +
                    "/items/" +
                    character.name.toLowerCase(),
            )
            .set(items)
            .then(() => dispatch(updateEquipment(items)));
    };
};

const updateEquipment = (items) => {
    return {
        type: "UPDATE_CHARACTER_EQUIPMENT",
        characterItems: items,
    };
};

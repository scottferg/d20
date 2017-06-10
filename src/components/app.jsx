import { combineReducers } from 'redux'

var spellInfoReducer = function(state = {}, action) {
    switch (action.type) {
        case "SET_SPELL":
            return {
                ...state,
                spell: action.spell,
            }
        default:
            return state;
    }
}

var itemInfoReducer = function(state = {}, action) {
    switch (action.type) {
        case "SET_ITEM":
            return {
                ...state,
                item: action.item
            }
        default:
            return state;
    }
}

var characterReducer = function(state = {}, action) {
    switch (action.type) {
        case "SET_CHARACTER":
            return {
                ...state,
                character: action.character
            }
        default:
            return state;
    }
}

const d20App = combineReducers({
    spellInfoReducer,
    itemInfoReducer,
    characterReducer
})

export default d20App

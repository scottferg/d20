import { combineReducers } from 'redux'

var spellInfoReducer = function(state = {}, action) {
    console.log('spellInfoReducer was called with state', state, 'and action', action)

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
    console.log('itemInfoReducer was called with state', state, 'and action', action)

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

const d20App = combineReducers({
    spellInfoReducer,
    itemInfoReducer
})

export default d20App

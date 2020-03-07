import { ACTION_TYPES } from '../../shared/constants'
const appReducer = (state = {
    deckMap: [],
    currentDeck: null,
    currentCargo: {}
}, action) => {
    switch (action.type) {
        case ACTION_TYPES.SET_DECK_MAP:
            return {
                ...state,
                deckMap: action.payload
            };
        case ACTION_TYPES.SET_CURRENT_DECK:
            return {
                ...state,
                currentDeck: action.payload
            };
        case ACTION_TYPES.SET_CURRENT_CARGO:
            return {
                ...state,
                currentCargo: action.payload
            }
        default:
            return state;
    }
}

export default appReducer;
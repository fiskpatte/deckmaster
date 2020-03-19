import { ACTION_TYPES } from '../../shared/constants'
import { AppState } from '../store.types';
import { cargoFactory, deckFactory } from '../../shared/types/deckMap';

const initialState: AppState = {
    deckMap: [],
    currentDeck: deckFactory(),
    currentCargo: cargoFactory(),
    currentPosition: null
}
const appReducer = (state = initialState, action: any): AppState => {
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
        case ACTION_TYPES.SET_CURRENT_POSITION:
            return {
                ...state,
                currentPosition: action.payload
            }
        default:
            return state;
    }
}

export default appReducer;
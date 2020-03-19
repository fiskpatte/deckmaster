import { ACTION_TYPES } from '../../shared/constants'
import { CargoState } from '../types';
import { emptyCargo } from './../../types';

const initialState: CargoState = {
    currentCargo: emptyCargo()
}

const cargoReducer = (state = initialState, action: any): CargoState => {

    switch (action.type) {
        case ACTION_TYPES.SET_CURRENT_CARGO:
            return {
                ...state,
                currentCargo: action.payload
            }
        default:
            return state;
    }
}

export default cargoReducer;
import { ACTION_TYPES } from '../../shared/constants'
import { Cargo } from '../../types';

export const setCurrentCargo = (cargo: Cargo) => {
    return {
        type: ACTION_TYPES.SET_CURRENT_CARGO,
        payload: cargo
    }
};

const cargoActions = {
    setCurrentCargo,
};

export default cargoActions;
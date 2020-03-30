import { ACTION_TYPES } from "../../shared/constants";
import { cargoFactory } from "../../shared/types/deckMap";
import { CargoState } from "../store.types";

const initialState: CargoState = {
  currentCargo: cargoFactory(),
  currentPlacement: null
};

const cargoReducer = (state = initialState, action: any): CargoState => {
  switch (action.type) {
    case ACTION_TYPES.SET_CURRENT_CARGO:
      return {
        ...state,
        currentCargo: action.payload
      };
    case ACTION_TYPES.SET_CURRENT_PLACEMENT:
      return {
        ...state,
        currentPlacement: action.payload
      };
    default:
      return state;
  }
};

export default cargoReducer;

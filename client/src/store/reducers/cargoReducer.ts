import { ACTION_TYPES } from "../../constants";
import { cargoFactory } from "../../types/deckMap";
import { CargoState } from "../types";

const initialState: CargoState = {
  currentCargo: cargoFactory(),
  currentPlacement: null,
};

const cargoReducer = (state = initialState, action: any): CargoState => {
  switch (action.type) {
    case ACTION_TYPES.SET_CURRENT_CARGO:
      return {
        ...state,
        currentCargo: action.payload,
      };
    case ACTION_TYPES.SET_CURRENT_PLACEMENT:
      return {
        ...state,
        currentPlacement: action.payload,
      };
    default:
      return state;
  }
};

export default cargoReducer;

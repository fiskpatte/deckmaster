import { ACTION_TYPES } from "../../shared/constants";
import { Cargo } from "../../shared/types/deckMap";
import { Placement } from "../../shared/types/util";

export const setCurrentCargo = (cargo: Cargo) => {
  return {
    type: ACTION_TYPES.SET_CURRENT_CARGO,
    payload: cargo
  };
};

export const setCurrentPlacement = (placement: Placement | null) => {
  return {
    type: ACTION_TYPES.SET_CURRENT_PLACEMENT,
    payload: placement
  };
};

const cargoActions = {
  setCurrentCargo,
  setCurrentPlacement
};

export default cargoActions;

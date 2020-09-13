import { cargoPlacementFactory } from "../../types/deckMap";
import { CargoState } from "../types";
import { DECK_MAP_ACTION_TYPES } from "./deckMapActionTypes";

const initialState: CargoState = {
  currentCargoPlacement: cargoPlacementFactory(),
  deckMap: {},
  currentDeckId: undefined,
  cargoPlacements: [],
};
const deckMapReducer = (state = initialState, action: any): CargoState => {
  const { type, payload } = action;

  switch (type) {
    case DECK_MAP_ACTION_TYPES.SET_CURRENT_PLACEMENT:
      return {
        ...state,
        currentCargoPlacement: payload,
      };
    case DECK_MAP_ACTION_TYPES.SET_DECK_MAP:
      return {
        ...state,
        deckMap: payload,
      };
    case DECK_MAP_ACTION_TYPES.SET_CURRENT_DECK_ID:
      return {
        ...state,
        currentDeckId: payload,
      };
    case DECK_MAP_ACTION_TYPES.ADD_CARGO_PLACEMENT: {
      const cargoPlacements = [
        ...state.cargoPlacements.filter((cp) => cp.id !== payload.id),
        payload,
      ];

      return {
        ...state,
        cargoPlacements,
      };
    }
    case DECK_MAP_ACTION_TYPES.REMOVE_CARGO_PLACEMENT: {
      return {
        ...state,
        cargoPlacements: state.cargoPlacements.filter(cp => cp.id !== payload.cargoPlacementId)
      };
    }
    case DECK_MAP_ACTION_TYPES.SET_CARGO_PLACEMENTS: {
      return { ...state, cargoPlacements: payload };
    }
    default:
      return state;
  }
};

export default deckMapReducer;

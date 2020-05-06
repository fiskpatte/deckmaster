import { ACTION_TYPES } from "../../constants";
import { AppState } from "../types";
import { deckFactory } from "../../types/deckMap";
import _ from "lodash";

const initialState: AppState = {
  currentDeck: deckFactory(),
  deckMap: {},
  settings: null,
  vesselId: "vessel1",
  currentDeckId: undefined,
  sessionData: undefined
};

const appReducer = (state = initialState, action: any): AppState => {
  const { type, payload } = action;
  switch (type) {
    case ACTION_TYPES.SET_DECK_MAP:
      return {
        ...state,
        deckMap: payload,
      };
    // case ACTION_TYPES.SET_CURRENT_DECK:
    //   return {
    //     ...state,
    //     currentDeck: payload,
    //   };
    case ACTION_TYPES.SET_VESSEL_ID:
      return {
        ...state,
        vesselId: payload,
      };
    case ACTION_TYPES.SET_SETTINGS: {
      return {
        ...state,
        settings: payload,
      };
    }
    case ACTION_TYPES.SET_CURRENT_DECK_ID: {
      return {
        ...state,
        currentDeckId: payload,
      };
    }
    case ACTION_TYPES.ADD_CARGO_PLACEMENT: {
      const deckMap = _.cloneDeep(state.deckMap);
      deckMap[payload.deckId].lanes.find(l => l.id === payload.laneId)?.cargo.push(payload);
      return {
        ...state,
        deckMap,
      };
    }
    case ACTION_TYPES.SET_SESSION_DATA:
      return {
        ...state,
        sessionData: payload,
      }
    default:
      return state;
  }
};

export default appReducer;

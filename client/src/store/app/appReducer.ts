import { AppState } from "../types";
import { APP_ACTION_TYPES } from "./appActionTypes";

const initialState: AppState = {
  settings: null,
  sessionData: undefined,
};

const appReducer = (state = initialState, action: any): AppState => {
  const { type, payload } = action;
  switch (type) {
    case APP_ACTION_TYPES.SET_SETTINGS: {
      return {
        ...state,
        settings: payload,
      };
    }

    case APP_ACTION_TYPES.SET_SESSION_DATA:
      return {
        ...state,
        sessionData: payload,
      };
    default:
      return state;
  }
};

export default appReducer;

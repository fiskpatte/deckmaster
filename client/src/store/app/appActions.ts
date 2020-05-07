import { Settings } from "../../types/settings";
import { SessionData } from "./../../types/sessionData";
import { APP_ACTION_TYPES } from "./appActionTypes";

export const setSettings = (settings: Settings) => {
  return {
    type: APP_ACTION_TYPES.SET_SETTINGS,
    payload: settings,
  };
};

export const setSessionData = (data: SessionData | undefined) => ({
  type: APP_ACTION_TYPES.SET_SESSION_DATA,
  payload: data,
});

const appActions = {
  setSettings,
  setSessionData,
};

export default appActions;

import { createSelector } from "reselect";
import { getVCG } from "../../modules/deckMap/DeckMap.functions";
import { Cargo, Lane } from "../../types/deckMap";
import { AppState } from "../types";

const getDefaultVCG = (state: { appReducer: AppState }) =>
  state.appReducer.settings.defaultVCG;

export const getVCGForCargoAndLane = (cargo: Cargo, lane: Lane) =>
  createSelector(getDefaultVCG, (defaultVCG) =>
    getVCG(cargo, lane, defaultVCG)
  );

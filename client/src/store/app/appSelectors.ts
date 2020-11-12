import { createSelector } from "reselect";
import { Cargo, Lane } from "../../types/deckMap";
import { AppState } from "../types";

const getDefaultVCG = (state: { appReducer: AppState }) =>
  state.appReducer.settings.defaultVCG;

export const getVCGForCargoAndLane = (cargo: Cargo, lane: Lane) =>
  createSelector(
    getDefaultVCG,
    (defaultVCG) => lane.VCG + cargo.height * defaultVCG
  );

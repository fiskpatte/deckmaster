import { DeckMapType, CargoPlacement } from "../types/deckMap";
import { Settings } from "../types/settings";
import { SessionData } from "./../types/sessionData";

export interface AppState {
  settings: Settings;
  sessionData?: SessionData;
}

export interface CargoState {
  currentCargoPlacement: CargoPlacement;
  deckMap: DeckMapType;
  currentDeckId?: string;
  cargoPlacements: Array<CargoPlacement>;
}

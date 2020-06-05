import { Cargo, DeckMapType } from "../types/deckMap";
import { Placement } from "../types/util";
import { Settings } from "../types/settings";
import { SessionData } from "./../types/sessionData";

export interface AppState {
  settings: Settings;
  sessionData?: SessionData;
}

export interface CargoState {
  currentCargo: Cargo;
  currentPlacement: Placement | null;
  deckMap: DeckMapType;
  currentDeckId?: string;
}

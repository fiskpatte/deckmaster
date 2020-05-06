import { Deck, Cargo, DeckMapType } from "../types/deckMap";
import { Placement } from "../types/util";
import { Settings } from "../types/settings";
import { SessionData } from './../types/sessionData';

export interface AppState {
  currentDeck: Deck;
  deckMap: DeckMapType;
  settings: Settings | null;
  vesselId: string;
  currentDeckId?: string;
  sessionData?: SessionData
}

export interface CargoState {
  currentCargo: Cargo;
  currentPlacement: Placement | null;
}

import { Deck, Cargo, DeckMapType } from "../types/deckMap";
import { Placement } from "../types/util";
import { Settings } from "../types/settings";

export interface AppState {
  currentDeck: Deck;
  deckMap: DeckMapType;
  settings: Settings | null;
  vesselId: string;
}

export interface CargoState {
  currentCargo: Cargo;
  currentPlacement: Placement | null;
}

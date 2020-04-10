import { Deck, Cargo, DeckMapType } from "../types/deckMap";
import { Placement } from "../types/util";
export interface AppState {
  deckMap: DeckMapType;
  currentDeck: Deck;
}

export interface CargoState {
  currentCargo: Cargo;
  currentPlacement: Placement | null;
}

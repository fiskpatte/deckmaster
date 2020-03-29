import { Deck, Cargo, DeckMapType } from '../shared/types/deckMap';
import { Placement } from '../shared/types/util';
export interface AppState {
    deckMap: DeckMapType,
    currentDeck: Deck,
}

export interface CargoState {
    currentCargo: Cargo,
    currentPlacement: Placement | null
}
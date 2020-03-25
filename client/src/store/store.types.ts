import { Deck, Cargo } from '../shared/types/deckMap';
import { Coords } from '../shared/types/util';
export interface AppState {
    deckMap: Array<Deck>,
    currentDeck: Deck,
    currentPosition: Coords | null
}

export interface CargoState {
    currentCargo: Cargo
}
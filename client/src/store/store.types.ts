import { Deck, Cargo, Coords } from '../types';

export interface AppState {
    deckMap: Array<Deck>,
    currentDeck: Deck,
    currentCargo: Cargo,
    currentPosition: Coords | null
}

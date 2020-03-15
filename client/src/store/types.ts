import { Deck, Cargo } from '../types';

export interface AppState {
    deckMap: Array<Deck>,
    currentDeck: Deck,
    currentCargo: Cargo
}

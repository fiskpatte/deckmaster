import { Deck, Cargo } from '../shared/types/deckMap';
import { Coords } from '../shared/types/util';
export interface AppState {
    deckMap: Array<Deck>,
    currentDeck: Deck,
    currentCargo: Cargo,
    currentPosition: Coords | null
}

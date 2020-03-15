export interface Deck {
    deck: string,
    lanes: Array<Lane>,
    grids: Array<Grid>
}
export interface DeckMapElement {
    length: number,
    width: number,
    LCG: number,
    TCG: number,
    VCG: number,
}
export interface Lane extends DeckMapElement {
    name: string,
    partial: boolean
}

export interface Grid extends DeckMapElement {
    name: string,
}

export interface Cargo extends DeckMapElement {
    registrationNumber: string
}

export const emptyDeck = (): Deck => ({
    deck: "",
    lanes: [],
    grids: []
})
export const emptyCargo = (): Cargo => ({
    registrationNumber: "",
    length: -1,
    width: -1,
    LCG: 0,
    TCG: 0,
    VCG: 0
})

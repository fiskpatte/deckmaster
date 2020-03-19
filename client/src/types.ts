export interface Size {
    width: number,
    height: number
}
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
    registrationNumber: string,
    height: number,
    weight: number
}

export interface Coords {
    x: number,
    y: number
}

export const emptyDeck = (): Deck => ({
    deck: "",
    lanes: [],
    grids: []
})
export const emptyCargo = (): Cargo => ({
    registrationNumber: "",
    length: 0,
    width: 0,
    LCG: 0,
    TCG: 0,
    VCG: 0,
    height: 0,
    weight: 0
})

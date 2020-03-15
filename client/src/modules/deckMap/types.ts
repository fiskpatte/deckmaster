import { Deck, Cargo, Grid, Lane } from './../../types';

export interface DeckMapProps {
    currentDeck: Deck,
    currentCargo: Cargo
}

export interface LanesProps {
    lanes: Array<Lane>,
    svgRef: React.RefObject<SVGSVGElement>,
    rightOrigin: number
}

export interface LaneProps {
    lane: Lane,
    svgRef: React.RefObject<SVGSVGElement>,
    rightOrigin: number
    onClick: (event: React.MouseEvent<SVGElement>) => void
}

export interface LaneButtonProps {
    lane: Lane,
    onClick: (event: React.MouseEvent<SVGElement>) => void
}

export interface LaneNameProps {
    lane: Lane,
    rightOrigin: number,
    svgRef: React.RefObject<SVGSVGElement>
}

export interface ArrowIconProps {
    x: number,
    y: number,
    height: number,
    width: number
}

export interface GridsProps {
    grids: Array<Grid>
}

export interface GridProps {
    grid: Grid,
    visible: boolean,
    onClick: (event: React.MouseEvent<SVGElement>) => void
}

export interface GridItemProps {
    grid: Grid,
    radius: number,
    upper?: boolean
}

export interface CargoDetailsProps {
    currentCargo: Cargo
}

export interface CargoDetailsItemProps {
    label: string,
    value: string
}

export interface DeckSelectorProps {
    deckMap: Array<Deck>,
    currentDeck: Deck
}

export interface DeckSelectorItemProps {
    deck: Deck,
    isCurrent: boolean
}
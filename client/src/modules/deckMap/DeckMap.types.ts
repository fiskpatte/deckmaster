import { Cargo, Deck, Lane, Grid, DeckMapType } from '../../shared/types/deckMap';
import { Coords, Placement } from '../../shared/types/util';

export interface DeckMapProps {
    currentDeck: Deck,
    currentCargo: Cargo,
    currentPlacement: Placement | null
}

export interface LanesProps {
    lanes: Array<Lane>,
    svgRef: React.RefObject<SVGSVGElement>,
    rightOrigin: number,
    onClick: (event: React.MouseEvent | React.TouchEvent) => void,
    onButtonClick: (position: Coords, laneID: number) => void
}

export interface LaneProps {
    lane: Lane,
    svgRef: React.RefObject<SVGSVGElement>,
    rightOrigin: number
    onClick: (event: React.MouseEvent<SVGElement>) => void,
    onButtonClick: (position: Coords, laneID: number) => void
}

export interface LaneButtonProps {
    lane: Lane,
    onClick: (event: React.MouseEvent<SVGElement>) => void,
    visible: boolean
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

export interface CargoIconProps {
    x: number,
    y: number,
    height: number,
    width: number,
    placing?: boolean
}

export interface GridsProps {
    grids: Array<Grid>,
    onClick: (position: Coords) => void
}

export interface GridProps {
    grid: Grid,
    visible: boolean,
    onClick: (position: Coords) => void
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
    deckMap: DeckMapType,
    currentDeck: Deck
}

export interface DeckSelectorItemProps {
    deck: Deck,
    isCurrent: boolean
}
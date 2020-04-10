import { OverflowDirection } from '../constants';
export interface Size {
    width: number,
    height: number
}
export interface Coords {
    x: number,
    y: number
}

export interface Placement {
    LCG: number,
    TCG: number,
    laneID: number,
    overflowDirection?: OverflowDirection
}
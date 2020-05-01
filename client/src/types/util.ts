export interface Size {
  width: number;
  height: number;
}
export interface Coords {
  x: number;
  y: number;
}
export const coordsFactory = (): Coords => ({
  x: 0,
  y: 0,
});
export interface Placement {
  LCG: number;
  TCG: number;
  laneId: string;
  overflowLaneId?: string;
}

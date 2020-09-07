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
  VCG: number;
  laneId: string;
  overflowingLaneId?: string;
}
export const placementFactory = (): Placement => ({
  LCG: 0,
  TCG: 0,
  VCG: 0,
  laneId: "",
})

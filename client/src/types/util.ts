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

export const getCargoType = (cargoTypeEnum: number) => {
  switch (cargoTypeEnum) {
    case 10:
      return "Trailer";
    case 20:
      return "Mafi 40'";
    case 30:
      return "Oversize Cargo";
    default:
      return "Unkown cargo type";
  }
};

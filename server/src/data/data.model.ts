export interface CargoPlacementData {
  voyageId: string;
  timestamp: Date;
  cargo: CargoData[];
}
export interface CargoData {
  cargoId: string;
  deckId: string;
  LCG: number;
  TCG: number;
  VCG: number;
  length: number;
  height: number;
  weight: number;
}
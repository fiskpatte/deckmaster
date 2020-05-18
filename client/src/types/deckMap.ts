import { AdjacentSide } from "../constants";

export interface DeckMapType {
  [key: string]: Deck;
}

export interface Deck {
  name: string;
  lanes: Array<Lane>;
  grids: Array<Grid>;
  frames: Array<Frame>;
  sortOrder: number;
}

export const deckFactory = (): Deck => ({
  name: "",
  lanes: [],
  grids: [],
  frames: [],
  sortOrder: 0,
});

export interface DeckMapElement {
  id: string;
  length: number;
  width: number;
  LCG: number;
  TCG: number;
  VCG: number;
}

const deckMapElementFactory = (): DeckMapElement => {
  return {
    id: "0",
    length: 0,
    width: 0,
    LCG: 0,
    TCG: 0,
    VCG: 0,
  };
};

export interface Lane extends DeckMapElement {
  name: string;
  partial: boolean;
  grids: Array<Grid>;
  cargo: Array<CargoPlacement>;
  adjacentLanes: Array<AdjacentLane>;
}

export const laneFactory = (): Lane => {
  let elem = deckMapElementFactory() as Lane;
  elem.name = "";
  elem.partial = false;
  elem.grids = [];
  elem.cargo = [];
  elem.adjacentLanes = [];
  return elem;
};

export interface AdjacentLane extends Lane {
  adjacentSide: AdjacentSide;
}

export interface Grid extends DeckMapElement {
  name: string;
}

export const gridFactory = (): Grid => {
  let elem = deckMapElementFactory() as Grid;
  elem.name = "";
  return elem;
};

export interface Cargo extends DeckMapElement {
  registrationNumber: string;
  height: number;
  weight: number;
  laneId: string;
  overflowingLaneId: string;
}

export interface CargoPlacement {
  id: string;
  registrationNumber: string;
  deckId: string;
  laneId: string;
  LCG: number;
  TCG: number;
  VCG: number;
  overflowingLaneId: string;
  createdAt: Date;
  updatedAt: Date;
  voyageId: string;
  cargo: Cargo;
}

export const cargoFactory = (): Cargo => {
  let elem = deckMapElementFactory() as Cargo;
  elem.registrationNumber = "";
  elem.height = 0;
  elem.weight = 0;
  elem.overflowingLaneId = "0";
  return elem;
};

export interface Frame {
  id: number;
  distance: number;
}

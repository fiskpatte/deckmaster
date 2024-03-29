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
    id: "",
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
  adjacentLanes: Array<AdjacentLane>;
}

export const laneFactory = (): Lane => {
  let elem = deckMapElementFactory() as Lane;
  elem.name = "";
  elem.partial = false;
  elem.adjacentLanes = [];
  return elem;
};

export interface AdjacentLane extends Lane {
  adjacentSide: AdjacentSide;
}

export interface Grid extends DeckMapElement {
  name: string;
  laneId: string;
}

export const gridFactory = (): Grid => {
  let elem = deckMapElementFactory() as Grid;
  elem.name = "";
  elem.laneId = "";
  return elem;
};

export interface Cargo {
  id: string;
  registrationNumber: string;
  length: number;
  width: number;
  height: number;
  weight: number;
  createdAt: Date;
  updatedAt: Date;
  type: number;
}

export interface CargoPlacement {
  id: string;
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
  replacing: boolean;
  discharged: boolean;
}

export const cargoPlacementFactory = (): CargoPlacement => ({
  id: "",
  deckId: "",
  laneId: "",
  LCG: 0,
  TCG: 0,
  VCG: 0,
  overflowingLaneId: "",
  createdAt: new Date(),
  updatedAt: new Date(),
  voyageId: "",
  cargo: cargoFactory(),
  replacing: false,
  discharged: false,
});

export const cargoPlacementAsDeckMapElement = (
  cargoPlacement: CargoPlacement,
  cargo?: Cargo,
  fromForwardPlacement?: boolean
): DeckMapElement => {
  let cargoToUse = cargo ? cargo : cargoPlacement.cargo;
  let LCG = cargoPlacement.LCG;
  LCG -= fromForwardPlacement ? cargoToUse.length / 2 : 0;
  return {
    ...cargoPlacement,
    ...cargoToUse,
    LCG,
  };
};

export const cargoFactory = (): Cargo => ({
  id: "",
  registrationNumber: "",
  length: 0,
  width: 0,
  height: 0,
  weight: 0,
  createdAt: new Date(),
  updatedAt: new Date(),
  type: 10,
});

export interface Frame {
  id: number;
  distance: number;
}

export interface CargoPlacementsForLanes {
  [id: string]: CargoPlacement[];
}

export interface ValidPlacementIntervalsForLanes {
  [id: string]: ValidPlacementInterval[];
}

export interface ViewBoxDimensions {
  sizeX: number;
  sizeY: number;
  originX: number;
  originY: number;
}

export interface DeckSelectorData {
  name: string;
  sortOrder: number;
}

export interface SuggestedCargoPlacement {
  deckId: string;
  laneId: string;
  TCG: number;
  LCG: number;
  registrationNumber: string;
}

export interface ValidPlacementInterval {
  start: number;
  end: number;
  overflowingLaneId: string;
  isFirstInterval: boolean;
}

export interface DeckMapElementEndpoints {
  forward: number;
  after: number;
  left: number;
  right: number;
}

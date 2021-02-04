import { AdjacentSide } from "../../constants";
import {
  AdjacentLane,
  Cargo,
  CargoPlacement,
  Lane,
  ValidPlacementInterval,
} from "../../types/deckMap";
import { getValidPlacementIntervals } from "./DeckMap.functions";

describe("Valid placement intervals", () => {
  const bumperToBumperDistance = 0.6;
  //   const defaultVCG = 0.45;
  const trailer1Cargo = {
    id: "5fae3d4bfe268d0012f2e699",
    registrationNumber: "PQA 254",
    length: 13.62,
    width: 2.48,
    height: 2.7,
    type: 10,
    weight: 18,
    voyageId: "dummy_voyage_id",
    createdAt: new Date(),
    updatedAt: new Date(),
  } as Cargo;
  const trailer2Cargo = {
    id: "5fae3d5dfe268d0012f2e6a5",
    registrationNumber: "BKU 291",
    length: 13.62,
    width: 2.48,
    height: 2.7,
    type: 10,
    weight: 14,
    voyageId: "dummy_voyage_id",
    createdAt: new Date(),
    updatedAt: new Date(),
  } as Cargo;
  const laneWithoutAdjacentLanes = {
    id: "5",
    name: "WD03",
    length: 210,
    width: 2.6,
    LCG: 105.2,
    TCG: -4.37,
    VCG: 22.7,
    partial: false,
    adjacentLanes: [],
  } as Lane;
  const leftAdjacentLane = {
    id: "3",
    name: "WD02",
    length: 28.5,
    width: 2.6,
    LCG: 194.81,
    TCG: -7.25,
    VCG: 22.7,
    partial: false,
    adjacentLanes: [],
    adjacentSide: AdjacentSide.Left,
  } as AdjacentLane;
  const leftPartialAdjacentLane = {
    id: "4",
    name: "WD02",
    length: 140.8,
    width: 2.6,
    LCG: 65.5,
    TCG: -7.25,
    VCG: 22.7,
    partial: true,
    adjacentLanes: [],
    adjacentSide: AdjacentSide.Left,
  } as AdjacentLane;
  const rightAdjacentLane = {
    id: "6",
    name: "WD04",
    length: 220,
    width: 2.6,
    LCG: 105.17,
    TCG: -1.5,
    VCG: 22.7,
    partial: false,
    adjacentLanes: [],
    adjacentSide: AdjacentSide.Right,
  } as AdjacentLane;
  const laneWithLeftAndRightAndPartialAdjacentLane = {
    ...laneWithoutAdjacentLanes,
    adjacentLanes: [
      leftAdjacentLane,
      leftPartialAdjacentLane,
      rightAdjacentLane,
    ],
  } as Lane;
  test("Should return interval from aft to fwd of lane without adjacentLanes nor cargo", () => {
    const validPlacementIntervals = getValidPlacementIntervals(
      laneWithoutAdjacentLanes,
      [],
      [],
      bumperToBumperDistance
    );
    const { length, LCG } = laneWithoutAdjacentLanes;
    const expectedValue = [
      {
        start: LCG - length / 2,
        end: LCG + length / 2,
        overflowingLaneId: "",
        fromLaneAFT: true,
      },
    ] as ValidPlacementInterval[];
    expect(validPlacementIntervals).toStrictEqual(expectedValue);
  });
  test("Should return overflowing intervals with adjacentLanes without cargo", () => {
    const validPlacementIntervals = getValidPlacementIntervals(
      laneWithLeftAndRightAndPartialAdjacentLane,
      [],
      [],
      bumperToBumperDistance
    );
    const {
      length,
      LCG,
      adjacentLanes,
    } = laneWithLeftAndRightAndPartialAdjacentLane;
    const firstLength = adjacentLanes[0].length;
    const firstLCG = adjacentLanes[0].LCG;
    const secondLength = adjacentLanes[1].length;
    const secondLCG = adjacentLanes[1].LCG;

    /*Basically 4 cases exist:
     * 1: Contained lane
     *     ---      Contained
     * P -------    (P indicates it's the placing lane)
     * The interval should be the contained lane's endpoints
     * 2: Exceeding in aft:
     *   -------    Exceeding in aft
     * P   -------
     * The interval should be the placing lane's aft and the exceeding lane's fwd
     * 3: Exceeding both sides:
     *   ----------- Exceeding both sides
     * P   -------
     * The interval should be the placing lane's endpoints
     * 4: Exceeding in fwd:
     *     --------  Exceeding in fwd
     * P --------
     * The interval should be the exceeding lane's aft and the placing lanes fwd
     * This case is not currently tested
     */

    const expectedValue = [
      {
        start: LCG - length / 2,
        end: LCG + length / 2,
        overflowingLaneId: "",
        fromLaneAFT: true,
      },
      {
        start: firstLCG - firstLength / 2,
        end: firstLCG + firstLength / 2,
        overflowingLaneId: "3",
        fromLaneAFT: true,
      },
      {
        start: LCG - length / 2,
        end: secondLCG + secondLength / 2,
        overflowingLaneId: "4",
        fromLaneAFT: true,
      },
      {
        start: LCG - length / 2,
        end: LCG + length / 2,
        overflowingLaneId: "6",
        fromLaneAFT: true,
      },
    ] as ValidPlacementInterval[];
    expect(validPlacementIntervals).toStrictEqual(expectedValue);
  });
  test("Should return interval from aft of lane to most fwd position with continously placed cargo", () => {
    const cargoPlacement1 = {
      id: "5fae3d4efe268d0012f2e69a",
      discharged: false,
      replacing: false,
      deckId: "Weather Deck",
      laneId: "5",
      LCG: 203.39,
      TCG: -4.37,
      VCG: 23.915,
      overflowingLaneId: "",
      voyageId: "dummy_voyage_id",
      cargo: trailer1Cargo,
      createdAt: new Date(),
      updatedAt: new Date(),
    } as CargoPlacement;
    const cargoPlacement2 = {
      id: "5fae3d5ffe268d0012f2e6a6",
      discharged: false,
      replacing: false,
      deckId: "Weather Deck",
      laneId: "5",
      LCG: 189.17,
      TCG: -4.37,
      VCG: 23.915,
      overflowingLaneId: "",
      voyageId: "dummy_voyage_id",
      cargo: trailer2Cargo,
      createdAt: new Date(),
      updatedAt: new Date(),
    } as CargoPlacement;
    const validPlacementIntervals = getValidPlacementIntervals(
      laneWithoutAdjacentLanes,
      [cargoPlacement2, cargoPlacement1], //CargoPlacements must be set sorted from least LCG to highest
      [],
      bumperToBumperDistance
    );
    const { length, LCG } = laneWithoutAdjacentLanes;
    const expectedValue = [
      {
        start: LCG - length / 2,
        end:
          cargoPlacement2.LCG -
          cargoPlacement2.cargo.length / 2 -
          bumperToBumperDistance,
        overflowingLaneId: "",
        fromLaneAFT: true,
      },
    ] as ValidPlacementInterval[];
    expect(validPlacementIntervals).toStrictEqual(expectedValue);
  });
  test("Should return multiple intervals with discontinously placed cargo", () => {
    const cargoPlacement1 = {
      id: "5fae3d4efe268d0012f2e69a",
      discharged: false,
      replacing: false,
      deckId: "Weather Deck",
      laneId: "5",
      LCG: 203.39,
      TCG: -4.37,
      VCG: 23.915,
      overflowingLaneId: "",
      voyageId: "dummy_voyage_id",
      cargo: trailer1Cargo,
      createdAt: new Date(),
      updatedAt: new Date(),
    } as CargoPlacement;
    const cargoPlacement2 = {
      id: "5fae3d5ffe268d0012f2e6a6",
      discharged: false,
      replacing: false,
      deckId: "Weather Deck",
      laneId: "5",
      LCG: 36.01,
      TCG: -4.37,
      VCG: 23.915,
      overflowingLaneId: "",
      voyageId: "dummy_voyage_id",
      cargo: trailer2Cargo,
      createdAt: new Date(),
      updatedAt: new Date(),
    } as CargoPlacement;
    const validPlacementIntervals = getValidPlacementIntervals(
      laneWithoutAdjacentLanes,
      [cargoPlacement2, cargoPlacement1], //CargoPlacements must be set sorted from least LCG to highest
      [],
      bumperToBumperDistance
    );
    const { length, LCG } = laneWithoutAdjacentLanes;
    const expectedValue = [
      {
        start: LCG - length / 2,
        end:
          cargoPlacement2.LCG -
          cargoPlacement2.cargo.length / 2 -
          bumperToBumperDistance,
        overflowingLaneId: "",
        fromLaneAFT: true,
      },
      {
        start:
          cargoPlacement2.LCG +
          cargoPlacement2.cargo.length / 2 +
          bumperToBumperDistance,
        end:
          cargoPlacement1.LCG -
          cargoPlacement1.cargo.length / 2 -
          bumperToBumperDistance,
        overflowingLaneId: "",
        fromLaneAFT: false,
      },
    ] as ValidPlacementInterval[];
    expect(validPlacementIntervals).toStrictEqual(expectedValue);
  });
  test("Should take into account intervals from last cargo to forward of lane", () => {
    const cargoPlacement1 = {
      id: "5fae3d4efe268d0012f2e69a",
      discharged: false,
      replacing: false,
      deckId: "Weather Deck",
      laneId: "5",
      LCG: 189.17,
      TCG: -4.37,
      VCG: 23.915,
      overflowingLaneId: "",
      voyageId: "dummy_voyage_id",
      cargo: trailer1Cargo,
      createdAt: new Date(),
      updatedAt: new Date(),
    } as CargoPlacement;
    const cargoPlacement2 = {
      id: "5fae3d5ffe268d0012f2e6a6",
      discharged: false,
      replacing: false,
      deckId: "Weather Deck",
      laneId: "5",
      LCG: 36.01,
      TCG: -4.37,
      VCG: 23.915,
      overflowingLaneId: "",
      voyageId: "dummy_voyage_id",
      cargo: trailer2Cargo,
      createdAt: new Date(),
      updatedAt: new Date(),
    } as CargoPlacement;
    const validPlacementIntervals = getValidPlacementIntervals(
      laneWithoutAdjacentLanes,
      [cargoPlacement2, cargoPlacement1], //CargoPlacements must be set sorted from least LCG to highest
      [],
      bumperToBumperDistance
    );
    const { length, LCG } = laneWithoutAdjacentLanes;
    const expectedValue = [
      {
        start: LCG - length / 2,
        end:
          cargoPlacement2.LCG -
          cargoPlacement2.cargo.length / 2 -
          bumperToBumperDistance,
        overflowingLaneId: "",
        fromLaneAFT: true,
      },
      {
        start:
          cargoPlacement2.LCG +
          cargoPlacement2.cargo.length / 2 +
          bumperToBumperDistance,
        end:
          cargoPlacement1.LCG -
          cargoPlacement1.cargo.length / 2 -
          bumperToBumperDistance,
        overflowingLaneId: "",
        fromLaneAFT: false,
      },
      {
        start:
          cargoPlacement1.LCG +
          cargoPlacement1.cargo.length / 2 +
          bumperToBumperDistance,
        end: LCG + length / 2,
        overflowingLaneId: "",
        fromLaneAFT: false,
      },
    ] as ValidPlacementInterval[];
    expect(validPlacementIntervals).toStrictEqual(expectedValue);
  });
  test("Should ignore small intervals", () => {
    const cargoPlacement1 = {
      id: "5fae3d4efe268d0012f2e69a",
      discharged: false,
      replacing: false,
      deckId: "Weather Deck",
      laneId: "5",
      LCG: 193.17,
      TCG: -4.37,
      VCG: 23.915,
      overflowingLaneId: "",
      voyageId: "dummy_voyage_id",
      cargo: trailer1Cargo,
      createdAt: new Date(),
      updatedAt: new Date(),
    } as CargoPlacement;
    const cargoPlacement2 = {
      id: "5fae3d5ffe268d0012f2e6a6",
      discharged: false,
      replacing: false,
      deckId: "Weather Deck",
      laneId: "5",
      LCG: 36.01,
      TCG: -4.37,
      VCG: 23.915,
      overflowingLaneId: "",
      voyageId: "dummy_voyage_id",
      cargo: trailer2Cargo,
      createdAt: new Date(),
      updatedAt: new Date(),
    } as CargoPlacement;
    const validPlacementIntervals = getValidPlacementIntervals(
      laneWithoutAdjacentLanes,
      [cargoPlacement2, cargoPlacement1], //CargoPlacements must be set sorted from least LCG to highest
      [],
      bumperToBumperDistance
    );
    const { length, LCG } = laneWithoutAdjacentLanes;
    const expectedValue = [
      {
        start: LCG - length / 2,
        end:
          cargoPlacement2.LCG -
          cargoPlacement2.cargo.length / 2 -
          bumperToBumperDistance,
        overflowingLaneId: "",
        fromLaneAFT: true,
      },
      {
        start:
          cargoPlacement2.LCG +
          cargoPlacement2.cargo.length / 2 +
          bumperToBumperDistance,
        end:
          cargoPlacement1.LCG -
          cargoPlacement1.cargo.length / 2 -
          bumperToBumperDistance,
        overflowingLaneId: "",
        fromLaneAFT: false,
      },
    ] as ValidPlacementInterval[];
    expect(validPlacementIntervals).toStrictEqual(expectedValue);
  });
});

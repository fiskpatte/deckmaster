import { AdjacentSide } from "../../constants";
import {
  AdjacentLane,
  Cargo,
  CargoPlacement,
  Lane,
  ValidPlacementInterval,
} from "../../types/deckMap";
import { getValidPlacementIntervals } from "./DeckMap.functions";
// import { getMostForwardValidPlacementForLanes } from "./DeckMap.functions";

// describe("Most forward valid placement", () => {
//   const bumperToBumperDistance = 0.6;
//   const defaultVCG = 0.45;
//   const normalCargo = {
//     height: 3.1,
//     id: "5f9833b43692c61b9caa497e",
//     length: 11.4,
//     registrationNumber: "GVM 957",
//     weight: 16,
//     width: 2.3,
//     createdAt: new Date(),
//     updatedAt: new Date(),
//   } as Cargo;
//   const overflowingCargo = {
//     height: 3.1,
//     id: "5f9833b43692c61b9caa497f",
//     length: 11.4,
//     registrationNumber: "FTV 123",
//     weight: 16,
//     width: 4,
//     createdAt: new Date(),
//     updatedAt: new Date(),
//   } as Cargo;
//   const laneWithoutAdjacentLanes = {
//     LCG: 105.2,
//     TCG: -4.37,
//     VCG: 22.7,
//     adjacentLanes: [],
//     id: "5",
//     length: 210,
//     name: "WD03",
//     partial: false,
//     width: 2.6,
//   } as Lane;
//   test("Should return FWD of lane for empty lanes and normal cargo without overflowing cargo into lane", () => {
//     const cargoPlacements = [] as CargoPlacement[];
//     const lanes = [laneWithoutAdjacentLanes];
//     const mostForwardValidPlacement = getMostForwardValidPlacementForLanes(
//       lanes,
//       cargoPlacements,
//       normalCargo,
//       bumperToBumperDistance,
//       defaultVCG
//     );
//     const expectedValue = {
//       [laneWithoutAdjacentLanes.id]: {
//         LCG: laneWithoutAdjacentLanes.LCG + laneWithoutAdjacentLanes.length / 2,
//         TCG: laneWithoutAdjacentLanes.TCG,
//         VCG: laneWithoutAdjacentLanes.VCG + normalCargo.height * defaultVCG,
//         laneId: laneWithoutAdjacentLanes.id,
//         replacing: false,
//       },
//     };
//     expect(mostForwardValidPlacement).toStrictEqual(expectedValue);
//   });
//   test("Should ignore the selected cargo if it is already placed", () => {
//     const cargoPlacement = {
//       id: "5f565a2cb9693730dcde890c",
//       LCG: 132.25,
//       TCG: -4.37,
//       VCG: 24.095,
//       cargo: normalCargo,
//       deckId: "Weather Deck",
//       discharged: false,
//       laneId: "5",
//       replacing: false,
//       voyageId: "dummy_voyage_id",
//       overflowingLaneId: "",
//       createdAt: new Date(),
//       updatedAt: new Date(),
//     } as CargoPlacement;
//     const cargoPlacements = [cargoPlacement];
//     const lanes = [laneWithoutAdjacentLanes];
//     const mostForwardValidPlacement = getMostForwardValidPlacementForLanes(
//       lanes,
//       cargoPlacements,
//       normalCargo,
//       bumperToBumperDistance,
//       defaultVCG
//     );
//     const expectedValue = {
//       [laneWithoutAdjacentLanes.id]: {
//         LCG: laneWithoutAdjacentLanes.LCG + laneWithoutAdjacentLanes.length / 2,
//         TCG: laneWithoutAdjacentLanes.TCG,
//         VCG: laneWithoutAdjacentLanes.VCG + normalCargo.height * defaultVCG,
//         laneId: laneWithoutAdjacentLanes.id,
//         replacing: false,
//       },
//     };
//     expect(mostForwardValidPlacement).toStrictEqual(expectedValue);
//   });
//   test("Should return most AFT of other cargo placements respecting bumperToBumperDistance for normal cargo without overflowing cargo into lane", () => {
//     const cargoPlacement = {
//       id: "5f565a2cb9693730dcde890c",
//       LCG: 132.25,
//       TCG: -4.37,
//       VCG: 24.095,
//       cargo: overflowingCargo,
//       deckId: "Weather Deck",
//       discharged: false,
//       laneId: "5",
//       replacing: false,
//       voyageId: "dummy_voyage_id",
//       overflowingLaneId: "",
//       createdAt: new Date(),
//       updatedAt: new Date(),
//     } as CargoPlacement;
//     const cargoPlacements = [cargoPlacement, { ...cargoPlacement, LCG: 140 }];
//     const lanes = [laneWithoutAdjacentLanes];
//     const mostForwardValidPlacement = getMostForwardValidPlacementForLanes(
//       lanes,
//       cargoPlacements,
//       normalCargo,
//       bumperToBumperDistance,
//       defaultVCG
//     );
//     const expectedValue = {
//       [laneWithoutAdjacentLanes.id]: {
//         LCG:
//           cargoPlacement.LCG -
//           cargoPlacement.cargo.length / 2 -
//           bumperToBumperDistance,
//         TCG: laneWithoutAdjacentLanes.TCG,
//         VCG: laneWithoutAdjacentLanes.VCG + normalCargo.height * defaultVCG,
//         laneId: laneWithoutAdjacentLanes.id,
//         replacing: false,
//       },
//     };
//     expect(mostForwardValidPlacement).toStrictEqual(expectedValue);
//   });
//   test("Should return most AFT of other cargo placements respecting bumperToBumperDistance for normal cargo with overflowing cargo into lane", () => {
//     const cargoPlacement = {
//       id: "5f565a2cb9693730dcde890c",
//       LCG: 132.25,
//       TCG: -4.37,
//       VCG: 24.095,
//       cargo: overflowingCargo,
//       deckId: "Weather Deck",
//       discharged: false,
//       laneId: "4",
//       replacing: false,
//       voyageId: "dummy_voyage_id",
//       overflowingLaneId: "5",
//       createdAt: new Date(),
//       updatedAt: new Date(),
//     } as CargoPlacement;
//     const cargoPlacements = [
//       cargoPlacement,
//       { ...cargoPlacement, laneId: "5", overflowingLaneId: "", LCG: 140 },
//     ];
//     const lanes = [laneWithoutAdjacentLanes];
//     const mostForwardValidPlacement = getMostForwardValidPlacementForLanes(
//       lanes,
//       cargoPlacements,
//       normalCargo,
//       bumperToBumperDistance,
//       defaultVCG
//     );
//     const expectedValue = {
//       [laneWithoutAdjacentLanes.id]: {
//         LCG:
//           cargoPlacement.LCG -
//           cargoPlacement.cargo.length / 2 -
//           bumperToBumperDistance,
//         TCG: laneWithoutAdjacentLanes.TCG,
//         VCG: laneWithoutAdjacentLanes.VCG + normalCargo.height * defaultVCG,
//         laneId: laneWithoutAdjacentLanes.id,
//         replacing: false,
//       },
//     };
//     expect(mostForwardValidPlacement).toStrictEqual(expectedValue);
//   });
//   test("Should return empty placement when there is not enough space for the current cargo in the lane", () => {
//     const cargoPlacement = {
//       id: "5f565a2cb9693730dcde890c",
//       LCG: 13.25,
//       TCG: -4.37,
//       VCG: 24.095,
//       cargo: overflowingCargo,
//       deckId: "Weather Deck",
//       discharged: false,
//       laneId: "4",
//       replacing: false,
//       voyageId: "dummy_voyage_id",
//       overflowingLaneId: "5",
//       createdAt: new Date(),
//       updatedAt: new Date(),
//     } as CargoPlacement;
//     const cargoPlacements = [cargoPlacement];
//     const lanes = [laneWithoutAdjacentLanes];
//     const mostForwardValidPlacement = getMostForwardValidPlacementForLanes(
//       lanes,
//       cargoPlacements,
//       normalCargo,
//       bumperToBumperDistance,
//       defaultVCG
//     );
//     const expectedValue = {
//       [laneWithoutAdjacentLanes.id]: cargoPlacementFactory(),
//     };
//     expect(mostForwardValidPlacement).toStrictEqual(expectedValue);
//   });
// });

// describe("Get overflowing placement", () => {
//   test("Should return empty placement when adjacent lanes are occupied and recursive is false", () => {

//   })
// });

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
  //   const overflowingCargo = {
  //     height: 3.1,
  //     id: "5f9833b43692c61b9caa497f",
  //     length: 11.4,
  //     registrationNumber: "FTV 123",
  //     weight: 16,
  //     width: 4,
  //     createdAt: new Date(),
  //     updatedAt: new Date(),
  //   } as Cargo;
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
  // const laneWithLeftAdjacentLane = {
  //   ...laneWithoutAdjacentLanes,
  //   adjacentLanes:[leftAdjacentLane]
  // } as Lane;
  // const laneWithRightAdjacentLane = {
  //   ...laneWithoutAdjacentLanes,
  //   adjacentLanes:[rightAdjacentLane]
  // } as Lane;
  // const laneWithLeftAndRightAdjacentLane = {
  //   ...laneWithoutAdjacentLanes,
  //   adjacentLanes:[leftAdjacentLane,rightAdjacentLane]
  // } as Lane;
  const laneWithLeftAndRightAndPartialAdjacentLane = {
    ...laneWithoutAdjacentLanes,
    adjacentLanes: [
      leftAdjacentLane,
      leftPartialAdjacentLane,
      rightAdjacentLane,
      { ...rightAdjacentLane, LCG: rightAdjacentLane.LCG + 10 },
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
        overflowingSide: AdjacentSide.Undefined,
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
    const fourthLength = adjacentLanes[3].length;
    const fourthLCG = adjacentLanes[3].LCG;

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
     */

    const expectedValue = [
      {
        start: LCG - length / 2,
        end: LCG + length / 2,
        overflowingSide: AdjacentSide.Undefined,
      },
      {
        start: firstLCG - firstLength / 2,
        end: firstLCG + firstLength / 2,
        overflowingSide: AdjacentSide.Left,
      },
      {
        start: LCG - length / 2,
        end: secondLCG + secondLength / 2,
        overflowingSide: AdjacentSide.Left,
      },
      {
        start: LCG - length / 2,
        end: LCG + length / 2,
        overflowingSide: AdjacentSide.Right,
      },
      {
        start: fourthLCG - fourthLength / 2,
        end: LCG + length / 2,
        overflowingSide: AdjacentSide.Right,
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
        overflowingSide: AdjacentSide.Undefined,
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
        overflowingSide: AdjacentSide.Undefined,
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
        overflowingSide: AdjacentSide.Undefined,
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
        overflowingSide: AdjacentSide.Undefined,
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
        overflowingSide: AdjacentSide.Undefined,
      },
      {
        start:
          cargoPlacement1.LCG +
          cargoPlacement1.cargo.length / 2 +
          bumperToBumperDistance,
        end: LCG + length / 2,
        overflowingSide: AdjacentSide.Undefined,
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
        overflowingSide: AdjacentSide.Undefined,
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
        overflowingSide: AdjacentSide.Undefined,
      },
    ] as ValidPlacementInterval[];
    expect(validPlacementIntervals).toStrictEqual(expectedValue);
  });
});

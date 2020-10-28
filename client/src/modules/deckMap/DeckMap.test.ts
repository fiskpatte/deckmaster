import { Cargo, CargoPlacement, Lane } from "../../types/deckMap";
import { getMostForwardValidPlacementForLanes } from "./DeckMap.functions"

describe("Most forward valid placement", () => {
  const bumperToBumperDistance = 0.6;
  const defaultVCG = 0.45;
  const normalCargo = {
    height: 3.1,
    id: "5f9833b43692c61b9caa497e",
    length: 11.4,
    registrationNumber: "GVM 957",
    weight: 16,
    width: 2.3,
    createdAt: new Date(),
    updatedAt: new Date(),
  } as Cargo;
  const overflowingCargo = {
    height: 3.1,
    id: "5f9833b43692c61b9caa497f",
    length: 11.4,
    registrationNumber: "FTV 123",
    weight: 16,
    width: 4,
    createdAt: new Date(),
    updatedAt: new Date(),
  } as Cargo;
  const laneWithoutAdjacentLanes = {
    LCG: 105.2,
    TCG: -4.37,
    VCG: 22.7,
    adjacentLanes: [],
    id: "5",
    length: 210,
    name: "WD03",
    partial: false,
    width: 2.6,
  } as Lane;
  test("Should return front of lane for empty lanes and normal cargo without overflowing cargo into lane", () => {
    const cargoPlacements = [] as CargoPlacement[];
    const lanes = [laneWithoutAdjacentLanes];
    const mostForwardValidPlacement = getMostForwardValidPlacementForLanes(
      lanes,
      cargoPlacements,
      normalCargo,
      bumperToBumperDistance,
      defaultVCG
    );
    const expectedValue = {
      [laneWithoutAdjacentLanes.id]: {
        LCG: laneWithoutAdjacentLanes.LCG + laneWithoutAdjacentLanes.length / 2,
        TCG: laneWithoutAdjacentLanes.TCG,
        VCG: laneWithoutAdjacentLanes.VCG + normalCargo.height * defaultVCG,
        laneId: laneWithoutAdjacentLanes.id,
        replacing: false,
      }
    };
    expect(mostForwardValidPlacement).toStrictEqual(expectedValue);
  });
  test("Should ignore the selected cargo if it is already placed", () => {
    const cargoPlacement = {
      id: "5f565a2cb9693730dcde890c",
      LCG: 132.25,
      TCG: -4.37,
      VCG: 24.095,
      cargo: normalCargo,
      deckId: "Weather Deck",
      discharged: false,
      laneId: "5",
      replacing: false,
      voyageId: "dummy_voyage_id",
      overflowingLaneId: "",
      createdAt: new Date(),
      updatedAt: new Date(),
    } as CargoPlacement
    const cargoPlacements = [cargoPlacement];
    const lanes = [laneWithoutAdjacentLanes];
    const mostForwardValidPlacement = getMostForwardValidPlacementForLanes(
      lanes,
      cargoPlacements,
      normalCargo,
      bumperToBumperDistance,
      defaultVCG
    );
    const expectedValue = {
      [laneWithoutAdjacentLanes.id]: {
        LCG: laneWithoutAdjacentLanes.LCG + laneWithoutAdjacentLanes.length / 2,
        TCG: laneWithoutAdjacentLanes.TCG,
        VCG: laneWithoutAdjacentLanes.VCG + normalCargo.height * defaultVCG,
        laneId: laneWithoutAdjacentLanes.id,
        replacing: false,
      }
    };
    expect(mostForwardValidPlacement).toStrictEqual(expectedValue);
  });
  test("Should return most AFT of other cargo placements respecting bumperToBumperDistance for normal cargo without overflowing cargo into lane", () => {
    const cargoPlacement = {
      id: "5f565a2cb9693730dcde890c",
      LCG: 132.25,
      TCG: -4.37,
      VCG: 24.095,
      cargo: overflowingCargo,
      deckId: "Weather Deck",
      discharged: false,
      laneId: "5",
      replacing: false,
      voyageId: "dummy_voyage_id",
      overflowingLaneId: "",
      createdAt: new Date(),
      updatedAt: new Date(),
    } as CargoPlacement
    const cargoPlacements = [cargoPlacement, { ...cargoPlacement, LCG: 140 }];
    const lanes = [laneWithoutAdjacentLanes];
    const mostForwardValidPlacement = getMostForwardValidPlacementForLanes(
      lanes,
      cargoPlacements,
      normalCargo,
      bumperToBumperDistance,
      defaultVCG
    );
    const expectedValue = {
      [laneWithoutAdjacentLanes.id]: {
        LCG: cargoPlacement.LCG - cargoPlacement.cargo.length / 2 - bumperToBumperDistance,
        TCG: laneWithoutAdjacentLanes.TCG,
        VCG: laneWithoutAdjacentLanes.VCG + normalCargo.height * defaultVCG,
        laneId: laneWithoutAdjacentLanes.id,
        replacing: false,
      }
    };
    expect(mostForwardValidPlacement).toStrictEqual(expectedValue);
  });
})
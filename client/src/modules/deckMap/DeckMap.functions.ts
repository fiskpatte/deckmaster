import { arrayMax, arrayMin, isEqual } from "../../functions/math";
import { DECK_MAP, AdjacentSide } from "../../constants";
import {
  Deck,
  Cargo,
  DeckMapElement,
  Lane,
  CargoPlacement,
  cargoPlacementFactory,
  DeckSelectorData,
  cargoPlacementAsDeckMapElement,
} from "../../types/deckMap";
import { Coords } from "../../types/util";
import { DeckMapType } from "./../../types/deckMap";

export const getViewBoxOriginX = (currentDeck: Deck): number => {
  return (
    arrayMin(currentDeck.lanes.map((lane) => getEndpoints(lane).after)) *
      DECK_MAP.X_SCALE -
    DECK_MAP.X_MARGIN
  );
};

export const getViewBoxOriginY = (currentDeck: Deck): number => {
  return (
    arrayMin(currentDeck.lanes.map((lane) => getEndpoints(lane).left)) *
      DECK_MAP.Y_SCALE -
    DECK_MAP.Y_MARGIN / 2
  );
};

export const getViewBoxSizeX = (currentDeck: Deck): number => {
  let xMax = arrayMax(
    currentDeck.lanes.map((lane) => getEndpoints(lane).forward)
  );
  let xMin = arrayMin(
    currentDeck.lanes.map((lane) => getEndpoints(lane).after)
  );
  return xMax - xMin + DECK_MAP.X_MARGIN + 2 * DECK_MAP.LANE_BUTTON_WIDTH;
};

export const getViewBoxSizeY = (currentDeck: Deck): number => {
  let yMin = arrayMin(currentDeck.lanes.map((lane) => getEndpoints(lane).left));
  return (
    (getReplacementBoxOrigin(currentDeck) -
      yMin +
      DECK_MAP.REPLACEMENT_BOX_HEIGHT) *
      DECK_MAP.Y_SCALE +
    DECK_MAP.Y_MARGIN
  );
};

export const getDeckMapBottom = (currentDeck: Deck): number => {
  return (
    arrayMax(currentDeck.lanes.map((lane) => getEndpoints(lane).right)) +
    DECK_MAP.BASE_MARGIN
  );
};

export const getReplacementBoxOrigin = (currentDeck: Deck): number => {
  return (
    getDeckMapBottom(currentDeck) +
    3 * DECK_MAP.FRAME_HEIGHT +
    DECK_MAP.BASE_MARGIN
  );
};

// translate page coordinate to SVG coordinate
export const svgPoint = (
  svgElement: SVGSVGElement,
  fromElement: SVGGraphicsElement,
  x: number,
  y: number
) => {
  const pt = svgElement.createSVGPoint();
  pt.x = x;
  pt.y = y;
  return pt.matrixTransform(fromElement.getScreenCTM()?.inverse());
};

const getScreenCoordinatesFromEvent = (
  event:
    | React.MouseEvent
    | React.TouchEvent
    | React.PointerEvent
    | MouseEvent
    | TouchEvent
    | PointerEvent
): Coords | undefined => {
  event.preventDefault();
  let x = 0;
  let y = 0;
  if ("nativeEvent" in event) {
    event = event.nativeEvent;
  }
  if (window.TouchEvent && event instanceof TouchEvent) {
    if (event.touches.length === 1) {
      let touch = event.touches[0];
      x = touch.clientX;
      y = touch.clientY;
    } else {
      return undefined;
    }
  } else if (event instanceof MouseEvent || event instanceof PointerEvent) {
    x = event.clientX;
    y = event.clientY;
  }
  return { x, y } as Coords;
};

export const getPlacementFromEvent = (
  event: React.MouseEvent | React.TouchEvent | React.PointerEvent,
  svgRef: React.RefObject<SVGSVGElement>,
  cargoPlacementsForLane: Array<CargoPlacement>,
  adjacentCargoPlacementsForLane: Array<CargoPlacement>,
  lane: Lane,
  placement: CargoPlacement
  // bumperToBumperDistance: number
) => {
  let coords = getScreenCoordinatesFromEvent(event);
  return getPlacementFromScreenCoords(
    coords,
    svgRef,
    cargoPlacementsForLane,
    adjacentCargoPlacementsForLane,
    lane,
    placement
    // bumperToBumperDistance
  );
};

export const getPlacementFromScreenCoords = (
  coords: Coords | undefined,
  svgRef: React.RefObject<SVGSVGElement>,
  cargoPlacementsForLane: Array<CargoPlacement>,
  adjacentCargoPlacementsForLane: Array<CargoPlacement>,
  lane: Lane,
  placement: CargoPlacement
  // bumperToBumperDistance: number
) => {
  if (!svgRef.current || !coords) return cargoPlacementFactory();
  let deckMapCoords = getDeckMapCoordsFromScreenCoords(svgRef.current, coords);
  let resultPlacement = {
    ...placement,
    LCG: deckMapCoords.x,
    TCG: lane.TCG,
    laneId: lane.id,
    replacing: false,
  };
  if (isPlacementOutOfBounds(resultPlacement, lane))
    return cargoPlacementFactory();
  let { cargo } = placement;
  const cargoPlacement = cargoPlacementAsDeckMapElement(resultPlacement);
  if (
    cargoPlacementsForLane.some((cp) =>
      isOverlapping(cargoPlacementAsDeckMapElement(cp), cargoPlacement)
    )
  ) {
    return cargoPlacementFactory();
  }
  if (isOverflowing(cargo, lane)) {
    const overflowingPlacement = getOverflowingPlacement(
      lane,
      cargo,
      resultPlacement,
      adjacentCargoPlacementsForLane,
      false,
      false
    );
    if (!isValidPlacement(overflowingPlacement)) return cargoPlacementFactory();
    resultPlacement = overflowingPlacement;
  }
  return resultPlacement;
};

export const getPlacementFromDragEvent = (
  event:
    | React.MouseEvent
    | React.TouchEvent
    | React.PointerEvent
    | MouseEvent
    | TouchEvent
    | PointerEvent,
  svgRef: React.RefObject<SVGSVGElement>,
  cargoPlacementsForLane: Array<CargoPlacement>,
  adjacentCargoPlacementsForLane: Array<CargoPlacement>,
  lane: Lane,
  placement: CargoPlacement,
  bumperToBumperDistance: number
) => {
  let coords = getScreenCoordinatesFromEvent(event);

  if (!coords || !svgRef.current) {
    return cargoPlacementFactory();
  }
  let deckMapCoords = getDeckMapCoordsFromScreenCoords(svgRef.current, coords);

  const cargoPlacement = cargoPlacementAsDeckMapElement(placement);
  const { cargo } = placement;
  const isOverflow = isOverflowing(cargo, lane);
  let overflowingXPlacement = 1000;
  if (isOverflow) {
    //Set a limit in the y displacement
    const leftAdjacentLane = lane.adjacentLanes.filter(
      (al) =>
        al.adjacentSide === AdjacentSide.Left &&
        isAdjacent(al, cargoPlacement, true)
    );
    const rightAdjacentLane = lane.adjacentLanes.filter(
      (al) =>
        al.adjacentSide === AdjacentSide.Right &&
        isAdjacent(al, cargoPlacement, true)
    );
    const someLeftAdjacentLane = leftAdjacentLane.length > 0;
    const someRightAdjacentLane = rightAdjacentLane.length > 0;
    if (!someRightAdjacentLane && !someLeftAdjacentLane)
      return cargoPlacementFactory();
    const adjacentCargoInLeftAdjacentLane = adjacentCargoPlacementsForLane.filter(
      (acp) =>
        someLeftAdjacentLane &&
        acp.laneId === leftAdjacentLane[0].id &&
        isAdjacent(cargoPlacementAsDeckMapElement(acp), cargoPlacement)
    );
    const adjacentCargoInRightAdjacentLane = adjacentCargoPlacementsForLane.filter(
      (acp) =>
        someRightAdjacentLane &&
        acp.laneId === rightAdjacentLane[0].id &&
        isAdjacent(cargoPlacementAsDeckMapElement(acp), cargoPlacement)
    );
    const someAdjacentCargoInLeftAdjacentLane =
      adjacentCargoInLeftAdjacentLane.length > 0;
    const someAdjacentCargoInRightAdjacentLane =
      adjacentCargoInRightAdjacentLane.length > 0;
    const cargoInLeftEdge = lane.TCG + (cargo.width - lane.width) / 2;
    const cargoInRightEdge = lane.TCG - (cargo.width - lane.width) / 2;
    let max =
      someRightAdjacentLane && !someAdjacentCargoInRightAdjacentLane
        ? cargoInLeftEdge
        : cargoInRightEdge;
    let min =
      someLeftAdjacentLane && !someAdjacentCargoInLeftAdjacentLane
        ? cargoInRightEdge
        : cargoInLeftEdge;
    deckMapCoords.y = Math.min(Math.max(deckMapCoords.y, min), max);
    // Get limit in x displacement for overflowing cargo
    if (
      !(
        (someRightAdjacentLane && !someAdjacentCargoInRightAdjacentLane) ||
        (someLeftAdjacentLane && !someAdjacentCargoInLeftAdjacentLane)
      )
    ) {
      overflowingXPlacement = placement.LCG;
      deckMapCoords.y = placement.TCG;
    }
  } else {
    //Ignore y displacement
    deckMapCoords.y = placement.TCG;
  }
  //Set a limit in the x displacement
  let laneEndpoints = getEndpoints(lane);
  let max = arrayMin(
    cargoPlacementsForLane
      .filter((c) => c.LCG > placement.LCG)
      .map(getAfterPosition),
    laneEndpoints.forward
  );
  max -=
    cargo.length / 2 +
    (isEqual(max, laneEndpoints.forward) ? 0 : bumperToBumperDistance);
  max = Math.min(max, overflowingXPlacement);
  let min = arrayMax(
    cargoPlacementsForLane
      .filter((c) => c.LCG < placement.LCG)
      .map(getForwardPosition),
    laneEndpoints.after
  );
  min +=
    cargo.length / 2 +
    (isEqual(min, laneEndpoints.after) ? 0 : bumperToBumperDistance);
  deckMapCoords.x = Math.min(Math.max(deckMapCoords.x, min), max);

  if (deckMapCoords.x !== placement.LCG || deckMapCoords.y !== placement.TCG) {
    let newPlacement = {
      ...placement,
      LCG: deckMapCoords.x,
      TCG: deckMapCoords.y,
    };
    return newPlacement;
  }
  return cargoPlacementFactory();
};

// const overflowingLimitMap = (
//   lane: Lane,
//   cargoPlacementsForLane: CargoPlacement[],
//   adjacentCargoPlacementsForLane: CargoPlacement[],
//   cargoPlacement: DeckMapElement
// ) => {
//   const leftAdjacentLane = lane.adjacentLanes.filter(
//     (al) =>
//       al.adjacentSide === AdjacentSide.Left &&
//       isAdjacent(al, cargoPlacement, true)
//   );
//   const rightAdjacentLane = lane.adjacentLanes.filter(
//     (al) =>
//       al.adjacentSide === AdjacentSide.Right &&
//       isAdjacent(al, cargoPlacement, true)
//   );
//   const someLeftAdjacentLane = leftAdjacentLane.length > 0;
//     const someRightAdjacentLane = rightAdjacentLane.length > 0;
//     if (!someRightAdjacentLane && !someLeftAdjacentLane)
//       return cargoPlacementFactory();
//   const cargoInLeftAdjacentLane = adjacentCargoPlacementsForLane.filter(
//     (acp) =>
//       someLeftAdjacentLane &&
//       acp.laneId === leftAdjacentLane[0].id //&&
//       // isAdjacent(cargoPlacementAsDeckMapElement(acp), cargoPlacement)
//   );
//   const cargoInRightAdjacentLane = adjacentCargoPlacementsForLane.filter(
//     (acp) =>
//       someRightAdjacentLane &&
//       acp.laneId === rightAdjacentLane[0].id //&&
//       // isAdjacent(cargoPlacementAsDeckMapElement(acp), cargoPlacement)
//   );
// };

const getDeckMapCoordsFromScreenCoords = (
  svgElement: SVGSVGElement,
  coords: Coords
): Coords => {
  const centerPoint = svgPoint(svgElement, svgElement, coords.x, coords.y);
  return {
    x: centerPoint.x / DECK_MAP.X_SCALE,
    y: centerPoint.y / DECK_MAP.Y_SCALE,
  };
};

const getEndpoints = (elem: DeckMapElement) => {
  const left = elem.TCG - elem.width / 2;
  const right = left + elem.width;
  const after = elem.LCG - elem.length / 2;
  const forward = after + elem.length;

  return { left, right, after, forward };
};

const hasSpaceInBetween = (side1: number, side2: number, width: number) => {
  return Math.abs(side1 - side2) > width;
};

export const isAdjacent = (
  elem: DeckMapElement,
  newElem: DeckMapElement,
  contained = false
) => {
  const elemEndpoints = getEndpoints(elem);
  const newElemEndpoints = getEndpoints(newElem);

  //Two elements are considered adjacent if there is no space for an additional element in between them and if they have matching sides
  const matchingSides = contained
    ? newElemEndpoints.after >= elemEndpoints.after &&
      newElemEndpoints.forward <= elemEndpoints.forward
    : newElemEndpoints.after <= elemEndpoints.forward &&
      newElemEndpoints.forward >= elemEndpoints.after;

  const noSpaceInBetween = !(
    hasSpaceInBetween(
      elemEndpoints.right,
      newElemEndpoints.left,
      newElem.width
    ) &&
    hasSpaceInBetween(elemEndpoints.left, newElemEndpoints.right, newElem.width)
  );

  return matchingSides && noSpaceInBetween;
};

export const isOverlapping = (
  elem: DeckMapElement,
  newElem: DeckMapElement
) => {
  const elemEndpoints = getEndpoints(elem);
  const newElemEndpoints = getEndpoints(newElem);

  const matchingSides =
    newElemEndpoints.after <= elemEndpoints.forward &&
    newElemEndpoints.forward >= elemEndpoints.after;

  const overlapping =
    newElemEndpoints.left <= elemEndpoints.right &&
    newElemEndpoints.right >= elemEndpoints.left;

  return matchingSides && overlapping;
};

//Return if newElem is right or left of elem. if contained is true, the newElem has to be completely adjacent
export const getAdjacentSide = (
  elem: DeckMapElement,
  newElem: DeckMapElement,
  contained = false
) => {
  const elemEndpoints = getEndpoints(elem);
  const newElemEndpoints = getEndpoints(newElem);

  if (isAdjacent(elem, newElem, contained)) {
    if (
      !hasSpaceInBetween(
        elemEndpoints.right,
        newElemEndpoints.left,
        newElem.width
      )
    )
      return AdjacentSide.Right;
    if (
      !hasSpaceInBetween(
        elemEndpoints.left,
        newElemEndpoints.right,
        newElem.width
      )
    )
      return AdjacentSide.Left;
  }
  return AdjacentSide.Undefined;
};

// export const getMostForwardValidPlacementForLanes = (
//   lanes: Array<Lane>,
//   cargoPlacements: CargoPlacement[],
//   currentCargo: Cargo,
//   bumperToBumperDistance: number,
//   defaultVCG: number
// ) => {
//   let result = {} as MostForwardValidPlacementForLanes;
//   for (let lane of lanes) {
//     const mostForwardLanePlacement = {
//       LCG: lane.LCG + lane.length / 2,
//       TCG: lane.TCG,
//       VCG: lane.VCG + currentCargo.height * defaultVCG,
//       laneId: lane.id,
//       replacing: false,
//     } as CargoPlacement;
//     const cargoPlacementsForLane = cargoPlacements.filter(
//       (cp) => cp.laneId === lane.id && cp.cargo.id !== currentCargo.id
//     );
//     const overflowingCargoPlacementsIntoLane = cargoPlacements.filter(
//       (cp) =>
//         cp.overflowingLaneId === lane.id && cp.cargo.id !== currentCargo.id
//     );
//     const adjacentCargoPlacementsForLane = cargoPlacements.filter(
//       (cp) =>
//         lane.adjacentLanes.some((al) => al.id === cp.laneId) &&
//         cp.cargo.id !== currentCargo.id
//     );
//     result[lane.id] = getMostForwardValidPlacementForLane(
//       lane,
//       cargoPlacementsForLane,
//       overflowingCargoPlacementsIntoLane,
//       adjacentCargoPlacementsForLane,
//       currentCargo,
//       mostForwardLanePlacement,
//       bumperToBumperDistance
//     );
//   }
//   return result;
// };
export const getMostForwardValidPlacementForLane = (
  lane: Lane,
  cargoPlacementsForLane: Array<CargoPlacement>,
  adjacentCargoPlacementsForLane: Array<CargoPlacement>,
  currentCargo: Cargo,
  mostForwardLanePlacement: CargoPlacement,
  bumperToBumperDistance: number
): CargoPlacement => {
  let resultPlacement = { ...mostForwardLanePlacement };
  // there are no other vehicles blocking the forward most position, just return it
  if (cargoPlacementsForLane.length === 0 && currentCargo.width <= lane.width)
    return resultPlacement;

  const afterOfLane = getEndpoints(lane).after;
  let mostAfterCargoPlacement = arrayMin(
    cargoPlacementsForLane.map((c) => c.LCG - c.cargo.length / 2),
    resultPlacement.LCG
  );

  if (
    mostAfterCargoPlacement <
    afterOfLane + currentCargo.length + bumperToBumperDistance
  ) {
    // no room in lane
    return cargoPlacementFactory();
  }

  resultPlacement.LCG = mostAfterCargoPlacement - bumperToBumperDistance;

  if (isOverflowing(currentCargo, lane)) {
    return getOverflowingPlacement(
      lane,
      currentCargo,
      resultPlacement,
      adjacentCargoPlacementsForLane
    );
  }
  return resultPlacement;
};

export const getOverflowingPlacement = (
  placingLane: Lane,
  currentCargo: Cargo,
  placement: CargoPlacement,
  adjacentCargoPlacementsForLane: CargoPlacement[],
  recursive = true,
  frontPlacement = true
): CargoPlacement => {
  let resultPlacement = getOverflowingPlacementForSide(
    placingLane,
    currentCargo,
    placement,
    adjacentCargoPlacementsForLane,
    AdjacentSide.Right,
    frontPlacement
  );
  if (resultPlacement.laneId !== "") return resultPlacement;
  resultPlacement = getOverflowingPlacementForSide(
    placingLane,
    currentCargo,
    placement,
    adjacentCargoPlacementsForLane,
    AdjacentSide.Left,
    frontPlacement
  );

  if (resultPlacement.laneId !== "") return resultPlacement;
  if (recursive) {
    return handleOverflowRecursive(
      placingLane,
      currentCargo,
      placement,
      adjacentCargoPlacementsForLane
    );
  }

  return cargoPlacementFactory();
};

const handleOverflowRecursive = (
  placingLane: Lane,
  currentCargo: Cargo,
  placement: CargoPlacement,
  adjacentCargoPlacementsForLane: CargoPlacement[]
): CargoPlacement => {
  const backstep = 0.5;
  const laneAft = getEndpoints(placingLane).after;
  let tempPlacement = { ...placement };
  if (tempPlacement.LCG - backstep >= laneAft + currentCargo.length / 2) {
    tempPlacement.LCG -= backstep;
    return getOverflowingPlacement(
      placingLane,
      currentCargo,
      tempPlacement,
      adjacentCargoPlacementsForLane,
      true,
      true
    );
  } else {
    return cargoPlacementFactory();
  }
};

const getOverflowingPlacementForSide = (
  placingLane: Lane,
  currentCargo: Cargo,
  placement: CargoPlacement,
  adjacentCargoPlacementsForLane: CargoPlacement[],
  overflowSide: AdjacentSide,
  frontPlacement = true
): CargoPlacement => {
  if (overflowSide === AdjacentSide.Undefined) return cargoPlacementFactory();
  let resultPlacement = { ...placement };
  let cargo = cargoPlacementAsDeckMapElement(
    placement,
    currentCargo,
    frontPlacement
  );
  let adjacentLane = placingLane.adjacentLanes.filter(
    (al) => al.adjacentSide === overflowSide && isAdjacent(al, cargo, true)
  );
  if (
    adjacentLane.length === 1 &&
    !adjacentCargoPlacementsForLane.some(
      (ocp) =>
        ocp.laneId === adjacentLane[0].id &&
        isAdjacent({ ...ocp.cargo, ...ocp }, cargo)
    )
  ) {
    resultPlacement.TCG =
      placingLane.TCG +
      (overflowSide * (currentCargo.width - placingLane.width)) / 2;
    resultPlacement.overflowingLaneId = adjacentLane[0].id;
    return resultPlacement;
  }
  return cargoPlacementFactory();
};

export const getPlacementFromForwardPlacement = (
  placingLane: Lane,
  currentCargo: Cargo,
  placement: CargoPlacement,
  cargoPlacementsForLane: CargoPlacement[],
  adjacentCargoPlacementsForLane: CargoPlacement[]
) => {
  const cargoPlacement = cargoPlacementAsDeckMapElement(
    placement,
    currentCargo,
    true
  );
  let resultPlacement = { ...placement };
  if (
    cargoPlacementsForLane.some((cp) =>
      isOverlapping(cargoPlacementAsDeckMapElement(cp), cargoPlacement)
    )
  ) {
    return cargoPlacementFactory();
  }
  if (isOverflowing(currentCargo, placingLane)) {
    const overflowingPlacement = getOverflowingPlacement(
      placingLane,
      currentCargo,
      placement,
      adjacentCargoPlacementsForLane,
      false
    );
    if (!isValidPlacement(overflowingPlacement)) return cargoPlacementFactory();
    resultPlacement = overflowingPlacement;
  }
  return resultPlacement;
};

export const getDeckSelectorData = (deckMap: DeckMapType): DeckSelectorData[] =>
  getDeckNames(deckMap).map((key) => {
    return { name: key, sortOrder: deckMap[key].sortOrder };
  });

export const getDeckNames = (deckMap: DeckMapType) =>
  Object.keys(deckMap).sort(
    (key1, key2) => deckMap[key1].sortOrder - deckMap[key2].sortOrder
  );

export const cargoIsEmpty = (cargo: Cargo) => cargo.id === "";

export const cargoPlacementIsEmpty = (cargoPlacement: CargoPlacement) =>
  cargoPlacement.id === "";

export const cargoPlacementIsEmptyWithCargo = (
  cargoPlacement: CargoPlacement
) =>
  cargoPlacementIsEmpty(cargoPlacement) && !cargoIsEmpty(cargoPlacement.cargo);

export const cargoPlacementIsEmptyWithoutCargo = (
  cargoPlacement: CargoPlacement
) =>
  cargoPlacementIsEmpty(cargoPlacement) && cargoIsEmpty(cargoPlacement.cargo);

export const placementsHaveDifferentPositions = (
  a: CargoPlacement,
  b: CargoPlacement
) => !isEqual(a.LCG, b.LCG) || !isEqual(a.TCG, b.TCG);

export const placementsAreDifferent = (
  a: CargoPlacement,
  b: CargoPlacement
) => {
  return (
    !isEqual(a.LCG, b.LCG) ||
    !isEqual(a.TCG, b.TCG) ||
    a.id !== b.id ||
    a.cargo.id !== b.cargo.id ||
    a.replacing !== b.replacing ||
    a.discharged !== b.discharged
  );
};

export const isValidPlacement = (cargoPlacement: CargoPlacement) => {
  return cargoPlacement.laneId !== "";
};

export const isPlacementOutOfBounds = (
  cargoPlacement: CargoPlacement,
  lane: Lane
) => {
  let laneEndpoints = getEndpoints(lane);
  return (
    laneEndpoints.after > getAfterPosition(cargoPlacement) ||
    laneEndpoints.forward < getForwardPosition(cargoPlacement)
  );
};

export const isOverflowing = (cargo: Cargo, lane: Lane) => {
  return cargo.width > lane.width;
};

export const getForwardPosition = (cargoPlacement: CargoPlacement) => {
  if (!cargoPlacement) return Infinity;
  return cargoPlacement.LCG + cargoPlacement.cargo.length / 2;
};
export const getAfterPosition = (cargoPlacement: CargoPlacement) => {
  if (!cargoPlacement) return -Infinity;
  return cargoPlacement.LCG - cargoPlacement.cargo.length / 2;
};
export const getOverflowingSide = (
  lane: Lane,
  cargoPlacement: CargoPlacement
) => {
  if (cargoPlacement.laneId !== lane.id)
    throw new Error(
      `getOverflowingSide: Invalid lane or cargoPlacement. Lane: ${lane}; CargoPlacement: ${cargoPlacement}`
    );
  return cargoPlacement.TCG > lane.TCG ? AdjacentSide.Right : AdjacentSide.Left;
};
export const getOverflowingLaneId = (
  lane: Lane,
  cargoPlacementAsDeckMapElement: DeckMapElement,
  overflowSide: AdjacentSide
) => {
  const adjacentLanes = lane.adjacentLanes.filter(
    (al) =>
      al.adjacentSide === overflowSide &&
      isAdjacent(al, cargoPlacementAsDeckMapElement, true)
  );
  if (adjacentLanes.length !== 1) return "";

  return adjacentLanes[0].id;
};

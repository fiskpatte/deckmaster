import { arrayMax, arrayMin } from "../../functions/math";
import { DECK_MAP, AdjacentSide } from "../../constants";
import { Deck, Cargo, DeckMapElement, Lane } from "../../types/deckMap";
import { Coords, Placement } from "../../types/util";

export const getViewBoxOriginX = (currentDeck: Deck): number => {
  return (
    arrayMin(currentDeck.lanes.map((lane) => lane.LCG - lane.length / 2)) *
    DECK_MAP.X_SCALE -
    DECK_MAP.X_MARGIN
  );
};

export const getViewBoxOriginY = (currentDeck: Deck): number => {
  return (
    arrayMin(currentDeck.lanes.map((lane) => lane.TCG - lane.width / 2)) *
    DECK_MAP.Y_SCALE -
    DECK_MAP.Y_MARGIN / 2
  );
};

export const getViewBoxSizeX = (currentDeck: Deck): number => {
  let xMax = arrayMax(
    currentDeck.lanes.map((lane) => lane.LCG + lane.length / 2)
  );
  let xMin = arrayMin(
    currentDeck.lanes.map((lane) => lane.LCG - lane.length / 2)
  );
  return xMax - xMin + DECK_MAP.X_MARGIN + 2 * DECK_MAP.LANE_BUTTON_WIDTH;
};

export const getViewBoxSizeY = (currentDeck: Deck): number => {
  let yMax = arrayMax(
    currentDeck.lanes.map((lane) => lane.TCG + lane.width / 2)
  );
  let yMin = arrayMin(
    currentDeck.lanes.map((lane) => lane.TCG - lane.width / 2)
  );
  return yMax - yMin + DECK_MAP.Y_MARGIN;
};

export const getRulerOrigin = (currentDeck: Deck): number => {
  return (
    arrayMax(currentDeck.lanes.map((lane) => lane.TCG + lane.width / 2)) + 0.5
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

const getCoordinatesFromEvent = (
  event: MouseEvent | TouchEvent | PointerEvent
): Coords | undefined => {
  let x = 0;
  let y = 0;
  if (window.TouchEvent && event instanceof TouchEvent) {
    if (event.touches.length === 1) {
      let touch = event.touches[0];
      x = touch.clientX;
      y = touch.clientY;
    } else {
      return undefined;
    }
  }
  if (event instanceof MouseEvent || event instanceof PointerEvent) {
    x = event.clientX;
    y = event.clientY;
  }
  return { x, y } as Coords;
};

export const placeCargoFromEvent = (
  event: MouseEvent | TouchEvent | PointerEvent,
  svgRef: React.RefObject<SVGSVGElement>,
  lane: Lane,
  cargo: Cargo,
  placement: Placement,
  callback: (position: Placement) => void
) => {
  event.preventDefault();
  let coords = getCoordinatesFromEvent(event);
  placeCargoFromScreenCoords(coords, svgRef, lane, cargo, placement, callback);
};

export const placeCargoFromScreenCoords = (
  coords: Coords | undefined,
  svgRef: React.RefObject<SVGSVGElement>,
  lane: Lane,
  cargo: Cargo,
  placement: Placement,
  callback: (position: Placement) => void
) => {
  if (!coords) return;
  if (svgRef.current) {
    const centerPoint = svgPoint(svgRef.current, svgRef.current, coords.x, coords.y);
    const center = { x: centerPoint.x / DECK_MAP.X_SCALE, y: centerPoint.y / DECK_MAP.Y_SCALE };
    if (cargo.width > lane.width) {
      //Set a limit in the y displacement
      const max = lane.TCG + (cargo.width - lane.width) / 2;
      const min = lane.TCG - (cargo.width - lane.width) / 2;
      center.y = Math.min(Math.max(center.y, min), max);
    } else {
      //Ignore y displacement
      center.y = placement.TCG;
    }
    if (center.x !== placement.LCG || center.y !== placement.TCG) {
      //Only do the callback if something changed
      let newPlacement = {
        ...placement,
        LCG: center.x,
        TCG: center.y,
      };
      // let corner = { x: center.x / DECK_MAP.X_SCALE - cargo.length / 2, y: center.y / DECK_MAP.Y_SCALE - cargo.width / 2 }
      callback(newPlacement);
    }
  }
};

export const placeCargoFromSVGCoords = (
  placement: Placement | null,
  callback: (placement: Placement) => void
) => {
  if (!placement) return;
  callback(placement);
};

const getEndpoints = (elem: DeckMapElement) => {
  const left = elem.TCG - elem.width / 2;
  const right = left + elem.width;
  const aft = elem.LCG - elem.length / 2;
  const fwd = aft + elem.length;

  return { left, right, aft, fwd };
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
    ? newElemEndpoints.aft >= elemEndpoints.aft &&
    newElemEndpoints.fwd <= elemEndpoints.fwd
    : newElemEndpoints.aft <= elemEndpoints.fwd &&
    newElemEndpoints.fwd >= elemEndpoints.aft;

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

export const getLanePlacement = (
  lane: Lane,
  currentCargo: Cargo,
  lanePlacement: Placement
) => {
  let resultPlacement = { ...lanePlacement } as Placement;
  const someOverflowingCargo = lane.adjacentLanes.some((al) =>
    al.cargo.some((c) => c.overflowingLaneId === lane.id)
  );
  if (
    lane.cargo.length === 0 &&
    currentCargo.width <= lane.width &&
    !someOverflowingCargo
  )
    return resultPlacement;
  const originX = lane.LCG - lane.length / 2;
  let minLCG = arrayMin(
    lane.cargo.map((c) => c.LCG - c.cargo.length / 2),
    resultPlacement.LCG
  );
  if (someOverflowingCargo) {
    const overflowMinLCG = arrayMin(
      lane.adjacentLanes
        .map((al) =>
          al.cargo
            .filter((c) => c.overflowingLaneId === lane.id)
            .map((c) => c.LCG - c.cargo.length / 2)
        )
        .flat()
    );
    minLCG = Math.min(minLCG, overflowMinLCG);
  }

  if (minLCG < originX + currentCargo.length) {
    return undefined;
  }
  //TODO: B2B distance from settings
  resultPlacement.LCG = minLCG - 0.2;

  if (currentCargo.width > lane.width) {
    return getOverflowingPlacement(lane, currentCargo, resultPlacement);
  }
  return resultPlacement;
};

export const getOverflowingPlacement = (
  placingLane: Lane,
  currentCargo: Cargo,
  placement: Placement,
  recursive = true
): Placement | undefined => {
  let resultPlacement = getOverflowingPlacementForSide(
    placingLane,
    currentCargo,
    placement,
    AdjacentSide.Right
  );
  if (resultPlacement) return resultPlacement;
  resultPlacement = getOverflowingPlacementForSide(
    placingLane,
    currentCargo,
    placement,
    AdjacentSide.Left
  );
  if (resultPlacement) return resultPlacement;
  if (recursive) {
    return handleOverflowRecursive(placingLane, currentCargo, placement);
  }
  return resultPlacement;
};

const handleOverflowRecursive = (
  placingLane: Lane,
  currentCargo: Cargo,
  placement: Placement
) => {
  const backstep = 0.5;
  const laneAft = placingLane.LCG - placingLane.length / 2;
  let tempPlacement = { ...placement };
  if (tempPlacement.LCG - backstep >= laneAft + currentCargo.length / 2) {
    tempPlacement.LCG -= backstep;
    return getOverflowingPlacement(placingLane, currentCargo, tempPlacement);
  } else {
    return undefined;
  }
};

const getOverflowingPlacementForSide = (
  placingLane: Lane,
  currentCargo: Cargo,
  placement: Placement,
  overflowSide: AdjacentSide,
  frontPlacement = true
) => {
  if (overflowSide === AdjacentSide.Undefined) return undefined;
  let resultPlacement = { ...placement };
  let cargo = { ...currentCargo, ...placement };
  if (frontPlacement) {
    cargo.LCG -= currentCargo.length / 2;
  }
  let adjacentLane = placingLane.adjacentLanes.filter(
    (al) => al.adjacentSide === overflowSide && isAdjacent(al, cargo, true)
  );
  if (
    adjacentLane.length === 1 &&
    !adjacentLane[0].cargo.some((c) => isAdjacent(c.cargo, cargo))
  ) {
    resultPlacement.TCG =
      placingLane.TCG +
      (overflowSide * (currentCargo.width - placingLane.width)) / 2;
    resultPlacement.overflowingLaneId = adjacentLane[0].id;
    return resultPlacement;
  }
  return undefined;
};

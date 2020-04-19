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

// export const placeCargoFromEvent = (
//   event: React.MouseEvent | React.TouchEvent,
//   svgRef: React.RefObject<SVGSVGElement>,
//   cargo: Cargo,
//   callback: (position: Placement) => void
// ) => {
//   //THIS FUNCTION HAS TO BE REVIEWED!!
//   event.preventDefault();
//   let coords = getCoordinates(event);
//   placeCargo(coords, svgRef, cargo, callback);
// };

export const placeCargo = (
  coords: Coords | null,
  svgRef: React.RefObject<SVGSVGElement>,
  cargo: Cargo,
  callback: (position: Placement) => void
) => {
  //THIS FUNCTION HAS TO BE REVIEWED!!
  console.log(cargo);
  if (!coords) return;
  if (svgRef.current) {
    let center = svgPoint(svgRef.current, svgRef.current, coords.x, coords.y);
    // let corner = { x: center.x / DECK_MAP.X_SCALE - cargo.length / 2, y: center.y / DECK_MAP.Y_SCALE - cargo.width / 2 }
    callback({ LCG: center.x, TCG: center.y, laneID: 0 });
  }
};

export const placeCargoFromSVGCoords = (
  placement: Placement | null,
  callback: (placement: Placement) => void
) => {
  if (!placement) return;
  callback(placement);
};

//Return if newElem is right or left of elem. if contained is true, the newElem has to be completely adjacent
export const getAdjacentSide = (elem: DeckMapElement, newElem: DeckMapElement, contained = false) => {
  let getEndpoints = (elem: DeckMapElement) => {
    let left = elem.TCG - elem.width / 2;
    let right = left + elem.width;
    let aft = elem.LCG - elem.length / 2;
    let fwd = aft + elem.length;

    return { left, right, aft, fwd };
  }
  let elemEndpoints = getEndpoints(elem);
  let newElemEndpoints = getEndpoints(newElem);

  //Two elements are considered adjacent if there is no space for an additional element in between them and if they have matching sides
  let isAdjacent = contained ?
    newElemEndpoints.aft >= elemEndpoints.aft && newElemEndpoints.fwd <= elemEndpoints.fwd :
    newElemEndpoints.aft <= elemEndpoints.fwd && newElemEndpoints.fwd >= elemEndpoints.aft;
  if (isAdjacent) {
    if (Math.abs(elemEndpoints.right - newElemEndpoints.left) <= newElem.width) return AdjacentSide.Right;
    if (Math.abs(elemEndpoints.left - newElemEndpoints.right) <= newElem.width) return AdjacentSide.Left;
  }
  return AdjacentSide.Undefined;
}

export const getNextPlacement = (lane: Lane, currentCargo: Cargo, nextPlacement: Placement) => {
  let someOverflowingCargo = lane.adjacentLanes.some(al => al.cargo.some(c => c.overflowLaneID === lane.id));
  if (lane.cargo.length === 0 && currentCargo.width <= lane.width && !someOverflowingCargo) return true;
  let originX = lane.LCG - lane.length / 2;
  let minLCG = arrayMin(lane.cargo.map((c) => c.LCG - c.length / 2), nextPlacement.LCG);
  if (someOverflowingCargo) {
    let overflowMinLCG = arrayMin(lane.adjacentLanes.map(al => al.cargo.filter(c => c.overflowLaneID === lane.id).map(c => c.LCG - c.length / 2)).flat());
    minLCG = Math.min(minLCG, overflowMinLCG);
  }

  //TODO: Distance to deactivate the button should be fixed differently! (setting)
  if (minLCG < originX + currentCargo.length) {
    nextPlacement.LCG = originX;
    return false;
  }
  //TODO: B2B distance from settings
  nextPlacement.LCG = minLCG - 0.2;

  if (currentCargo.width > lane.width) {
    let success = handleOverflow(currentCargo, nextPlacement, lane);
    if (!success) {
      nextPlacement.LCG = originX;
      return false;
    }
  }
  return true;
};

export const handleOverflow = (currentCargo: Cargo, nextPlacement: Placement, placingLane: Lane, recursive = true): boolean => {

  if (performOverflow(placingLane, currentCargo, nextPlacement, AdjacentSide.Right)) return true;
  else if (performOverflow(placingLane, currentCargo, nextPlacement, AdjacentSide.Left)) return true;
  else {
    let backstep = 0.5;
    if (recursive && nextPlacement.LCG - backstep >= placingLane.LCG - placingLane.length / 2) {
      nextPlacement.LCG -= backstep;
      return handleOverflow(currentCargo, nextPlacement, placingLane);
    } else {
      return false;
    }
  }
}
//Performs overflow in specified direction if possible. Returns true upon success.
export const performOverflow = (placingLane: Lane, currentCargo: Cargo, nextPlacement: Placement, overflowSide: AdjacentSide, frontPlacement = true) => {
  if (overflowSide === AdjacentSide.Undefined) return false;
  let cargo = { ...currentCargo, ...nextPlacement };
  if (frontPlacement) {
    cargo.LCG -= currentCargo.length / 2;
  }
  let adjacentLane = placingLane.adjacentLanes.filter(al => al.adjacentSide === overflowSide && getAdjacentSide(al, cargo, true));
  if (adjacentLane.length === 1 && !adjacentLane[0].cargo.some(c => getAdjacentSide(c, cargo))) {
    nextPlacement.TCG = placingLane.TCG + overflowSide * (currentCargo.width - placingLane.width) / 2;
    nextPlacement.overflowLaneID = adjacentLane[0].id;
    return true;
  }
  return false;
}

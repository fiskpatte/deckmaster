import { arrayMax, arrayMin } from "../../shared/functions/math";
import { DECK_MAP } from "../../shared/constants";
import { Deck, Cargo } from "../../shared/types/deckMap";
import { Coords, Placement } from '../../shared/types/util';

export const getViewBoxOriginX = (currentDeck: Deck): number => {
    return arrayMin(currentDeck.lanes.map(lane => lane.LCG - lane.length / 2)) * DECK_MAP.X_SCALE - DECK_MAP.X_MARGIN;
}

export const getViewBoxOriginY = (currentDeck: Deck): number => {
    return arrayMin(currentDeck.lanes.map(lane => lane.TCG - lane.width / 2)) * DECK_MAP.Y_SCALE - DECK_MAP.Y_MARGIN / 2;
}

export const getViewBoxSizeX = (currentDeck: Deck): number => {
    let xMax = arrayMax(currentDeck.lanes.map(lane => lane.LCG + lane.length / 2));
    let xMin = arrayMin(currentDeck.lanes.map(lane => lane.LCG - lane.length / 2));
    return xMax - xMin + DECK_MAP.X_MARGIN + 2 * DECK_MAP.LANE_BUTTON_WIDTH;
}

export const getViewBoxSizeY = (currentDeck: Deck): number => {
    let yMax = arrayMax(currentDeck.lanes.map(lane => lane.TCG + lane.width / 2));
    let yMin = arrayMin(currentDeck.lanes.map(lane => lane.TCG - lane.width / 2));
    return yMax - yMin + DECK_MAP.Y_MARGIN;
}

export const getRulerOrigin = (currentDeck: Deck): number => {
    return arrayMax(currentDeck.lanes.map(lane => lane.TCG + lane.width / 2)) + 0.5;
}

// translate page coordinate to SVG coordinate
export const svgPoint = (svgElement: SVGSVGElement, fromElement: SVGGraphicsElement, x: number, y: number) => {
    const pt = svgElement.createSVGPoint();
    pt.x = x;
    pt.y = y;
    return pt.matrixTransform(fromElement.getScreenCTM()?.inverse());
}

export const placeCargoFromEvent = (event: React.MouseEvent | React.TouchEvent, svgRef: React.RefObject<SVGSVGElement>, cargo: Cargo, callback: (position: Placement) => void) => {
    //THIS FUNCTION HAS TO BE REVIEWED!!
    event.preventDefault();
    let coords = getCoordinates(event);
    placeCargo(coords, svgRef, cargo, callback);
}

export const placeCargo = (coords: Coords | null, svgRef: React.RefObject<SVGSVGElement>, cargo: Cargo, callback: (position: Placement) => void) => {
    //THIS FUNCTION HAS TO BE REVIEWED!!
    console.log(cargo);
    if (!coords) return;
    if (svgRef.current) {
        let center = svgPoint(svgRef.current, svgRef.current, coords.x, coords.y)
        // let corner = { x: center.x / DECK_MAP.X_SCALE - cargo.length / 2, y: center.y / DECK_MAP.Y_SCALE - cargo.width / 2 }
        callback({ LCG: center.x, TCG: center.y, laneID: 0 });
    }
}

export const placeCargoFromSVGCoords = (placement: Placement | null, callback: (placement: Placement) => void) => {
    if (!placement) return;
    callback(placement)
}

export const getCoordinates = (event: React.MouseEvent | React.TouchEvent) => {
    let x = 0;
    let y = 0;
    let nEvent = event.nativeEvent;
    console.log(nEvent);
    if (window.TouchEvent && nEvent instanceof TouchEvent) {
        if (nEvent.touches.length === 1) {
            let touch = nEvent.touches[0];
            x = touch.clientX;
            y = touch.clientY
        } else {
            return null;
        }
    }
    if (nEvent instanceof MouseEvent) {
        x = nEvent.clientX;
        y = nEvent.clientY;
    }
    return { x, y };
}
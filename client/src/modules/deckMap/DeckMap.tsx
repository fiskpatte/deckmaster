import React, { useEffect, useRef, useState } from 'react';
import { DECK_MAP } from '../../shared/constants';
import Lanes from './Lanes/Lanes';
import Grids from './Grids/Grids';
import { DeckMapProps } from './DeckMap.types';
import { getViewBoxOriginX, getViewBoxOriginY, getViewBoxSizeX, getViewBoxSizeY, placeCargoFromEvent, placeCargoFromSVGCoords } from './DeckMap.functions';
import CargoIcon from './CargoIcon';
import { Coords } from './../../types';
import { useDispatch } from 'react-redux';
import { setCurrentPosition } from '../../store/actions/appActions';

const DeckMap: React.FC<DeckMapProps> = ({ currentDeck, currentCargo, currentPosition }) => {
    const dispatch = useDispatch();
    const setPosition = (position: Coords) => dispatch(setCurrentPosition(position))
    const [initialCoords, { }] = useState(null);
    const [dragging, { }] = useState(false);
    const groupRef = useRef(null);
    const svgRef = useRef<SVGSVGElement>(null);

    useEffect(() => {
        // let options = { "passive": false };
        let ref = groupRef.current;
        if (ref) {
            // ref.addEventListener('touchstart', startDrag, options);
            // ref.addEventListener('touchmove', drag, options);
            // ref.addEventListener('touchend', stopDrag, options);
            // ref.addEventListener('touchcancel', cancelDrag, options);
            // return () => {
            //     ref.removeEventListener('touchstart', startDrag, options)
            //     ref.removeEventListener('touchmove', drag, options);
            //     ref.removeEventListener('touchend', stopDrag, options);
            //     ref.removeEventListener('touchcancel', cancelDrag, options);
            // }
        }
    }, [dragging, initialCoords, currentPosition])
    console.log(currentPosition)
    // const startDrag = (event) => {
    //     event.preventDefault();
    //     if (event.nativeEvent || (event.touches && event.touches.length === 1)) {
    //         let coords = getCoordinates(event);
    //         console.log(coords)
    //         setDragging(true);
    //         setInitialCoords(coords);
    //         placeCurrentVehicle(coords);
    //     }
    //     return;
    // }
    // const drag = (event) => {
    //     event.preventDefault();
    //     if (dragging) {
    //         let coords = getCoordinates(event);
    //         if (coords) {
    //             if (isInsideGroup(coords)) {
    //                 placeCurrentVehicle(coords);
    //             } else {
    //                 cancelDrag(event);
    //             }
    //         } else {
    //             stopDrag(event);
    //         }
    //     }
    //     return;
    // }
    // const stopDrag = (event) => {
    //     event.preventDefault();
    //     console.log("stop")
    //     if (dragging) {
    //         setDragging(false);
    //     }
    //     return;
    // }

    // const cancelDrag = (event) => {
    //     event.preventDefault();
    //     console.log("cancel", initialCoords)
    //     let coords = getCoordinates(event);
    //     if (dragging && !isInsideGroup(coords)) {
    //         // placeCurrentVehicle(initialCoords)
    //         setDragging(false);
    //     }
    //     return;
    // }
    // const isInsideGroup = (coords) => {
    //     return (
    //         coords.x > groupBoundingRect.x && coords.x < groupBoundingRect.x + groupBoundingRect.width &&
    //         coords.y > groupBoundingRect.y && coords.y < groupBoundingRect.y + groupBoundingRect.height
    //     );
    // }

    const placeCargoFromClick = (event: React.MouseEvent | React.TouchEvent) => {
        placeCargoFromEvent(event, svgRef, currentCargo, setPosition);
    }
    const placeCargoFromFrontPosition = (position: Coords) => {
        position.x -= currentCargo.length;
        position.y -= currentCargo.width / 2;
        placeCargoFromSVGCoords(position, setPosition);
    }
    // let groupBoundingRect = groupRef.current && groupRef.current.getBoundingClientRect();
    let viewBoxSizeX = getViewBoxSizeX(currentDeck);
    let viewBoxSizeY = getViewBoxSizeY(currentDeck);
    let viewBoxOriginX = getViewBoxOriginX(currentDeck);
    let viewBoxOriginY = getViewBoxOriginY(currentDeck);
    return (
        <svg
            className="svgBody"
            viewBox={`${viewBoxOriginX} ${viewBoxOriginY} ${viewBoxSizeX} ${viewBoxSizeY}`}
            preserveAspectRatio="xMidYMin"
            ref={svgRef}>
            <g
                className="containerGroup"
                transform={`scale(${DECK_MAP.X_SCALE} ${DECK_MAP.Y_SCALE})`}
                onClick={ev => placeCargoFromClick(ev)}
                // onMouseDown={ev => startDrag(ev)}
                // onMouseMove={ev => drag(ev)}
                // onMouseOut={ev => cancelDrag(ev)}
                // onMouseUp={ev => stopDrag(ev)}
                ref={groupRef}>
                <Lanes lanes={currentDeck.lanes} svgRef={svgRef} rightOrigin={viewBoxSizeX + viewBoxOriginX} onClick={(ev) => placeCargoFromClick(ev)} onButtonClick={(position) => placeCargoFromFrontPosition(position)} />
                <Grids grids={currentDeck.grids} onClick={(position) => placeCargoFromFrontPosition(position)} />
                {currentPosition ?
                    <CargoIcon x={currentPosition.x}
                        y={currentPosition.y}
                        width={currentCargo.length}
                        height={currentCargo.width} />
                    : null}
                {/* {currentPosition ?
                    <rect
                        // x={currentPosition.x / DECK_MAP.X_SCALE}
                        // y={currentPosition.y / DECK_MAP.Y_SCALE}
                        width={currentCargo.length}
                        height={currentCargo.width}
                        fill="green"
                        style={{ pointerEvents: "none" }} /> :
                    null
                } */}
            </g>
        </svg>
    );
}

export default DeckMap;
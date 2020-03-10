import React, { useState, useEffect, useRef } from 'react';
import { arrayMin, arrayMax } from '../../shared/functions/math';
import { DECK_MAP } from '../../shared/constants';
import Lanes from './Lanes/Lanes';
import Grids from './Grids/Grids';
import { svgPoint } from '../../shared/functions/layout';
import './DeckMap.scss'
import CargoDetails from './CargoDetails';
import DeckSelectorButtons from './DeckSelectorButtons';
import LoginScreen from '../loginScreen/LoginScreen'

const groupStyle = { "fill": "white", "stroke": "black", "strokeWidth": "0.1", "pointerEvents": "visible" };//bounding-box

const DeckMap = (props) => {
    const [currentPosition, setCurrentPosition] = useState(null);
    const [initialCoords, setInitialCoords] = useState(null);
    const [dragging, setDragging] = useState(false);
    const groupRef = useRef();
    const svgRef = useRef();

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

    const { currentDeck, currentCargo } = props;

    if (!currentDeck) return null;

    const getViewBoxOriginX = () => {
        return arrayMin(currentDeck.lanes.map(lane => lane.LCG - lane.length / 2)) * DECK_MAP.X_SCALE - DECK_MAP.X_MARGIN;
    }

    const getViewBoxOriginY = () => {
        return arrayMin(currentDeck.lanes.map(lane => lane.TCG - lane.width / 2)) * DECK_MAP.Y_SCALE - DECK_MAP.Y_MARGIN / 2;
    }

    const getViewBoxSizeX = () => {
        let xMax = arrayMax(currentDeck.lanes.map(lane => lane.LCG + lane.length / 2));
        let xMin = arrayMin(currentDeck.lanes.map(lane => lane.LCG - lane.length / 2));
        return xMax - xMin + DECK_MAP.X_MARGIN + 2 * DECK_MAP.LANE_BUTTON_WIDTH;
    }

    const getViewBoxSizeY = () => {
        let yMax = arrayMax(currentDeck.lanes.map(lane => lane.TCG + lane.width / 2));
        let yMin = arrayMin(currentDeck.lanes.map(lane => lane.TCG - lane.width / 2));
        return yMax - yMin + DECK_MAP.Y_MARGIN;
    }

    const startDrag = (event) => {
        event.preventDefault();
        if (event.nativeEvent || (event.touches && event.touches.length === 1)) {
            let coords = getCoordinates(event);
            console.log(coords)
            setDragging(true);
            setInitialCoords(coords);
            placeCurrentVehicle(coords);
        }
        return;
    }
    const drag = (event) => {
        event.preventDefault();
        if (dragging) {
            let coords = getCoordinates(event);
            if (coords) {
                if (isInsideGroup(coords)) {
                    placeCurrentVehicle(coords);
                } else {
                    cancelDrag(event);
                }
            } else {
                stopDrag(event);
            }
        }
        return;
    }
    const stopDrag = (event) => {
        event.preventDefault();
        console.log("stop")
        if (dragging) {
            setDragging(false);
        }
        return;
    }

    const cancelDrag = (event) => {
        event.preventDefault();
        console.log("cancel", initialCoords)
        let coords = getCoordinates(event);
        if (dragging && !isInsideGroup(coords)) {
            // placeCurrentVehicle(initialCoords)
            setDragging(false);
        }
        return;
    }
    const isInsideGroup = (coords) => {
        return (
            coords.x > groupBoundingRect.x && coords.x < groupBoundingRect.x + groupBoundingRect.width &&
            coords.y > groupBoundingRect.y && coords.y < groupBoundingRect.y + groupBoundingRect.height
        );
    }
    const placeCurrentVehicle = (coords) => {
        let center = svgPoint(svgRef.current, svgRef.current, coords.x, coords.y)
        let corner = { x: center.x - currentCargo.length / 2, y: center.y - currentCargo.width / 2 }
        setCurrentPosition(corner)
    }

    const getCoordinates = (event) => {
        let x = 0;
        let y = 0;
        if (event.touches && event.touches.length === 1) {
            let touch = event.touches[0];
            x = touch.clientX;
            y = touch.clientY
        } else if (event.nativeEvent) {
            x = event.nativeEvent.clientX;
            y = event.nativeEvent.clientY;
        } else {
            return null;
        }
        return { x, y };
    }

    let groupBoundingRect = groupRef.current && groupRef.current.getBoundingClientRect();
    let viewBoxSizeX = getViewBoxSizeX();
    let viewBoxSizeY = getViewBoxSizeY();
    let viewBoxOriginX = getViewBoxOriginX();
    let viewBoxOriginY = getViewBoxOriginY();
    // console.log(groupBoundingRect)

    return <LoginScreen />

    return (
        <div className="DeckMap">
            <div className="Header">
                <CargoDetails />
                <DeckSelectorButtons />
            </div>
            <svg
                className="svgBody"
                viewBox={`${viewBoxOriginX} ${viewBoxOriginY} ${viewBoxSizeX} ${viewBoxSizeY}`}
                preserveAspectRatio="xMidYMin"
                ref={svgRef}>
                <g
                    style={groupStyle}
                    transform={`scale(${DECK_MAP.X_SCALE} ${DECK_MAP.Y_SCALE})`}
                    // onClick={ev => placeCurrentVehicle(ev)}
                    // onMouseDown={ev => startDrag(ev)}
                    // onMouseMove={ev => drag(ev)}
                    // onMouseOut={ev => cancelDrag(ev)}
                    // onMouseUp={ev => stopDrag(ev)}
                    ref={groupRef}>
                    {/* <rect
                        className="BoundingBox"
                        x={viewBoxOriginX / DECK_MAP.X_SCALE + DECK_MAP.X_MARGIN / 2}
                        y={viewBoxOriginY / DECK_MAP.Y_SCALE}
                        width={viewBoxSizeX - DECK_MAP.X_MARGIN}
                        height={viewBoxSizeY} /> */}
                    <Lanes lanes={currentDeck.lanes} />
                    <Grids grids={currentDeck.grids} />
                    {currentPosition ?
                        <rect
                            x={currentPosition.x / DECK_MAP.X_SCALE}
                            y={currentPosition.y / DECK_MAP.Y_SCALE}
                            width={currentCargo.length}
                            height={currentCargo.width}
                            fill="green"
                            style={{ pointerEvents: "none" }} /> :
                        null
                    }
                </g>
            </svg>
        </div>
    )
}

export default DeckMap;
import React, { useRef } from 'react';
import { DECK_MAP } from '../../shared/constants';
import { Lanes } from './Lanes';
// import Grids from './Grids/Grids';
import { DeckMapProps } from './DeckMap.types';
import { getViewBoxOriginX, getViewBoxOriginY, getViewBoxSizeX, getViewBoxSizeY, placeCargoFromSVGCoords } from './DeckMap.functions';
import CargoIcon from './CargoIcon';
import { Coords, Placement } from '../../shared/types/util';
import { useDispatch } from 'react-redux';
import { setCurrentPlacement } from '../../store/actions/cargoActions';

const DeckMap: React.FC<DeckMapProps> = ({ currentDeck, currentCargo, currentPlacement }) => {
    const dispatch = useDispatch();
    const setPlacement = (placement: Placement) => dispatch(setCurrentPlacement(placement))
    const svgRef = useRef<SVGSVGElement>(null);

    const placeCargoFromClick = (event: React.MouseEvent | React.TouchEvent) => {
        console.log("lane clicked",event);
        return;
        // placeCargoFromEvent(event, svgRef, currentCargo, setPlacement);
    }
    const placeCargoFromFrontPosition = (position: Coords, laneID: number) => {
        position.x -= currentCargo.length/2;
        let newPlacement = {LCG:position.x,TCG:position.y,laneID:laneID} as Placement
        placeCargoFromSVGCoords(newPlacement, setPlacement);
    }
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
                // onClick={ev => placeCargoFromClick(ev)} 
                transform={`scale(${DECK_MAP.X_SCALE} ${DECK_MAP.Y_SCALE})`} >
                <Lanes lanes={currentDeck.lanes} svgRef={svgRef} rightOrigin={viewBoxSizeX + viewBoxOriginX} onClick={(ev) => placeCargoFromClick(ev)} onButtonClick={(position, id) => placeCargoFromFrontPosition(position, id)} />
                {/* <Grids grids={currentDeck.grids} onClick={(position) => placeCargoFromFrontPosition(position)} /> */}
                {currentPlacement ?
                    <CargoIcon x={currentPlacement.LCG}
                        y={currentPlacement.TCG}
                        width={currentCargo.length}
                        height={currentCargo.width} />
                    : null}
            </g>
        </svg>
    );
}

export default DeckMap;
import React, { useRef } from 'react';
import { DECK_MAP } from '../../shared/constants';
import Lanes from './Lanes/Lanes';
import Grids from './Grids/Grids';
import { DeckMapProps } from './DeckMap.types';
import { getViewBoxOriginX, getViewBoxOriginY, getViewBoxSizeX, getViewBoxSizeY, placeCargoFromEvent, placeCargoFromSVGCoords } from './DeckMap.functions';
import CargoIcon from './CargoIcon';
import { Coords } from '../../shared/types/util';
import { useDispatch } from 'react-redux';
import { setCurrentPosition } from '../../store/actions/appActions';

const DeckMap: React.FC<DeckMapProps> = ({ currentDeck, currentCargo, currentPosition }) => {
    const dispatch = useDispatch();
    const setPosition = (position: Coords) => dispatch(setCurrentPosition(position))
    const svgRef = useRef<SVGSVGElement>(null); 

    const placeCargoFromClick = (event: React.MouseEvent | React.TouchEvent) => {
        placeCargoFromEvent(event, svgRef, currentCargo, setPosition);
    }
    const placeCargoFromFrontPosition = (position: Coords) => {
        position.x -= currentCargo.length;
        position.y -= currentCargo.width / 2;
        placeCargoFromSVGCoords(position, setPosition);
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
                transform={`scale(${DECK_MAP.X_SCALE} ${DECK_MAP.Y_SCALE})`}
                onClick={ev => placeCargoFromClick(ev)} >
                <Lanes lanes={currentDeck.lanes} svgRef={svgRef} rightOrigin={viewBoxSizeX + viewBoxOriginX} onClick={(ev) => placeCargoFromClick(ev)} onButtonClick={(position) => placeCargoFromFrontPosition(position)} />
                <Grids grids={currentDeck.grids} onClick={(position) => placeCargoFromFrontPosition(position)} />
                {currentPosition ?
                    <CargoIcon x={currentPosition.x}
                        y={currentPosition.y}
                        width={currentCargo.length}
                        height={currentCargo.width} />
                    : null}
            </g>
        </svg>
    );
}

export default DeckMap;
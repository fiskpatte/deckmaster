import * as React from 'react';
import { DECK_MAP } from '../../../constants';
import { ArrowButton } from '../arrowButton';
import { CargoIcon } from '../cargoIcon';
import { cargoPlacementIsEmpty } from '../DeckMap.functions';
import { CargoPlacement } from './../../../types/deckMap';
import './ReplacementBox.scss';

interface Props {
  cargoPlacements: CargoPlacement[];
  currentCargoPlacement: CargoPlacement;
  originY: number;
  originX: number;
  sizeX: number;
  onCargoPlacementClick: (cp: CargoPlacement) => void;
  replaceButtonClick: () => Promise<void>;
}

export const ReplacementBox: React.FC<Props> = ({
  originX,
  sizeX,
  originY,
  cargoPlacements,
  currentCargoPlacement,
  onCargoPlacementClick,
  replaceButtonClick
}) => {
  const originXWithMargin = originX + 2 * DECK_MAP.X_MARGIN;
  const renderCargoPlacements = () => {
    let result = [];
    // const originYWithMargin = originY + DECK_MAP.BASE_MARGIN;
    const spaceBetweenCargo = 3 * DECK_MAP.BASE_MARGIN;
    let nextPosition = spaceBetweenCargo;
    for (let cargoPlacement of cargoPlacements.filter(cp => cp.cargo.id !== currentCargoPlacement.cargo.id || currentCargoPlacement.replacing)) {
      result.push(
        <g
          key={cargoPlacement.id}
          onClick={() => onCargoPlacementClick(cargoPlacement)}
        >
          <CargoIcon
            x={originXWithMargin + nextPosition + cargoPlacement.cargo.length / 2 + DECK_MAP.REPLACEMENT_BOX_BUTTON_WIDTH / 2}
            y={originY + DECK_MAP.REPLACEMENT_BOX_HEIGHT / 2}
            width={cargoPlacement.cargo.length}
            height={cargoPlacement.cargo.width}
            cargoId={cargoPlacement.cargo.id}
            placing={currentCargoPlacement.cargo.id === cargoPlacement.cargo.id}
            registrationNumber={cargoPlacement.cargo.registrationNumber}
          />
        </g>
      )
      nextPosition += cargoPlacement.cargo.length + spaceBetweenCargo;
    }
    return result;
  }

  const showReplaceButton = () => {
    if (
      cargoPlacementIsEmpty(currentCargoPlacement) ||
      currentCargoPlacement.replacing
    )
      return false;

    return true;
  };
  const areaWidth = sizeX - 4 * DECK_MAP.X_MARGIN;

  if (!isFinite(originY)) return null;

  return (
    <g>
      <rect
        className="ReplacementBox"
        x={originXWithMargin}
        y={originY}
        width={areaWidth}
        height={DECK_MAP.REPLACEMENT_BOX_HEIGHT}
        rx={DECK_MAP.LANE_BORDER_RADIUS}
        ry={DECK_MAP.LANE_BORDER_RADIUS}
      />
      <text
        className="ReplacementBoxName"
        transform={`scale(${1 / DECK_MAP.X_SCALE} ${1 / DECK_MAP.Y_SCALE})`}
        fontSize={`${DECK_MAP.REPLACEMENT_BOX_NAME_FONT_SIZE}em`}
        x={(originXWithMargin + areaWidth / 2) * DECK_MAP.X_SCALE}
        y={(originY + DECK_MAP.REPLACEMENT_BOX_HEIGHT / 2) * DECK_MAP.Y_SCALE}
      >
        {"CARGO SHIFTING AREA"}
      </text>
      <ArrowButton
        x={originXWithMargin - DECK_MAP.BASE_MARGIN}//- DECK_MAP.REPLACEMENT_BOX_BUTTON_WIDTH / 2 
        y={originY + DECK_MAP.REPLACEMENT_BOX_HEIGHT / 2}
        width={DECK_MAP.REPLACEMENT_BOX_BUTTON_WIDTH}
        height={DECK_MAP.REPLACEMENT_BOX_BUTTON_HEIGHT}
        visible={showReplaceButton()}
        onClick={replaceButtonClick}
        color="violet"
      />
      {renderCargoPlacements()}
    </g>
  )
}

export default ReplacementBox;
import * as React from 'react';
import { DECK_MAP } from '../../../constants';
import { CargoIcon } from '../cargoIcon';
import { CargoPlacement } from './../../../types/deckMap';

interface Props {
  cargoPlacements: CargoPlacement[];
  currentCargoPlacement: CargoPlacement;
  originY: number;
  originX: number;
  sizeX: number;
  onCargoPlacementClick: (cp: CargoPlacement) => void;
}

export const ReplacementBox: React.FC<Props> = ({
  originX,
  sizeX,
  originY,
  cargoPlacements,
  currentCargoPlacement,
  onCargoPlacementClick
}) => {
  const originXWithMargin = originX + DECK_MAP.X_MARGIN;
  const renderCargoPlacements = () => {
    let result = [];
    const originYWithMargin = originY + DECK_MAP.BASE_MARGIN;
    const spaceBetweenCargo = 3 * DECK_MAP.BASE_MARGIN;
    let nextPosition = spaceBetweenCargo;
    for (let cargoPlacement of cargoPlacements.filter(cp => cp.cargo.id !== currentCargoPlacement.cargo.id || currentCargoPlacement.replacing)) {
      result.push(
        <g
          key={cargoPlacement.id}
          onClick={() => onCargoPlacementClick(cargoPlacement)}
        >
          <CargoIcon
            x={originXWithMargin + nextPosition + cargoPlacement.cargo.length / 2}
            y={originYWithMargin + cargoPlacement.cargo.width / 2}
            width={cargoPlacement.cargo.length}
            height={cargoPlacement.cargo.width}
            cargoId={cargoPlacement.cargo.id}
            placing={currentCargoPlacement.cargo.id === cargoPlacement.cargo.id}
          />
        </g>
      )
      nextPosition += cargoPlacement.cargo.length + spaceBetweenCargo;
    }
    return result;
  }
  return (
    <g>
      <rect
        className="ReplacementBox"
        x={originXWithMargin}
        y={originY}
        width={sizeX - 2 * DECK_MAP.X_MARGIN}
        height={DECK_MAP.REPLACEMENT_BOX_HEIGHT}
        rx={DECK_MAP.LANE_BORDER_RADIUS}
        ry={DECK_MAP.LANE_BORDER_RADIUS}
      />
      {renderCargoPlacements()}
    </g>
  )
}

export default ReplacementBox;
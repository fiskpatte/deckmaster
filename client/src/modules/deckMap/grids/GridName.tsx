import React, { useRef } from 'react';
import useReferenceScale from './../../../shared/hooks/useReferenceScale';
import { Grid } from './../../../shared/types/deckMap';
import { DECK_MAP } from './../../../shared/constants';

interface Props {
  grid: Grid,
}

export const GridName: React.FC<Props> = ({ grid }) => {
  // const originX = rightOrigin - 3 * DECK_MAP.X_MARGIN / 2;
  const textRef = useRef<SVGTextElement>(null);
  const scale = useReferenceScale(textRef, { width: grid.length, height: grid.width });
  let fontSize = Math.min(scale.width, scale.height);
  if (scale.height !== 1 && scale.width !== 1) {
    //Avoid changing the font size before the initial render so that the scale applies correctly
    fontSize *= DECK_MAP.GRID_NAME_FONT_SIZE;
  }
  return (
    <text className='GridName'
      transform={`scale(${1 / DECK_MAP.X_SCALE} ${1 / DECK_MAP.Y_SCALE})`}
      fontSize={`${fontSize}em`}
      x={grid.LCG * DECK_MAP.X_SCALE}
      y={grid.TCG * DECK_MAP.Y_SCALE}
      ref={textRef}>
      {grid.name.substr(-2)}
    </text>
  );
}

export default GridName;
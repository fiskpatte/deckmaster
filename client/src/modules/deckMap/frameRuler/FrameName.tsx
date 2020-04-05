import * as React from 'react';
import { Frame } from './../../../shared/types/deckMap';
import { DECK_MAP } from '../../../shared/constants';
import useReferenceScale from '../../../shared/hooks/useReferenceScale';

interface Props {
  frame: Frame,
  originY: number
}
export const FrameName: React.FC<Props> = ({ frame, originY }) => {
  const textRef = React.useRef<SVGTextElement>(null);
  const scale = useReferenceScale(textRef, { width: 8, height: 2 });
  let fontSize = Math.min(scale.width, scale.height);
  if (scale.height !== 1 && scale.width !== 1) {
    //Avoid changing the font size before the initial render so that the scale applies correctly
    fontSize *= DECK_MAP.FRAME_NAME_FONT_SIZE;
  }
  return (
    <text className='FrameName'
      transform={`scale(${1 / DECK_MAP.X_SCALE} ${1 / DECK_MAP.Y_SCALE})`}
      fontSize={`${fontSize}em`}
      x={frame.distance * DECK_MAP.X_SCALE}
      y={(originY + 2) * DECK_MAP.Y_SCALE}
      ref={textRef}>
      {frame.id}
    </text>
  )
}

export default FrameName;
import * as React from 'react';
import { DECK_MAP } from '../../../constants';

interface Props {
  x: number;
  y: number;
  isBig: boolean;
  isMedium: boolean;
}

export const FrameTick: React.FC<Props> = ({ x, y, isBig, isMedium }) => {
  const tickSize = isBig ? 0.75 : isMedium ? 0.5 : 0.2;
  return (
    <path d={`M${x} ${y}V${y + DECK_MAP.FRAME_HEIGHT * tickSize}`} />

  )
}

export default FrameTick
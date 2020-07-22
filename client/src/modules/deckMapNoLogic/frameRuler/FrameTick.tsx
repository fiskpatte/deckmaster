import * as React from 'react';

interface Props {
  x: number;
  y: number;
  isBig: boolean;
  isMedium: boolean;
}

export const FrameTick: React.FC<Props> = ({ x, y, isBig, isMedium }) => {
  const tickSize = isBig ? 0.75 : isMedium ? 0.5 : 0.2;
  return (
    <path d={`M${x} ${y}V${y + tickSize}`} />

  )
}

export default FrameTick
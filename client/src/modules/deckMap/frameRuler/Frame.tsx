import * as React from 'react';
import { Frame } from '../../../shared/types/deckMap';
import './Frame.scss';
import FrameTick from './FrameTick';
import FrameName from './FrameName';

interface Props {
  frame: Frame,
  originY: number
}
//TODO: Put this in settings
const bigFrameFrequency = 20;
const mediumFrameFrequency = 10;
export const FrameComponent: React.FC<Props> = ({ frame, originY }) => {

  let isBig = frame.id % bigFrameFrequency === 0;
  let isMedium = frame.id % mediumFrameFrequency === 0;

  return (
    <g>
      <FrameTick x={frame.distance} y={originY} isBig={isBig} isMedium={isMedium} />
      {isBig ?
        <FrameName frame={frame} originY={originY} />
        : null
      }
    </g>
  );
}

export default FrameComponent;
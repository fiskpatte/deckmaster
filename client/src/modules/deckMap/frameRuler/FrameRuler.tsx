import * as React from 'react';
import { Frame } from '../../../shared/types/deckMap';
import { arrayMin, arrayMax } from '../../../shared/functions/math';
import FrameComponent from './Frame';
import './Frame.scss';

interface Props {
  frames: Array<Frame>
  originY: number
}

export const FrameRuler: React.FC<Props> = ({ frames, originY }) => {
  const frameDistances = frames.map(f => f.distance)
  const minDist = arrayMin(frameDistances);
  const maxDist = arrayMax(frameDistances);
  return (
    <g>
      <rect className="FrameRuler" x={minDist} y={originY} width={maxDist - minDist} height={1} />
      {frames.map((f, ix) => <FrameComponent key={ix} frame={f} originY={originY} />)}
    </g>
  )
};

export default FrameRuler;
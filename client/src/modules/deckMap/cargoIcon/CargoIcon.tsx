import React, { useRef, useEffect } from "react";
import useReferenceScale from "../../../hooks/useReferenceScale";
import useSvgSwipe from '../../../hooks/useSvgSwipe';
import { ReactComponent as Icon } from "../../../assets/icons/cargoIcon.svg";
import "./CargoIcon.scss";
import { SwipeDirection, AdjacentSide } from "../../../constants";

interface Props {
  x: number;
  y: number;
  height: number;
  width: number;
  placing?: boolean;
  swipeCallback?: (swipeSide: AdjacentSide) => void
}

//This component uses {x,y} as LCG and TCG coordinates
export const CargoIcon: React.FC<Props> = ({
  x,
  y,
  width,
  height,
  placing = false,
  swipeCallback
}) => {
  const groupRef = useRef<SVGPathElement>(null);
  const scale = useReferenceScale(groupRef, { width, height });
  let { swipeDirection, updateSwipeDirection } = useSvgSwipe(groupRef);
  useEffect(() => {
    if (placing && swipeCallback) {
      if (swipeDirection === SwipeDirection.Up) {
        swipeCallback(AdjacentSide.Left);
      } else if (swipeDirection === SwipeDirection.Down) {
        swipeCallback(AdjacentSide.Right);
      }
      updateSwipeDirection(SwipeDirection.Undefined);
    }
  }, [placing, swipeDirection, updateSwipeDirection, swipeCallback])
  const corner = { x: x - width / 2, y: y - height / 2 };
  return (
    <svg
      width={width}
      height={height}
      x={corner.x}
      y={corner.y}
      fill="none"
      preserveAspectRatio="xMidYMid meet"
    >
      <g
        ref={groupRef}
        className={`CargoIcon ${placing ? "Placing" : ""}`}
      >
        <g transform={`scale(${scale.width} ${scale.height})`} style={{ pointerEvents: "none" }} >
          <Icon />
        </g>
        <rect
          x={0}
          y={0}
          height={height}
          width={width}
          className="BoundingBox" />
      </g>
    </svg >
  );
};

export default CargoIcon;
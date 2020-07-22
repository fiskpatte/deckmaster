import React from "react";
import LaneComponent from "./Lane";
import "./Lane.scss";
import { Lane } from "../../../types/deckMap";

interface Props {
  lanes: Array<Lane>;
  rightOrigin: number;
}

export const Lanes: React.FC<Props> = ({
  lanes,
  rightOrigin,
}) => {
  return (
    <>
      {lanes.map((lane) => {
        return (
          <LaneComponent
            key={lane.id}
            lane={lane}
            rightOrigin={rightOrigin}
          />
        );
      })}
    </>
  );
};

export default Lanes;

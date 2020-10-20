import React from "react";
import "./PlaceCargoInfo.scss";
import { BsArrowCounterclockwise } from "react-icons/bs";
import { FlexContainer } from "../../../components/flexContainer";
import Text from "../../../components/text";
interface Props {
  startOverButtonClick: () => void;
  lane: string;
  showStartOverButton: boolean;
}

export const PlaceCargoInfo: React.FC<Props> = ({
  startOverButtonClick,
  lane,
  showStartOverButton,
}) => {
  if (showStartOverButton) {
    return (
      <div className="PlaceCargoInfo">
        <FlexContainer
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Text size="standard">{"PLACING IN LANE"}</Text>
          <div style={{ width: "0.5vw" }}></div>
          <Text size="standard" weight="medium">
            {lane}
          </Text>
          {showStartOverButton && (
            <BsArrowCounterclockwise
              className="PlaceCargoInfoStartOverButton"
              onClick={startOverButtonClick}
              size="2.5vw"
            />
          )}
        </FlexContainer>
      </div>
    );
  } else {
    return (
      <div className="PlaceCargoInfo">
        <Text size="standard">PLACE THE CARGO</Text>
      </div>
    );
  }
};

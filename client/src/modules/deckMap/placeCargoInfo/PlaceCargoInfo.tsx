import React from "react";
import "./PlaceCargoInfo.scss";
import { BsArrowCounterclockwise } from "react-icons/bs";
import { FlexContainer } from "../../../components/flexContainer";
import Text from "../../../components/text";
interface Props {
  startOverButtonClick: () => void;
  lane: string;
  frameId: number | undefined;
  showStartOverButton: boolean;
}

export const PlaceCargoInfo: React.FC<Props> = ({
  startOverButtonClick,
  lane,
  frameId,
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
          <Text size="standard">LANE</Text>
          <div style={{ width: "0.25vw" }}></div>
          <Text size="standard" weight="medium">
            {lane}
          </Text>
          <div style={{ width: "0.9vw" }}></div>

          <Text size="standard">FRAME</Text>
          <div style={{ width: "0.25vw" }}></div>
          <Text size="standard" weight="medium">
            {frameId}
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

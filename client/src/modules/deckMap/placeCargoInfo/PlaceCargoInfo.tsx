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
  isOverview: boolean;
}

export const PlaceCargoInfo: React.FC<Props> = ({
  startOverButtonClick,
  lane,
  frameId,
  showStartOverButton,
  isOverview
}) => {
  if (lane && frameId) {
    return (
      <div className="PlaceCargoInfo">
        <FlexContainer
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
          fullWidth
        >
          <Text>
            Lane&nbsp;
            <Text weight="medium">
              {lane}
            </Text>&nbsp;
            Frame&nbsp;
            <Text weight="medium">
              {frameId}
            </Text>&nbsp;
          </Text>
          {showStartOverButton && (
            <BsArrowCounterclockwise
              className="PlaceCargoInfoStartOverButton"
              onClick={startOverButtonClick}
            />
          )}
        </FlexContainer>
      </div>
    );
  } else {
    return (
      <div className="PlaceCargoInfo">
        <Text>{isOverview ? "Select a cargo" : "Place the cargo"}</Text>
      </div>
    );
  }
};

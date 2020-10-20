import React from "react";
import { BsArrowCounterclockwise } from "react-icons/bs";
import { FlexContainer } from "../../../components/flexContainer";
import Text from "../../../components/text";
interface Props {
  startOverButtonClick: () => void;
  lane: string;
  showStartOverButton: boolean;
}

export const CargoPosition: React.FC<Props> = ({
  startOverButtonClick,
  lane,
  showStartOverButton,
}) => {
  return (
    <FlexContainer
      flexDirection="row"
      justifyContent="space-between"
      alignItems="center"
    >
      <Text size="small">{`Placing in lane ${lane}`}</Text>
      {showStartOverButton && (
        <BsArrowCounterclockwise onClick={startOverButtonClick} />
      )}
    </FlexContainer>
  );
};

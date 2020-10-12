import React from "react";
import { BsArrowCounterclockwise } from "react-icons/bs";
// import RedoButton from "../../../components/button/RedoButton";
import { FlexContainer } from "../../../components/flexContainer";
import Text from '../../../components/text';
interface Props {
  onClick: () => void;
  lane: string;
  frame: string;
}

export const CargoPosition: React.FC<Props> = ({ onClick, lane, frame }) => (
  <FlexContainer flexDirection="row" justifyContent="space-between" alignItems="center" onClick={onClick}>
    <Text size="small">{`Lane ${lane}, Frame ${frame}`}</Text>
    <BsArrowCounterclockwise />
    {/* <RedoButton onClick={onClick} /> */}
  </FlexContainer>
);

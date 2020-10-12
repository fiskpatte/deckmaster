import React from "react";
import RedoButton from "../../../components/button/RedoButton";
import { FlexContainer } from "../../../components/flexContainer";

interface Props {
  onClick: () => void;
  lane: string;
  frame: string;
}

export const CargoPosition: React.FC<Props> = ({ onClick, lane, frame }) => (
  <FlexContainer flexDirection="row">
    <div>{`Lane ${lane}, Frame ${frame}`}</div>
    <RedoButton onClick={onClick} />
  </FlexContainer>
);

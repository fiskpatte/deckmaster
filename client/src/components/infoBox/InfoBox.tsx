import React from "react";
import "./InfoBox.scss";
import { BsInfoCircle } from "react-icons/bs";
import { Paper } from "../paper";
import { FlexContainer } from "../flexContainer";

interface Props {
  text: string;
}

export const InfoBox: React.FC<Props> = ({ text }) => (
  <Paper className="InfoBox">
    <FlexContainer flexDirection="row" alignItems="center">
      <BsInfoCircle className="InfoBoxIcon" />
      <div className="InfoBoxText">{text}</div>
    </FlexContainer>
  </Paper>
);

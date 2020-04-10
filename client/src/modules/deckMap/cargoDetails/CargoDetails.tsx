import React, { useState } from "react";
import { Card } from "../../../components/card";
import CargoDetailItem from "./CargoDetailsItem";
import { Collapsible } from "../../../components/collapsible";
import "./CargoDetails.scss";
import variables from "./CargoDetails.scss";
import { Overlay } from "../../../components/overlay";
import { Cargo } from "../../../types/deckMap";
import { useHistory } from "react-router-dom";
import Button from "../../../components/button";

interface Props {
  currentCargo: Cargo;
}

export const CargoDetails: React.FC<Props> = ({ currentCargo }) => {
  const { registrationNumber, length, width, height, weight } = currentCargo;
  const [isCollapsed, setIsCollapsed] = useState(true);
  const history = useHistory();

  return (
    <>
      <div className="CargoDetails">
        <Card className="Card">
          <CargoDetailItem label="Cargo ID" value={registrationNumber} />
          <CargoDetailItem label="Length" value={`${length} meters`} />
          <CargoDetailItem label="Width" value={`${width} meters`} />
          <Collapsible
            isCollapsedParent={isCollapsed}
            setIsCollapsedParent={() => setIsCollapsed(!isCollapsed)}
          >
            <CargoDetailItem label="Height" value={`${height} meters`} />
            <CargoDetailItem label="Weight" value={`${weight} t`} />
            <div className="ButtonContainer">
              <Button
                className="CargoDetailsButton"
                onClick={() => console.log("Edit details click")}
                label="Edit details"
              />
              <Button
                className="CargoDetailsButton"
                onClick={() => history.push("/placecargo")}
                label="Change cargo"
              />
            </div>
          </Collapsible>
        </Card>
      </div>
      <Overlay
        visible={!isCollapsed}
        transparent={true}
        onClick={() => setIsCollapsed(true)}
        animate={false}
        zIndex={variables.cargoDetailsOverlayZIndex}
      />
    </>
  );
};

export default CargoDetails;

import React, { useState } from "react";
import { Card } from "../../../shared/components/card";

import { Collapsible } from "../../../shared/components/collapsible";
import "./CargoDetails.scss";
import variables from "./CargoDetails.scss";
import { CargoDetailsProps } from "../DeckMap.types";
import { Overlay } from "../../../shared/components/overlay";
import CargoDetailsItem from "./CargoDetailsItem";

export const CargoDetails: React.FC<CargoDetailsProps> = ({ currentCargo }) => {
  const { registrationNumber, length, width, height, weight } = currentCargo;
  const [isCollapsed, setIsCollapsed] = useState(true);

  return (
    <>
      <div className="CargoDetails">
        <Card className="Card">
          <CargoDetailsItem label="Cargo ID" value={registrationNumber} />
          <CargoDetailsItem label="Length" value={`${length} meters`} />
          <CargoDetailsItem label="Width" value={`${width} meters`} />
          <Collapsible
            isCollapsedParent={isCollapsed}
            setIsCollapsedParent={() => setIsCollapsed(!isCollapsed)}
          >
            <CargoDetailsItem label="Height" value={`${height} meters`} />
            <CargoDetailsItem label="Weight" value={`${weight} t`} />
            <Card
              className="Button"
              onClick={() => console.log("Edit details click")}
            >
              {"Edit details"}
            </Card>
            <Card
              className="Button"
              onClick={() => console.log("Change cargo click")}
            >
              {"Change cargo"}
            </Card>
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

import React, { useState } from "react";
import { Card } from "../../../components/card";
import CargoDetailItem from "./CargoDetailsItem";
import { Collapsible } from "../../../components/collapsible";
import "./CargoDetails.scss";
import variables from "./CargoDetails.scss";
import { Overlay } from "../../../components/overlay";
import { Cargo, cargoFactory } from "../../../types/deckMap";
// import { useHistory } from "react-router-dom";
// import Button from "../../../components/button";

interface Props {
  cargo?: Cargo;
}

export const CargoDetails: React.FC<Props> = ({ cargo = cargoFactory() }) => {
  const { registrationNumber, length, width, height, weight } = cargo;
  const [isCollapsed, setIsCollapsed] = useState(true);
  // const history = useHistory();

  if (cargo.id === "") return <div></div>;

  const renderBody = () => {
    return (
      <>
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
            {/* We think edit or change are unnecessary for now. */}
            {/* <Button
                className="CargoDetailsButton"
                onClick={() => console.log("Edit details click")}
                label="Edit details"
              /> */}
            {/* <Button
                className="CargoDetailsButton"
                onClick={() => history.push("/placecargo")}
                label="Change cargo"
              /> */}
          </div>
        </Collapsible>
      </>
    )
  }

  return (
    <>
      <div className="CargoDetails">
        <Card className="Card">
          {renderBody()}
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

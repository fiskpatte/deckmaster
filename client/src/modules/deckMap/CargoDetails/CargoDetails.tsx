import React from "react";
import CargoDetailItem from "./CargoDetailsItem";
import "./CargoDetails.scss";
import { Cargo } from "../../../types/deckMap";
import Button from "../../../components/button";

interface Props {
  cargo: Cargo;
}

export const CargoDetails: React.FC<Props> = ({ cargo }) => {
  const { registrationNumber } = cargo;

  return (
    <>
      <div className="CargoDetails">
        <CargoDetailItem
          label={!registrationNumber ? "No cargo selected" : "Cargo"}
          value={registrationNumber}
        />
        <Button
          label={""}
          type="neutral"
          isSearch={true}
          onClick={() => console.log("search cargo")}
          size="small"
        />
      </div>
    </>
  );
};

export default CargoDetails;

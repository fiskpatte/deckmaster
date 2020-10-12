import React from "react";
import Button from "../../../components/button";

interface Props {
  name: string;
  isCurrent: boolean;
  onClick: () => void;
}

const DeckSelectorItem: React.FC<Props> = ({ name, isCurrent, onClick }) => {

  return (
    <Button
      className={`DeckSelectorItem ${isCurrent ? "Selected" : ""}`}
      size="small"
      onClick={onClick}
      label={name}
    />
  );
};

export default DeckSelectorItem;

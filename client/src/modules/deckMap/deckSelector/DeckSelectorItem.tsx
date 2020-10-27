import React from "react";
import Button from "../../../components/button";

interface Props {
  name: string;
  order: number;
  isCurrent: boolean;
  onClick: () => void;
  isOpen: boolean;
}

const DeckSelectorItem: React.FC<Props> = ({ name, order, isCurrent, onClick, isOpen }) => {

  return (
    <div
      className={`DeckSelectorItem ${isOpen ? `open` : `closed-${order}`} ${isCurrent ? "current" : ""}`}
    >
      <Button
        className={`DeckSelectorItemButton ${isCurrent ? "Selected" : ""}`}
        onClick={onClick}
        label={name}
      />
    </div>
  );
};

export default DeckSelectorItem;

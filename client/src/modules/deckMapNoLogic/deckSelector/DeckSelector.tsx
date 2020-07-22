import React from "react";
import DeckSelectorItem from "./DeckSelectorItem";
import "./DeckSelector.scss";

interface Props {
  deckNames: string[];
  currentDeckName: string;
}

export const DeckSelector: React.FC<Props> = ({ deckNames, currentDeckName }) => {
  return (
    <div className="DeckSelector">
      {deckNames
        .map((name) => (
          <DeckSelectorItem
            name={name}
            isCurrent={name === currentDeckName}
            key={name}
          />
        ))}
    </div>
  );
};

export default DeckSelector;

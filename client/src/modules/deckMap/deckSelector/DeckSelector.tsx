import React from "react";
import DeckSelectorItem from "./DeckSelectorItem";
import "./DeckSelector.scss";
import { DeckMapType, Deck } from "../../../shared/types/deckMap";

interface Props {
  deckMap: DeckMapType;
  currentDeck: Deck;
}

export const DeckSelector: React.FC<Props> = ({ deckMap, currentDeck }) => {
  return (
    <div className="DeckSelector">
      {Object.keys(deckMap)
        .sort((key1, key2) => deckMap[key1].sortOrder - deckMap[key2].sortOrder)
        .map((key, ix) => (
          <DeckSelectorItem
            deck={deckMap[key]}
            isCurrent={key === currentDeck.name}
            key={ix}
          />
        ))}
    </div>
  );
};

export default DeckSelector;

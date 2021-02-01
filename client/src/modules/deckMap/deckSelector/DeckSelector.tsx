import React, { useState } from "react";
import OutsideAlerter from "../../../components/outsideAlerter/OutsideAlerter";
import DeckSelectorItem from "./DeckSelectorItem";
import "./DeckSelector.scss";
import { FlexContainer } from "../../../components/flexContainer";
import variables from "./DeckSelector.scss";
import { Overlay } from "../../../components/overlay";
import { DeckSelectorData } from "../../../types/deckMap";

interface Props {
  deckSelectorData: DeckSelectorData[];
  currentDeckName: string;
  setCurrentDeck: (name: string) => void;
  suggestedDeckId?: string;
}

export const DeckSelector: React.FC<Props> = ({
  deckSelectorData,
  currentDeckName,
  setCurrentDeck,
  suggestedDeckId,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const onDeckClick = (name: string) => {
    if (isOpen) {
      setCurrentDeck(name);
      setIsOpen(false);
    } else {
      setIsOpen(true);
    }
  };

  const onOutsideClick = () => {
    if (isOpen) {
      setIsOpen(false);
    }
  };

  return (
    <div className="DeckSelectorContainer">
      <Overlay
        visible={isOpen}
        onClick={onOutsideClick}
        zIndex={variables.deckSelectorOverlayZIndex}
      />
      <div className="DeckSelector">
        <OutsideAlerter outsideClickCallback={onOutsideClick}>
          <FlexContainer
            className="DeckSelectorItemsWrapper"
            flexDirection="column"
          >
            {deckSelectorData.map((data) => (
              <DeckSelectorItem
                key={data.name}
                name={data.name}
                order={data.sortOrder}
                isCurrent={data.name === currentDeckName}
                isSuggested={data.name === suggestedDeckId}
                onClick={() => onDeckClick(data.name)}
                isOpen={isOpen}
              />
            ))}
          </FlexContainer>
        </OutsideAlerter>
      </div>
    </div>
  );
};

export default DeckSelector;

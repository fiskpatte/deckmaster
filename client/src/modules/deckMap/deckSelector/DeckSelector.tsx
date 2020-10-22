import React, { useState } from "react";
import OutsideAlerter from "../../../components/outsideAlerter/OutsideAlerter";
import DeckSelectorItem from "./DeckSelectorItem";
import "./DeckSelector.scss";
import { FlexContainer } from "../../../components/flexContainer";
import { motion } from "framer-motion";
import variables from "./DeckSelector.scss";
import { Overlay } from "../../../components/overlay";

interface Props {
  deckNames: string[];
  currentDeckName: string;
  setCurrentDeck: (name: string) => void;
}

export const DeckSelector: React.FC<Props> = ({
  deckNames,
  currentDeckName,
  setCurrentDeck,
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
  const isVisible = (deckName: string) =>
    isOpen || deckName === currentDeckName;

  const onOutsideClick = () => {
    if (isOpen) {
      setIsOpen(false);
    }
  };
  const itemVariants = {
    extended: {
      opacity: 1,
      height: "auto",
      zIndex: 1,
      transition: { ease: "linear", duration: 0.2 },
    },
    collapsed: {
      opacity: 0,
      height: 0,
      transition: { ease: "linear", duration: 0.2 },
    },
  };

  return (
    <div className="DeckSelectorContainer">
      <div></div>
      <Overlay
        visible={isOpen}
        onClick={onOutsideClick}
        zIndex={variables.deckSelectorOverlayZIndex}
      />
      <div className="DeckSelector">
        <OutsideAlerter outsideClickCallback={onOutsideClick}>
          <FlexContainer flexDirection="column">
            {deckNames.map((deckName) => (
              <motion.div
                initial={isVisible(deckName) ? "extended" : "collapsed"}
                animate={isVisible(deckName) ? "extended" : "collapsed"}
                variants={itemVariants}
                key={deckName}
              >
                <DeckSelectorItem
                  name={deckName}
                  isCurrent={deckName === currentDeckName}
                  onClick={() => onDeckClick(deckName)}
                />
              </motion.div>
            ))}
          </FlexContainer>
        </OutsideAlerter>
      </div>
    </div>
  );
};

export default DeckSelector;

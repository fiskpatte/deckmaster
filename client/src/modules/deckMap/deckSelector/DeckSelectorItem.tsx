import React from "react";
import { useDispatch } from "react-redux";
import { Deck } from "../../../types/deckMap";
import Button from "../../../components/button";
import { setCurrentDeckId } from "../../../store/deckMap/deckMapActions";

interface Props {
  deck: Deck;
  isCurrent: boolean;
}

const DeckSelectorItem: React.FC<Props> = ({ deck, isCurrent }) => {
  const dispatch = useDispatch();
  const onClick = () => {
    dispatch(setCurrentDeckId(deck.name));
  };

  return (
    <Button
      className={`DeckSelectorItem ${isCurrent ? "Selected" : ""}`}
      onClick={onClick}
      label={deck.name}
    />
  );
};

export default DeckSelectorItem;

import React from "react";
import { useDispatch } from "react-redux";
import { setCurrentDeck } from "../../../store/actions/appActions";
import { Deck } from "../../../types/deckMap";
import Button from "../../../components/button";

interface Props {
  deck: Deck;
  isCurrent: boolean;
}

const DeckSelectorItem: React.FC<Props> = ({ deck, isCurrent }) => {
  const dispatch = useDispatch();
  const onClick = () => {
    dispatch(setCurrentDeck(deck));
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

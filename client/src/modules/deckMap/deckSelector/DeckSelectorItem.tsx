import React from "react";
import { useDispatch } from "react-redux";
import Button from "../../../components/button";
import { setCurrentDeckId } from "../../../store/deckMap/deckMapActions";

interface Props {
  name: string;
  isCurrent: boolean;
}

const DeckSelectorItem: React.FC<Props> = ({ name, isCurrent }) => {
  const dispatch = useDispatch();
  const onClick = () => {
    dispatch(setCurrentDeckId(name));
  };

  return (
    <Button
      className={`DeckSelectorItem ${isCurrent ? "Selected" : ""}`}
      onClick={onClick}
      label={name}
    />
  );
};

export default DeckSelectorItem;

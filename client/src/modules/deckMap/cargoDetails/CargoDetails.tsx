import React, { useState, useEffect, useRef } from "react";
import CargoDetailsItem from "./CargoDetailsItem";
import "./CargoDetails.scss";
import { CargoPlacement, Deck, Lane } from "../../../types/deckMap";
import { BsSearch } from "react-icons/bs";
import TextInput from "../../../components/textInput";
import { FlexContainer } from "../../../components/flexContainer";
import usePrevious from "../../../hooks/usePrevious";
import Text from "../../../components/text";
import { arrayMin } from "../../../functions/math";

interface Props {
  cargoPlacement: CargoPlacement;
  deck: Deck;
  searchIconClicked: () => void;
  isSearchingCargo: boolean;
  searchIconEnabled: boolean;
  doSearch: (input: string) => void;
  resetShowCargoNotFound: () => void;
  onOutsideClick: () => void;
  showCargoNotFound: boolean;
}

export const CargoDetails: React.FC<Props> = ({
  cargoPlacement,
  deck,
  searchIconClicked,
  isSearchingCargo,
  searchIconEnabled,
  doSearch,
  showCargoNotFound,
  resetShowCargoNotFound,
  onOutsideClick,
}) => {
  const { registrationNumber } = cargoPlacement.cargo;
  const [input, setInput] = useState(registrationNumber);
  const previousIsSearchingCargo = usePrevious(isSearchingCargo);
  const [showWideCargoIcon, setShowWideCargoIcon] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (deck && deck.lanes.length > 0) {
      const thinestLane = arrayMin(deck.lanes.map((lane: Lane) => lane.width));
      setShowWideCargoIcon(thinestLane < cargoPlacement.cargo.width);
    }
  }, [deck, cargoPlacement.cargo]);

  useEffect(() => {
    if (isSearchingCargo && !previousIsSearchingCargo) {
      setInput(registrationNumber);
      setTimeout(() => {
        inputRef.current?.select();
      }, 1);
    }
  }, [isSearchingCargo, previousIsSearchingCargo, registrationNumber]);

  const onInputChange = (value: string) => {
    setInput(value);
    if (showCargoNotFound) {
      resetShowCargoNotFound();
    }
  };

  const onSearchSubmit = (e: any) => {
    e.preventDefault();
    doSearch(input);
  };

  return (
    <>
      <div
        className="CargoDetails"
        onClick={searchIconEnabled ? searchIconClicked : () => null}
      >
        {isSearchingCargo ? (
          <FlexContainer flexDirection="column">
            <TextInput
              value={input}
              placeholder={registrationNumber || "Cargo ID"}
              onChange={(e) => onInputChange(e.target.value)}
              size="small"
              onSubmit={onSearchSubmit}
              onOutsideClick={onOutsideClick}
              ref={inputRef}
            />
            {showCargoNotFound && <Text value="Cargo not found" color="red" />}
          </FlexContainer>
        ) : (
            <FlexContainer flexDirection="column" fullWidth>
              <FlexContainer
                flexDirection="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <CargoDetailsItem
                  label={!registrationNumber ? "No cargo selected" : ""}
                  value={registrationNumber}
                  showWideCargoIcon={showWideCargoIcon}
                />
                {searchIconEnabled && <BsSearch />}
              </FlexContainer>
            </FlexContainer>
          )}
      </div>
    </>
  );
};

export default CargoDetails;

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
  cargoPlacements: CargoPlacement[];
  deck: Deck;
  onSuccessfulCargoSearch: (cp: CargoPlacement) => void;
  searchEnabled: boolean;
}

export const CargoDetails: React.FC<Props> = ({
  cargoPlacement,
  cargoPlacements,
  onSuccessfulCargoSearch,
  deck,
  searchEnabled,
}) => {
  const { registrationNumber } = cargoPlacement.cargo;
  const [input, setInput] = useState(registrationNumber);
  const [isSearchingCargo, setIsSearchingCargo] = useState(false);
  const previousIsSearchingCargo = usePrevious(isSearchingCargo);
  const [showCargoNotFound, setShowCargoNotFound] = useState(false);
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

  const doSearch = (input: string) => {
    const parsedInput = input.toUpperCase().replace(/\s/g, "");
    const result = cargoPlacements.find(
      (cp) =>
        cp.cargo.registrationNumber.toUpperCase().replace(/\s/g, "") === parsedInput
    );

    if (!result) {
      setShowCargoNotFound(true);
      return;
    }

    onSuccessfulCargoSearch(result);
    setIsSearchingCargo(false);
    return;
  };

  const startSearch = () => (
    setIsSearchingCargo(true)
  )

  const resetShowCargoNotFound = () => (
    setShowCargoNotFound(false)
  )

  const onOutsideClick = () => {
    resetShowCargoNotFound();
    setIsSearchingCargo(false);
  }

  return (
    <>
      <div
        className="CargoDetails"
        onClick={searchEnabled ? startSearch : () => null}
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
                  label={!registrationNumber ? "No cargo selected" : "CARGO"}
                  value={registrationNumber}
                  showWideCargoIcon={showWideCargoIcon}
                />
                {searchEnabled && <BsSearch />}
              </FlexContainer>
            </FlexContainer>
          )}
      </div>
    </>
  );
};

export default CargoDetails;

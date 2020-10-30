import React, { useState, useEffect, useRef } from "react";
import CargoDetailsItem from "./CargoDetailsItem";
import "./CargoDetails.scss";
import { CargoPlacement, Deck, Lane } from "../../../types/deckMap";
import { BsArrowCounterclockwise, BsSearch } from "react-icons/bs";
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
  startOverButtonClick: () => void;
  lane: string | undefined;
  frameId: number | undefined;
  showStartOverButton: boolean;
}

export const CargoDetails: React.FC<Props> = ({
  cargoPlacement,
  cargoPlacements,
  onSuccessfulCargoSearch,
  deck,
  searchEnabled,
  startOverButtonClick,
  lane,
  frameId,
  showStartOverButton,
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

  const renderSearchRow = () => {
    return (
      isSearchingCargo ? (
        <FlexContainer flexDirection="column" fullWidth className="Container">
          <TextInput
            className="SearchCargoInput"
            value={input}
            placeholder={registrationNumber || "Cargo ID"}
            onChange={(e) => onInputChange(e.target.value)}
            size="small"
            onSubmit={onSearchSubmit}
            onOutsideClick={onOutsideClick}
            isSearchInput
            ref={inputRef}
          />
          {showCargoNotFound && <Text value="Cargo not found" color="red" />}
        </FlexContainer>
      ) : (
          <FlexContainer
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
            fullWidth
            className="Container"
            onClick={searchEnabled ? startSearch : () => null}
          >
            <CargoDetailsItem
              label={!registrationNumber ? "Search cargo" : "Cargo"}
              value={registrationNumber}
              showWideCargoIcon={showWideCargoIcon}
            />
            {searchEnabled && <BsSearch />}
          </FlexContainer>
        ));
  }

  const renderPlaceCargoInfo = () => {
    return (
      <FlexContainer
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
        fullWidth
        className="Container"
      >
        <CargoDetailsItem
          label="Lane"
          value={lane ?? "-"}
        />
        <CargoDetailsItem
          label="Frame"
          value={frameId?.toString() ?? "-"}
        />
        <div style={{ display: "flex", flex: 1, justifyContent: "flex-end" }}>
          {showStartOverButton && (
            <BsArrowCounterclockwise
              className="PlaceCargoInfoStartOverButton"
              onClick={startOverButtonClick}
            />
          )}
        </div>
      </FlexContainer>
    );
  }

  return (
    <>
      <div
        className="CargoDetails"
      >
        {renderSearchRow()}
        {renderPlaceCargoInfo()}
      </div>
    </>
  );
};

export default CargoDetails;

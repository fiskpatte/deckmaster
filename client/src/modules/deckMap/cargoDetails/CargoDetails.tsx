import React, { useState, useEffect } from "react";
import CargoDetailItem from "./CargoDetailsItem";
import "./CargoDetails.scss";
import { Cargo } from "../../../types/deckMap";
import { BsSearch } from "react-icons/bs";
import TextInput from "../../../components/textInput";
import { FlexContainer } from "../../../components/flexContainer";
import usePrevious from "../../../hooks/usePrevious";
import Text from "../../../components/text";

interface Props {
  cargo: Cargo;
  searchIconClicked: () => void;
  isSearchingCargo: boolean;
  searchIconEnabled: boolean;
  doSearch: (input: string) => void;
  resetShowCargoNotFound: () => void;
  showCargoNotFound: boolean;
}

export const CargoDetails: React.FC<Props> = ({
  cargo,
  searchIconClicked,
  isSearchingCargo,
  searchIconEnabled,
  doSearch,
  showCargoNotFound,
  resetShowCargoNotFound,
}) => {
  const [input, setInput] = useState("");
  const { registrationNumber } = cargo;
  const previousIsSearchingCargo = usePrevious(isSearchingCargo);

  useEffect(() => {
    if (isSearchingCargo && !previousIsSearchingCargo) {
      setInput(registrationNumber);
      const searchInput = document.getElementById(
        "search-input"
      ) as HTMLInputElement;
      if (searchInput) {
        searchInput.focus();
        setTimeout(function () {
          searchInput.setSelectionRange(0, 9999);
        }, 1);
      }
    }
  }, [isSearchingCargo, input, previousIsSearchingCargo, registrationNumber]);

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
      <div className="CargoDetails">
        {isSearchingCargo ? (
          <FlexContainer flexDirection="column">
            <FlexContainer>
              <TextInput
                value={input}
                onChange={(e) => onInputChange(e.target.value)}
                id="search-input"
                size="small"
                hasSubmit={true}
                autoFocus={true}
                onSubmit={onSearchSubmit}
              />
            </FlexContainer>
            {showCargoNotFound && <Text value="Cargo not found" color="red" />}
          </FlexContainer>
        ) : (
          <CargoDetailItem
            label={!registrationNumber ? "No cargo selected" : "Cargo"}
            value={registrationNumber}
          />
        )}

        {searchIconEnabled && <BsSearch onClick={searchIconClicked} />}

        {/* <Button
          label={""}
          type="neutral"
          isSearch={true}
          onClick={() => console.log("search cargo")}
          size="small"
        /> */}
      </div>
    </>
  );
};

export default CargoDetails;

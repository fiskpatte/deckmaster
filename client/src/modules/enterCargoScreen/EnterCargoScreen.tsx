import React, { useState } from "react";
// import { BlueBackground } from "../../components/blueBackground";
import { Paper } from "../../components/paper";
import { getMockCargo } from "../../api/endpoints";
import { setCurrentPlacement } from "../../store/deckMap/deckMapActions";
import { ErrorMessage } from "../../components/errorMessage";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import TextInput from "../../components/textInput";
import Text from "../../components/text";
import Separator from "../../components/separator";
import { FlexRowEndContainer } from "../../components/flexContainer";
import { cargoPlacementFactory } from "../../types/deckMap";
import { routes } from "./../../routes";
import ConfirmButton from "../../components/button/ConfirmButton";
import { BlueBackground } from "../../components/blueBackground";

export const EnterCargoScreen = () => {
  const [value, setValue] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();

  const onNextButtonClick = async () => {
    try {
      if (error) {
        setError("");
      }
      setLoading(true);
      const cargo = await getMockCargo();
      let newPlacement = cargoPlacementFactory();
      newPlacement.cargo = cargo;
      dispatch(setCurrentPlacement(newPlacement));
      history.push(routes.PlaceCargoConfirm.path);
      // go to mapscreen
    } catch (error) {
      setLoading(false);
      setError("Cargo not found");
    }
  };

  return (
    <BlueBackground>
      <Paper>
        <Text size="medium" value="Enter cargo ID" />
        <TextInput
          value={value}
          onChange={(e) => setValue(e.target.value)}
          autoFocus={true}
          size="big"
        />
        <Separator />
        <FlexRowEndContainer>
          <ConfirmButton
            size="medium"
            onClick={onNextButtonClick}
            loading={loading}
          />
        </FlexRowEndContainer>
        {error && <ErrorMessage message={error} />}
      </Paper>
    </BlueBackground>
  );
};

export default EnterCargoScreen;

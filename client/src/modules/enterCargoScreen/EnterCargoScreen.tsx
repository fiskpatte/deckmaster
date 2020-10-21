import React, { useState } from "react";
import { Paper } from "../../components/paper";
import { getMockCargo } from "../../api/endpoints";
import { setCurrentPlacement } from "../../store/deckMap/deckMapActions";
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
import useToast from "../../hooks/useToast";

export const EnterCargoScreen = () => {
  const toast = useToast();
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();

  const onNextButtonClick = async () => {
    setLoading(true);
    try {
      const cargo = await getMockCargo();
      dispatch(setCurrentPlacement({ ...cargoPlacementFactory(), cargo }));
      history.push(routes.PlaceCargoConfirm.path);
    } catch (error) {
      setLoading(false);
      toast.error("Cargo not found");
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
      </Paper>
    </BlueBackground>
  );
};

export default EnterCargoScreen;

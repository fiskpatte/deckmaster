import React, { useState } from "react";
// import { BlueBackground } from "../../components/blueBackground";
import { Paper } from "../../components/paper";
import { getMockCargo } from "../../api/endpoints";
import { setCurrentCargo } from "../../store/deckMap/deckMapActions";
import { ErrorMessage } from "../../components/errorMessage";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import TextInput from "../../components/textInput";
import Button from "../../components/button";
import Text from "../../components/text";
import Separator from "../../components/separator";
import { FlexRowEndContainer } from "../../components/flexContainer";
import ContentContainer from "../../components/contentContainer";

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
      dispatch(setCurrentCargo(cargo));
      history.push("/placecargo/confirmcargo");
      // go to mapscreen
    } catch (error) {
      setLoading(false);
      setError("Cargo not found");
    }
  };

  return (
    <ContentContainer>
      <Paper>
        <Text size="medium" value="Enter cargo ID" />
        <TextInput
          value={value}
          onChange={e => setValue(e.target.value)}
          size="big"
        />
        <Separator />
        <FlexRowEndContainer>
          <Button
            type="positive"
            label="Next"
            onClick={onNextButtonClick}
            loading={loading}
          />
        </FlexRowEndContainer>
        {error && <ErrorMessage message={error} />}
      </Paper>
    </ContentContainer>
  );
};

export default EnterCargoScreen;

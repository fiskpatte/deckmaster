import React, { useState } from "react";
import { BlueBackground } from "../../shared/components/blueBackground";
import { Paper } from "../../shared/components/paper";
import { getMockCargo } from "../../api/endpoints";
import { setCurrentCargo } from "../../store/actions/cargoActions";
import { ErrorMessage } from "../../shared/components/errorMessage";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

export const EnterCargoScreen = () => {
  const [input, setInput] = useState("");
  const [error, setError] = useState("");
  const history = useHistory();
  const dispatch = useDispatch();

  const onNextButtonClick = async () => {
    try {
      if (error) {
        setError("");
      }
      const cargo = await getMockCargo();
      dispatch(setCurrentCargo(cargo));
      history.push("/placecargo/confirmcargo");
      // go to mapscreen
    } catch (error) {
      setError("Cargo not found");
    }
  };

  return (
    <BlueBackground>
      <Paper>
        <h1>Enter cargo id</h1>
        <input
          style={{ width: "300px" }}
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Write whatever, mockcargo will be used"
        />
        <button onClick={onNextButtonClick}>Next</button>
        {error && <ErrorMessage message={error} />}
      </Paper>
    </BlueBackground>
  );
};

export default EnterCargoScreen;

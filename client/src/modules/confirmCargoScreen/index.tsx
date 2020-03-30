import React from "react";
import BlueBackground from "../../shared/components/blueBackground/BlueBackground";
import Paper from "../../shared/components/paper";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { useHistory } from "react-router-dom";

export default function ConfirmCargoScreen() {
  const { currentCargo: cargo } = useSelector(
    (state: RootState) => state.cargoReducer
  );

  const history = useHistory();

  return (
    <BlueBackground>
      <Paper>
        <h1>Confirm cargo</h1>
        <table>
          <tbody>
            <tr>
              <td>Cargo ID</td>
              <td>{cargo.registrationNumber}</td>
            </tr>
            <tr>
              <td>Type</td>
              <td>Truck</td>
            </tr>
            <tr>
              <td>Length</td>
              <td>{cargo.length}</td>
            </tr>
            <tr>
              <td>Width</td>
              <td>{cargo.width}</td>
            </tr>
            <tr>
              <td>Height</td>
              <td>{cargo.height}</td>
            </tr>
            <tr>
              <td>Weight</td>
              <td>{cargo.weight}</td>
            </tr>
          </tbody>
        </table>
        <button onClick={() => history.push("/placecargo")}>Cancel</button>
        <button onClick={() => history.push("/deckmap")}>Confirm</button>
      </Paper>
    </BlueBackground>
  );
}

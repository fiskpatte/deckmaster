import React from "react";
import { Paper } from "../../components/paper";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { useHistory } from "react-router-dom";
import Text from "../../components/text";
import "./ConfirmCargoScreen.scss";
import Separator from "../../components/separator";
import { cargoIsEmpty } from "../deckMap/DeckMap.functions";
import { routes } from "./../../routes";
import ConfirmButton from "../../components/button/ConfirmButton";
import CancelButton from "../../components/button/CancelButton";
import { BlueBackground } from "../../components/blueBackground";
import { FlexContainer } from "../../components/flexContainer";
import { getCargoType } from "../../types/util";

export const ConfirmCargoScreen = () => {
  const { currentCargoPlacement } = useSelector(
    (state: RootState) => state.deckMapReducer
  );
  const { cargo } = currentCargoPlacement;
  const history = useHistory();
  if (cargoIsEmpty(cargo)) {
    history.push(routes.PlaceCargo.path);
  }
  return (
    <BlueBackground>
      <Paper>
        <Text size="medium" value="Cargo details" />
        <table>
          <tbody>
            <tr>
              <td className="LabelCell">Cargo ID</td>
              <td className="ValueCell">{cargo.registrationNumber}</td>
            </tr>
            <tr>
              <td className="LabelCell">Type</td>
              <td className="ValueCell">{getCargoType(cargo.type)}</td>
            </tr>
            <tr>
              <td className="LabelCell">Length</td>
              <td className="ValueCell">{cargo.length + " m"}</td>
            </tr>
            <tr>
              <td className="LabelCell">Width</td>
              <td className="ValueCell">{cargo.width + " m"}</td>
            </tr>
            <tr>
              <td className="LabelCell">Height</td>
              <td className="ValueCell">{cargo.height + " m"}</td>
            </tr>
            <tr>
              <td className="LabelCell">Weight</td>
              <td className="ValueCell">{cargo.weight + " mT"}</td>
            </tr>
          </tbody>
        </table>
        <Separator />

        <FlexContainer justifyContent="space-between">
          <CancelButton
            size="medium"
            onClick={() => history.push(routes.PlaceCargo.path)}
          />

          <ConfirmButton
            size="medium"
            onClick={() => history.push(routes.PlaceCargoDeckMap.path)}
          />
        </FlexContainer>
      </Paper>
    </BlueBackground>
  );
};

export default ConfirmCargoScreen;

import React, { useState, useEffect } from "react";
import { Paper } from "../../components/paper";
import { getMockCargo } from "../../api/endpoints";
import { setCurrentPlacement } from "../../store/deckMap/deckMapActions";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import TextInput from "../../components/textInput";
// import Text from "../../components/text";
import Separator from "../../components/separator";
import {
  FlexContainer,
  FlexRowEndContainer,
} from "../../components/flexContainer";
import { cargoPlacementFactory } from "../../types/deckMap";
import { routes } from "./../../routes";
import ConfirmButton from "../../components/button/ConfirmButton";
import { BlueBackground } from "../../components/blueBackground";
import useToast from "../../hooks/useToast";
import { useSpring, animated, config } from "react-spring";
import "./EnterCargoScreen.scss";
import TopBar from "../loginScreen/TopBar";

export const EnterCargoScreen = () => {
  const toast = useToast();
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();

  const shouldAnimate = !!localStorage.getItem("fromLogin");

  useEffect(() => {
    return () => {
      if (shouldAnimate) {
        localStorage.removeItem("fromLogin");
      }
    };
  }, []);

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

  const props = useSpring({
    height: "24vh",
    from: { height: "40vh" },
    config: config.slow,
  });

  return shouldAnimate ? (
    <BlueBackground>
      <Paper>
        <animated.div style={props} className="EnterCargoScreenContainer">
          <FlexContainer flexDirection="column">
            <TopBar text="Enter Cargo Id" fadeOutLogoOnMount={true} />
            {/* <Separator /> */}
            <TextInput
              value={value}
              onChange={(e) => setValue(e.target.value)}
              autoFocus={true}
              size="big"
            />
            <Separator />
          </FlexContainer>

          <FlexRowEndContainer>
            <ConfirmButton
              size="medium"
              onClick={onNextButtonClick}
              loading={loading}
            />
          </FlexRowEndContainer>
        </animated.div>
      </Paper>
    </BlueBackground>
  ) : (
    <BlueBackground>
      <Paper>
        <FlexContainer flexDirection="column">
          <TopBar text="Enter Cargo ID" fadeOutLogoOnMount={false} />
          <TextInput
            value={value}
            onChange={(e) => setValue(e.target.value)}
            autoFocus={true}
            size="big"
          />
          {/* <Separator /> */}
        </FlexContainer>

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

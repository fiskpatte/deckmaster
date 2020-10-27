import React, { useState, useEffect } from "react";
import { BlueBackground } from "../../components/blueBackground";
import { Paper } from "../../components/paper";
import TextInput from "../../components/textInput";
import Button from "../../components/button";
import { login } from "../../api/endpoints";
import { useHistory } from "react-router-dom";
import TopBar from "./TopBar";
import { useIsLoggedIn } from "../../hooks/useIsLoggedIn";
import Separator from "../../components/separator";
import { FlexRowEndContainer } from "../../components/flexContainer";
import { useDispatch } from "react-redux";
import { setSessionData } from "./../../store/app/appActions";
import { SessionData } from "./../../types/sessionData";
import { routes } from "./../../routes";
import useToast from "../../hooks/useToast";
import { useSpring, animated } from "react-spring";

export const LoginScreen: React.FC = () => {
  const history = useHistory();
  const toast = useToast();

  const [username, setUsername] = useState("Pontus2");
  const [password, setPassword] = useState("testtest");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const isLoggedIn = useIsLoggedIn();

  useEffect(() => {
    if (isLoggedIn) {
      history.push(routes.PlaceCargo.path);
    }
  }, [history, isLoggedIn]);

  const onLoginButtonClick = async () => {
    if (!username || !password) {
      return;
    }

    setLoading(true);
    try {
      const loginCallback = (data: SessionData) =>
        dispatch(setSessionData(data));
      await login(username, password, loginCallback);
      history.push(routes.PlaceCargo.path);
    } catch (error) {
      toast.error("Login failed");
      setLoading(false);
    }
  };

  const props = useSpring({
    opacity: 1,
    from: { opacity: 0 },
  });

  return (
    <BlueBackground style={{ height: "100vh" }}>
      <animated.div style={props}>
        <Paper>
          <TopBar />
          <Separator />
          <TextInput
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Email adress"
            size="big"
          />
          <Separator />
          <TextInput
            value={password}
            type={"password"}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            size="big"
          />
          <Separator />
          <FlexRowEndContainer>
            <Button
              label="Login"
              onClick={onLoginButtonClick}
              color="green"
              size="medium"
              loading={loading}
            />
          </FlexRowEndContainer>
        </Paper>
      </animated.div>
    </BlueBackground>
  );
};

export default LoginScreen;

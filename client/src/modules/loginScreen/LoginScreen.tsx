import React, { useState } from "react";
import { BlueBackground } from "../../shared/components/blueBackground";
import { Paper } from "../../shared/components/Paper";
import { TextInput } from "../../shared/components/TextInput";
import Button from "../../shared/components/Button";
import { login } from "../../api/endpoints";
import { useHistory } from "react-router-dom";
import TopBar from "./TopBar";
import { isLoggedIn } from "../../shared/functions/auth";

export const LoginScreen: React.FC = () => {
  const history = useHistory();

  const [username, setUsername] = useState("Pontus2");
  const [password, setPassword] = useState("testtest");
  const [error, setError] = useState("");

  if (isLoggedIn()) history.push("placecargo");

  const onLoginButtonClick = async () => {
    if (!username || !password) {
      return;
    }

    if (error) {
      setError("");
    }

    try {
      await login(username, password);
      history.push("/placecargo");
    } catch (error) {
      setError("Login failed");
    }
  };

  const Separator = () => <div style={{ height: "20px" }} />;

  return (
    <BlueBackground>
      <Paper>
        <TopBar />
        <Separator />
        <TextInput
          value={username}
          onChange={e => setUsername(e.target.value)}
          placeholder="Email adress"
        />
        <Separator />
        <TextInput
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder="Password"
        />
        <Separator />
        <Button label="Log in" onClick={onLoginButtonClick} type="positive" />
      </Paper>
    </BlueBackground>
  );
};

export default LoginScreen;

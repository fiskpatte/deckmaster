import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.scss";
import { parseLoadPlan } from "./functions/loadPlanParser";
import loadPlans from "./assets/data/LoadPlans.dat";
import { Header } from "./modules/header";
import { useDispatch } from "react-redux";
import appActions from "./store/actions/appActions";
import { Loader } from "./components/loader";
import { renderRoutes } from "./routes.functions";
import socketIOClient from "socket.io-client";

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    parseLoadPlan(loadPlans).then((res) => {
      //TODO: THIS IS ONLY FOR TESTING AND SHOULD BE FIXED LATER
      res["Lower Hold"] = {
        name: "Lower Hold",
        lanes: [],
        grids: [],
        frames: [],
        sortOrder: 1,
      };
      res["Main Deck"] = {
        name: "Main Deck",
        lanes: [],
        grids: [],
        frames: [],
        sortOrder: 2,
      };
      res["Upper Deck"] = {
        name: "Upper Deck",
        lanes: [],
        grids: [],
        frames: [],
        sortOrder: 3,
      };
      dispatch(appActions.setDeckMap(res));
      dispatch(appActions.setCurrentDeck(res["Weather Deck"]));
      setLoading(false);
    });
  }, [dispatch]);

  useEffect(() => {
    const socket = socketIOClient("http://localhost:4000");
    socket.on("connect", () => {
      console.log("websocket initialized");
    });
    socket.on("newCargoPlacement", (payload: any) => {
      console.log(
        "cargoPlacement received from server via websocket: ",
        payload
      );
    });
  }, []);

  if (loading) {
    return <Loader />;
  }
  return (
    <Router>
      <div className="App">
        <Route>
          <Header />
        </Route>
        <Switch>{renderRoutes()}</Switch>
      </div>
    </Router>
  );
};

export default App;

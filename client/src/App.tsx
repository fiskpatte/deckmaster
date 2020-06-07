import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.scss";
import { parseLoadPlan } from "./functions/loadPlanParser";
import loadPlans from "./assets/data/LoadPlans.dat";
import { Header } from "./modules/header";
import { useDispatch, useSelector } from "react-redux";
import { Loader } from "./components/loader";
import { renderRoutes } from "./routes.functions";
import socketIOClient from "socket.io-client";
import { useIsLoggedIn } from "./hooks/useIsLoggedIn";
import { getCargoPlacements } from "./api/cargoPlacement";
import { getCargoQueue } from "./api/cargoQueue";
import deckMapActions from "./store/deckMap/deckMapActions";
import cargoQueueActions from "./store/cargoQueue/cargoQueueActions";
import { CargoQueueItem } from "./types/CargoQueueItem";
import appActions from "./store/app/appActions";
import { getSettings } from "./api/endpoints";
import { Settings } from "./types/settings";
import { RootState } from "./store";
import { setAllDefaultHeaders } from './functions/axios';

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const isLoggedIn = useIsLoggedIn();
  const { sessionData } = useSelector(
    (state: RootState) => state.appReducer
  );
  if (!isLoggedIn && sessionData) {
    setAllDefaultHeaders(sessionData);
  }
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
      dispatch(deckMapActions.setDeckMap(res));
      dispatch(deckMapActions.setCurrentDeckId("Weather Deck"));
      setLoading(false);
    });
  }, [dispatch]);

  useEffect(() => {
    if (sessionData) {
      setAllDefaultHeaders(sessionData);
    }
  }, [sessionData])

  useEffect(() => {
    const fetchCargoPlacements = async () =>
      dispatch(deckMapActions.setCargoPlacements(await getCargoPlacements()));

    const fetchCargoQueue = async () =>
      dispatch(cargoQueueActions.setCargoQueue(await getCargoQueue()));

    const fetchSettings = async () =>
      dispatch(appActions.setSettings(await getSettings()));

    if (isLoggedIn) {
      fetchCargoPlacements();
      fetchCargoQueue();
      fetchSettings();
    }
  }, [dispatch, isLoggedIn]);

  useEffect(() => {
    const socket = socketIOClient("http://localhost:4000");
    if (isLoggedIn) {
      socket.on("newCargoPlacement", (payload: any) => {
        console.log("cargoPlacement from websocket: ", payload);
        dispatch(deckMapActions.addCargoPlacement(payload));
      });
    }
  }, [dispatch, isLoggedIn]);

  useEffect(() => {
    const socket = socketIOClient("http://localhost:4000");
    if (isLoggedIn) {
      socket.on("cargoQueueUpdated", (payload: CargoQueueItem[]) => {
        console.log("cargoQueueUpdated: ", payload);
        dispatch(cargoQueueActions.setCargoQueue(payload));
      });
    }
  }, [dispatch, isLoggedIn]);

  useEffect(() => {
    const socket = socketIOClient("http://localhost:4000");
    if (isLoggedIn) {
      socket.on("settingsUpdated", (payload: Settings) => {
        console.log("settingsUpdated: ", payload);
        dispatch(appActions.setSettings(payload));
      });
    }
  }, [dispatch, isLoggedIn]);

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

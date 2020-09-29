import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.scss";
import { parseLoadPlan } from "./functions/loadPlanParser";
import loadPlans from "./assets/data/LoadPlans.dat";
import { Header } from "./modules/header";
import { useDispatch, useSelector } from "react-redux";
import { Loader } from "./components/loader";
import { renderRoutes } from "./routes.functions";
import { useIsLoggedIn } from "./hooks/useIsLoggedIn";
import { getCargoPlacements } from "./api/cargoPlacement";
import { getCargoQueue } from "./api/cargoQueue";
import deckMapActions from "./store/deckMap/deckMapActions";
import cargoQueueActions from "./store/cargoQueue/cargoQueueActions";
import appActions from "./store/app/appActions";
import { getSettings } from "./api/endpoints";
import { RootState } from "./store";
import { setAllDefaultHeaders } from "./functions/axios";
import useSocket from './hooks/useSocket';

const App: React.FC = () => {
  const [loading,] = useState(false);
  const dispatch = useDispatch();
  const isLoggedIn = useIsLoggedIn();
  const { sessionData } = useSelector((state: RootState) => state.appReducer);
  useEffect(() => {
    if (sessionData) {
      setAllDefaultHeaders(sessionData);
    }
  }, [sessionData]);
  useSocket(isLoggedIn, sessionData?.voyageId ?? "", sessionData?.vesselId ?? "");

  useEffect(() => {
    if (isLoggedIn) {
      parseLoadPlan(loadPlans).then(res => {
        //TODO: THIS IS ONLY FOR TESTING AND SHOULD BE FIXED LATER
        res["Lower Hold"] = {
          name: "Lower Hold",
          lanes: res["Weather Deck"].lanes,
          grids: res["Weather Deck"].grids,
          frames: res["Weather Deck"].frames,
          sortOrder: 1
        };
        res["Main Deck"] = {
          name: "Main Deck",
          lanes: [],
          grids: [],
          frames: [],
          sortOrder: 2
        };
        res["Upper Deck"] = {
          name: "Upper Deck",
          lanes: [],
          grids: [],
          frames: [],
          sortOrder: 3
        };
        dispatch(deckMapActions.setDeckMap(res));
        dispatch(deckMapActions.setCurrentDeckId("Weather Deck"));
      });
    }
  }, [dispatch, isLoggedIn]);

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

  if (loading) {
    return <Loader />;
  }

  console.log("app");
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

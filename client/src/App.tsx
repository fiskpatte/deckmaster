import React, { useEffect, useState } from "react";
import { Route, Switch, useLocation } from "react-router-dom";
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
import useSocket from "./hooks/useSocket";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AnimatePresence } from "framer-motion";

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const isLoggedIn = useIsLoggedIn();
  const { sessionData } = useSelector((state: RootState) => state.appReducer);
  const location = useLocation();

  useEffect(() => {
    setLoading(true);
    if (sessionData) {
      setAllDefaultHeaders(sessionData);
    }
    setLoading(false);
  }, [sessionData]);

  useSocket(
    isLoggedIn,
    sessionData?.voyageId ?? "",
    sessionData?.vesselId ?? ""
  );

  useEffect(() => {
    if (isLoggedIn) {
      parseLoadPlan(loadPlans).then((res) => {
        //TODO: THIS IS ONLY FOR TESTING AND SHOULD BE FIXED LATER
        res["Lower Hold"] = {
          name: "Lower Hold",
          lanes: res["Weather Deck"].lanes,
          grids: res["Weather Deck"].grids,
          frames: res["Weather Deck"].frames,
          sortOrder: 4,
        };
        res["Main Deck"] = {
          name: "Main Deck",
          lanes: [],
          grids: [],
          frames: [],
          sortOrder: 3,
        };
        res["Upper Deck"] = {
          name: "Upper Deck",
          lanes: [],
          grids: [],
          frames: [],
          sortOrder: 2,
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
  return (
    <div className="App">
      {isLoggedIn && (
        <Route>
          <Header />
        </Route>
      )}
      <AnimatePresence exitBeforeEnter>
        <Switch location={location} key={location.pathname}>{renderRoutes()}</Switch>
      </AnimatePresence>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default App;

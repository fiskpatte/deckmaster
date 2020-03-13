import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.scss";
import DeckMap from "./modules/deckMap/DeckMap";
import { parseLoadPlan } from "./shared/functions/loadPlanParser";
import loadPlans from "./assets/data/LoadPlans.dat";
import Header from "./modules/header/Header";
import { useDispatch, useSelector } from "react-redux";
import appActions from "./store/actions/appActions";
import Loader from "./shared/components/loader/Loader";
import LoginScreen from "./modules/loginScreen/LoginScreen";
import PrivateRoute from "./PrivateRoute";

const App = () => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const { currentDeck, currentCargo } = useSelector(state => state.appReducer);

  useEffect(() => {
    parseLoadPlan(loadPlans).then(res => {
      //THIS IS ONLY FOR TESTING AND SHOULD BE FIXED LATER
      res.unshift(
        { deck: "Lower Hold", lanes: [], grids: [] },
        { deck: "Main Deck", lanes: [], grids: [] },
        { deck: "Upper Deck", lanes: [], grids: [] }
      );
      dispatch(appActions.setDeckMap(res));
      dispatch(appActions.setCurrentDeck(res[0]));
      dispatch(appActions.setCurrentCargo({ length: 14, width: 2.5 }));
      //
      setLoading(false);
    });
    // NOT NEEDED FOR NOW
    // window.document.body.addEventListener('touchstart', (e) => e.preventDefault(), { "passive": false });
    // return () => window.document.body.removeEventListener('touchstart', (e) => e.preventDefault(), { "passive": false });
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <Router>
      <div className="App">
        <Route component={Header} />
        <Switch>
          <Route path="/" exact>
            <div>TEST</div>
          </Route>
          <Route path="/login" exact>
            <LoginScreen />
          </Route>
          <Route path="/loading">
            <DeckMap />
          </Route>
          <PrivateRoute
            path="/overview"
            component={<h1>Protected overview</h1>}
          />
          <Route path="/discharge">
            <div>Discharge</div>
          </Route>
          <Route path="/history">
            <div>History</div>
          </Route>
          <Route path="/settings">
            <div>Settings</div>
          </Route>
          <Route path="/logout">
            <div>Logout</div>
          </Route>
          {/* <DeckMap currentDeck={currentDeck} currentCargo={currentCargo} /> */}
        </Switch>
      </div>
    </Router>
  );
};

export default App;

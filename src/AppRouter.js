import React, { useReducer, useEffect } from "react";
import { Router, Redirect } from "@reach/router";
import firebase from "firebase/app";
import 'firebase/auth'

import MapContext from "./MapContext";
import MapReducer from "./MapReducer";
import { getAllTrips } from "./firebase/firestore";
import "./App.css";

import Home from "./Pages/Home";
import Login from "./Pages/LogIn";
import SignUp from "./Pages/SignUp";
import Track from "./Pages/Track";
import TrackEdit from "./Pages/TrackEdit";
import TrackUpload from "./Pages/TrackUpload";
import Trip from "./Pages/Trip";
import TripEdit from "./Pages/TripEdit";
import MyTrips from "./Pages/MyTrips";
import NewTrip from "./Pages/NewTrip"
// import Type from './Pages/Type'

import Nav from "./Layout/Nav";

function AppRouter() {
  const [state, dispatch] = useReducer(MapReducer, {
    trips: [],
    types: [],
    newTrip: {},
    currentTrip: {},
    uploadPoints: [],
    currentTracks: [],
    currentTrack: {},
    images: []
  });
  useEffect(() => getAllTrips(dispatch), []);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => dispatch({type: 'authstatechanged', payload: user}))
}, [])

  return (
      <MapContext.Provider value={{ state, dispatch }}>
        <Nav />{}
        <Router>
          <Home path="/" />
          <SignUp path="signup" />
          <Login path="login" />
          <Home path="/type/:type" />
          <Trip path="/trip/:trip" />
          <TripEdit path="/type/:type/trip/:trip/edit" />
          <Track path="/trip/:trip/track/:track" />
          <TrackEdit path="/type/:type/trip/:trip/track/:track/edit" />
          <NewTrip path="newtrip" />
          {state.user ? <TrackUpload path="/trip/:trip/upload" /> : <Redirect from="upload" to="login" noThrow/> }
          {state.user ? <MyTrips path="mytrips" /> : <Redirect from="mytrips" to="login" noThrow/> }
        </Router>
      </MapContext.Provider>
  );
}

export default AppRouter;

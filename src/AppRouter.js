import React, { useReducer, useEffect } from "react";
import { Router, Redirect, navigate } from "@reach/router";
import firebase from "firebase/app";
import 'firebase/auth'

import { getUseDetailsByUID } from "./firebase/firestore"

import MapContext from "./MapContext";
import MapReducer from "./MapReducer";

import "./App.css";

import Home from "./Pages/Home";
import Login from "./Pages/LogIn";
import SignUp from "./Pages/SignUp";
import Track from "./Pages/Track";
import TrackEdit from "./Pages/TrackEdit";
// import TrackUpload from "./Pages/TrackUpload";
import Trip from "./Pages/Trip";
import TripEdit from "./Pages/TripEdit";
import MyTrips from "./Pages/MyTrips";
import NewTrip from "./Pages/NewTrip"
import UserProfile from "./Pages/UserProfile"
import AddGPX from "./Pages/AddGPX"

import NewEvent from "./Pages/NewEvent"
// import Type from './Pages/Type'

import Nav from "./Layout/Nav";

function AppRouter() {
  const [state, dispatch] = useReducer(MapReducer, {
    trips: [],
    types: [],
    usersTrips: [],
    currentTrip: {},
    currentTrack: {events: []},
    loading: false
  });

 

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      
      dispatch({type: 'authstatechanged', payload: user})
      getUseDetailsByUID(user ? user.uid : null, dispatch)
      if(user){navigate(`id/${user.uid}/mytrips`)

      }
  })
}, [])

  return (
      <MapContext.Provider value={{ state, dispatch }}>
        <Nav />{}
        <Router>
          <Home path="/" />
          <SignUp path="signup" />
          <Login path="login" />
          <AddGPX path="addgpx" />
          <Trip path="/trip/:trip" />
          <TripEdit path="/type/:type/trip/:trip/edit" />
          <Track path="/trip/:trip/track/:track" />
          <TrackEdit path="/type/:type/trip/:trip/track/:track/edit" />
          {/* <NewTrip path="newtrip" /> */}
          {/* {state.user ? <TrackUpload path="/trip/:trip/upload" /> : <Redirect from="upload" to="login" noThrow/> } */}
          {state.user ? <MyTrips path={`id/${state.user.uid}/mytrips`} /> : <Redirect from="id/*/mytrips" to="login" noThrow/> }
          {state.user ? <NewTrip path={`id/${state.user.uid}/newtrip`} /> : <Redirect from="id/*/newtrip" to="login" noThrow/> }
          {state.user ? <UserProfile path={`id/${state.user.uid}/userprofile`} /> : <Redirect from="id/*/userprofile" to="login" noThrow/> }
          {state.user ? <NewEvent path={`trip/${state.currentTrip.slug}/newevent`} /> : <Redirect from="trip/*/newevent" to="login" noThrow/> }
        </Router>
      </MapContext.Provider>
  );
}

export default AppRouter;

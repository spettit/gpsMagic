import React, {useReducer, useEffect } from 'react';
import { Router, Link } from '@reach/router'

import MapContext from './MapContext'
import MapReducer from './MapReducer';
import {getAllTrips} from "./firestore/firestore"
import './App.css';

import Home from './Pages/Home'
import Login from './Pages/LogIn'
import SignUp from './Pages/SignUp'
import Track from './Pages/Track'
import TrackEdit from './Pages/TrackEdit'
import TrackUpload from './Pages/TrackEdit'
import Trip from './Pages/Trip'
import TripEdit from './Pages/TripEdit'
// import Type from './Pages/Type'

import Nav from './Components/Nav'

function AppRouter() {
  const [state, dispatch] = useReducer(MapReducer, { trips: [], types: [], newTrip: {} });
  useEffect(() => getAllTrips(dispatch), []);

  return (
    <MapContext.Provider value={{ state, dispatch }}>
    <Nav />
    <Router>
      <Home path="/" />
      <SignUp path="signup" />
      <Login path='login' />
      <Home path='/type/:type' />
      <Trip path='/type/:type/trip/:trip' />
      <TripEdit path='/type/:type/trip/:trip/edit' />
      <Track path='/type/:type/trip/:trip/track/:track' />
      <TrackEdit path='/type/:type/trip/:trip/track/:track/edit' />
      <TrackUpload path='/type/:type/trip/:trip/upload' />
    </Router>
    </MapContext.Provider>
  );
}

export default AppRouter;

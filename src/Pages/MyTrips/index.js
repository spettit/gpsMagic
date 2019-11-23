import React, { useContext } from 'react'
import { Link } from '@reach/router'
import MapContext from '../../MapContext'
import { getAllTripsByUserId } from '../../firebase/firestore'

import TripList from './components/TripList'

const MyTrips = () => {
    const { state, dispatch} = useContext(MapContext)
    getAllTripsByUserId(state.user.uid, dispatch)
    return (
        <div className="container">
            <h1>My Trips </h1>
            <h4>{state.userProfile.first_name}'s Trips</h4>

            {/* {state.trips.map((trip) => <p key={trip.id}>{trip.data.name}</p>)} */}
            <TripList />
            <Link to="/newtrip"><h2>+</h2></Link>
        </div>
    )
}

export default MyTrips
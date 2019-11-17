import React, { useContext } from 'react'
import MapContext from '../MapContext'
import { getAllTripsByUserId } from '../firebase/firestore'

const MyTrips = () => {
    const { state, dispatch} = useContext(MapContext)
    getAllTripsByUserId(state.user.uid, dispatch)
    return (
        <div className="container">
            <h1>My Trips </h1>
            <h4>{state.user.uid}</h4>

            {state.trips.map((trip) => <p key={trip.id}>{trip.data.name}</p>)}
            <form>
                <h2>New Trip</h2>
                <label>Name
                    <input type="text" placeholder="Give this trip a name"/>
                </label>
               <button type="submit">Add</button>
            </form>
        </div>
        
    )
}

export default MyTrips
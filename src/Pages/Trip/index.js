import React, {useContext, useEffect} from 'react'
import MapContext from '../../MapContext'
import TripMap from './components/TripMap'
import TrackList from './components/TrackList'
import Stats from './components/Stats'
import { getTripBySlug } from '../../firebase/firestore'

let Trip = (props) => {
    const { state, dispatch } = useContext(MapContext)
    useEffect(() => getTripBySlug(props.trip, dispatch),[dispatch, props.trip])
    // useEffect(() => setCurrentTripTracks(state.currentTrack.id || null, dispatch), [dispatch, state.currentTrack.id])
    return (
        <div>
            <div className="Top-spacer"></div>
            <h1>{state.currentTrip.name}</h1>
            {/* <img src={state.currentTrip.image} alt="main" style={{width: "100vw", height: "200px"}}/ */}
            <div style={{
                width:"100vw", 
                height:"600px", 
                backgroundImage: `url("${state.currentTrip.image}")`,
                backgroundRepeat: "no-repeat", 
                backgroundAttachment: "fixed", 
                backgroundPosition: "center",
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-end",
                alignItems: "top",
                backgroundColor: "lightgray",
                // alignContent: "center",
                // justifyItems: "center",

                
                }}>
            <TripMap />
            </div>
            <div className="container">
            <TrackList />
            <Stats />
            </div>
            
        </div>
    )
}

export default Trip
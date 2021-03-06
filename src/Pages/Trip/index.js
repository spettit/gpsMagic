import React, {useContext, useEffect, useState} from 'react'
import MapContext from '../../MapContext'
import TripMap from './components/TripMap'
// import TrackList from './components/TrackList'
import SideBar from './components/SideBar'
import TrackMapContainer from './components/TrackMap/TrackMapContainer'
// import Stats from './components/Stats'
import { getTripBySlug } from '../../firebase/firestore'

let Trip = (props) => {
    const { state, dispatch } = useContext(MapContext)
    const [ mode, setMode ] = useState(0)
    useEffect(() => getTripBySlug(props.trip, dispatch),[dispatch, props.trip])
    // useEffect(() => setCurrentTripTracks(state.currentTrack.id || null, dispatch), [dispatch, state.currentTrack.id])
   
    return (
        <div>
            <div className="top-spacer"></div>
            {/* <Stats /> */}
            {/* <h3>{state.currentTrip.name}</h3> */}
            {/* <img src={state.currentTrip.image} alt="main" style={{width: "100vw", height: "200px"}}/ */}
            <div style={{display: "flex"}}>
            <SideBar setMode={setMode}/>

            {mode === 0 && <div style={{
                width:"100vw", 
                height:"600px", 
                backgroundImage: `url("${state.currentTrip.image}")`,
                backgroundRepeat: "no-repeat", 
                // backgroundAttachment: "fixed", 
                backgroundPosition: "center",
                backgroundSize: "cover",
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-end",
                alignItems: "flex-end",
                backgroundColor: "lightgray",
                // alignContent: "center",
                // justifyItems: "center",
                }}>
            <TripMap />
            </div>}

            {mode === 1 && !state.loading && <TrackMapContainer />}


            </div>
            <div className="container">
            {/* <TrackList /> */}
            
            </div>
            
        </div>
    )
  
    
}

export default Trip
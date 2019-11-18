import React, {useContext, useEffect} from 'react'
import MapContext from '../../MapContext'
import TripMap from './components/TripMap'
import TrackList from './components/TrackList'
import Stats from './components/Stats'
import { getTripByTripId, setCurrentTripTracks } from '../../firebase/firestore'

let Trip = (props) => {
    const { state, dispatch } = useContext(MapContext)
    useEffect(() => getTripByTripId(props.trip, dispatch),[dispatch, props.trip])
    useEffect(() => setCurrentTripTracks(props.trip, dispatch), [dispatch, props.trip])
    return (
        <div>
            <h1>{props.trip}</h1>
            <TripMap />
            <TrackList />
            <Stats />
        </div>
    )
}

export default Trip
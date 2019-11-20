import React, {useContext, useEffect} from 'react'
import MapContext from '../../MapContext'
import TrackMap from './components/TrackMap'
// import TrackList from './components/TrackList'
// import Stats from './components/Stats'
import { getCurrentTrackById } from '../../firebase/firestore'

let Track = (props) => {
    const { state, dispatch } = useContext(MapContext)
    useEffect(() => getCurrentTrackById(props.track, dispatch),[dispatch, props.track])
    // useEffect(() => setCurrentTripTracks(props.trip, dispatch), [dispatch, props.trip])
    return (
        <div>
            <h1>{state.currentTrack.name}</h1>
            <TrackMap />
        </div>
    )
}

export default Track
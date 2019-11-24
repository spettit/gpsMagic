import React, {useContext, useEffect, useState} from 'react'
import MapContext from '../../MapContext'
import TrackMap from './components/TrackMap'
import TrackPointsList from './components/PointsTable'
import moment from 'moment'

// import TrackList from './components/TrackList'
// import Stats from './components/Stats'
import { getCurrentTrackById } from '../../firebase/firestore'





let marker = {lat: 12, lng: -61.75}

let Track = (props) => {
    const { state, dispatch } = useContext(MapContext)
    const startDate = moment(state.currentTrack.start_time)
    const [theDate, setTheDate] = useState(startDate)
    const [lastPoint, setLastPoint] = useState({lat: 0, lng: 0})
    useEffect(() => getCurrentTrackById(props.track, dispatch),[dispatch, props.track])

    useEffect(() => {
        const points = state.currentTrack.minified_points
        if(points) {
            for (let i = 0; i < points.length; i++) {
                
                console.log("point", points[i].timestamp, "marker", theDate.valueOf())
                if(points[i].timestamp > theDate.valueOf()){
                    console.log(true)
                    setLastPoint(points[i-1])
                    return
                }
            }}
            }, [state.currentTrack.minified_points, theDate])
        
    




   
    return (
        <div>
            <h1>{state.currentTrack.name}</h1>
            <TrackMap marker={{lat: lastPoint.lat, lng: lastPoint.lng}}/>
            {/* <TrackPointsList /> */}
            <div>{theDate.format("DD/MM/YYYY HH:mm:ss")}</div>
            <input type="number" onChange={(e) => setTheDate(startDate.add(e.target.value, "m"))} />
            
        </div>
    )
}

export default Track
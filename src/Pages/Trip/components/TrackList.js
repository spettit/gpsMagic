import React, { useContext } from 'react'
import MapContext from '../../../MapContext'
import { navigate, Link } from '@reach/router'
import moment from 'moment'


const TrackList = () => {
    const { state } = useContext(MapContext)
    const { currentTracks } = state
    return (
        <div>
            <table style={{width: "800px", textAlign: "left", fontSize: "small"}}>
            <thead>
            <tr>
                <th>name</th>
                <th>distance</th>
                <th>start</th>
                <th>alt</th>
            </tr>
            </thead>
            <tbody>
                {currentTracks.map((track) => {
                    return(
                        <tr key={track.id} onClick={() => navigate(`${state.currentTrip.slug}/track/${track.id}`)}>
                            <td>{track.data.name}</td>
                            <td>{track.data.distance}</td>
                            <td>{moment(track.data.start_time).format("dddd, MMMM Do YYYY, h:mm:ss a")}</td>
                            {/* <td>{track.data.}</td> */}
                        </tr>
                    )
                })}
            </tbody>
        </table>
        {state.user && <Link to="upload"><h2>+</h2></Link>}
        

        </div>
        
    )
}

export default TrackList
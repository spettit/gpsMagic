import React, { useContext } from 'react'
import MapContext from '../../../MapContext'


const TrackList = () => {
    const { state } = useContext(MapContext)
    const { currentTracks } = state
    return (
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
                        <tr key={track.id}>
                            <td>{track.data.name}</td>
                            <td>{track.data.distance}</td>
                            <td>{track.data.start_time.toString()}</td>
                            {/* <td>{track.data.}</td> */}
                        </tr>
                    )
                })}
            </tbody>
        </table>
    )
}

export default TrackList
import React, { useContext } from 'react'
import MapContext from '../../../MapContext'
import moment from 'moment'


const TrackPointsList = () => {
    const { state } = useContext(MapContext)

    const { minified_points } = state.currentTrack
    return (
        <table style={{width: "800px", textAlign: "left", fontSize: "small"}}>
            <thead>
            <tr>
                <th>timestamp</th>
                <th>lat</th>
                <th>lng</th>
                <th>alt</th>
            </tr>
            </thead>
            <tbody>
                {minified_points && minified_points.map((point) => {
                    return(
                        <tr key={point.timestamp}>
                            <td>{moment(point.timestamp).format("D/M/YYYY HH:mm:ss")}</td>
                            <td>{point.lat}</td>
                            <td>{point.lng}</td>
                            <td>{point.altitude}</td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    )
}

export default TrackPointsList
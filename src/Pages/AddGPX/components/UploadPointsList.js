import React from 'react'
import moment from 'moment'



const UploadPointsList = (props) => {

    const { points } = props
    return (
        <table style={{width: "800px", textAlign: "left", fontSize: "small"}}>
            <thead>
            <tr>
                <th>timestamp</th>
                <th>lat</th>
                <th>lng</th>
                <th>alt</th>
                <th>distance (m)</th>
                <th>heading (deg)</th>
                <th>cardinal</th>
                <th>duration (secs) </th>
                <th>speed</th>
            </tr>
            </thead>
            <tbody>
                {points && points.map((point) => {
                    return(
                        <tr key={point.timestamp}>

                            <td>{moment(point.timestamp).format("DD/MM HH:mm:ss")}</td>
                            <td>{point.lat}</td>
                            <td>{point.lng}</td>
                            <td>{Math.floor(point.altitude)}</td>
                            <td>{point.distance}</td>
                            <td>{point.heading}</td>
                            <td>{point.cardinal}</td>
                            <td>{Math.floor(point.duration/1000)}</td>
                            <td>{Math.round(point.speed)}</td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    )
}

export default UploadPointsList
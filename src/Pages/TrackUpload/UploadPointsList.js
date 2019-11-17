import React, { useContext } from 'react'
import MapContext from '../../MapContext'


const UploadPointsList = () => {
    const { state } = useContext(MapContext)
    const { uploadPoints } = state
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
                {uploadPoints.map((point) => {
                    return(
                        <tr key={point.timestamp}>
                            <td>{point.timestamp}</td>
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

export default UploadPointsList
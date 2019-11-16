import React, { useContext } from 'react'
import _ from 'lodash'
import MapContext from '../../MapContext'
import convertGPXtoJSON from './utils/convertGPXtoJSON'

const handleChange = (e, dispatch) => {
    const file = e.target.files[0];
    const fileReader = new FileReader();
    fileReader.onload = event => {
      const gpsJson = convertGPXtoJSON(event.target.result);
      const uniquePoints = _.uniqBy(gpsJson.points, "timestamp");
      dispatch({type: "setPoints", payload: uniquePoints});
      // console.log(gpsJson)
      dispatch({type: "setMeta", payload: {name: gpsJson.name, starttime: gpsJson.StartTime, pointCount: uniquePoints.length}})
    };
    fileReader.readAsText(file);
  }


const FilePicker = () => {
    const { dispatch } = useContext(MapContext)
    return (
        <form>
        <input
          type="file"
          accept=".gpx"
          onChange={e => handleChange(e, dispatch)}

        ></input>
      </form>
    )
}


export default FilePicker
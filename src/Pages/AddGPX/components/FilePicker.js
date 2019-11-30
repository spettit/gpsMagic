import React from "react";
import _ from "lodash";
import convertGPXtoJSON from "../utils/convertGPXtoJSON";

const FilePicker = props => {
  function handleChange(e) {
    const file = e.target.files[0];
    const fileReader = new FileReader();
    fileReader.onload = event => {
      const gpsJson = convertGPXtoJSON(event.target.result);
      const uniquePoints = _.uniqBy(gpsJson.points, "timestamp");
      props.setPoints(uniquePoints);
    };
    fileReader.readAsText(file);
  }

  return (
    <form>
      <input type="file" accept=".gpx" onChange={e => handleChange(e)}></input>
    </form>
  );
};

export default FilePicker;

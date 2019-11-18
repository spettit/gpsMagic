import React from "react";
import FilePicker from "./components/FilePicker";
import UploadMap from "./components/UploadMap";
import UploadPointsList from './components/UploadPointsList'

let TrackUpload = props => (
  <div>
    <div>
      {" "}
      UPLOAD Type: {props.type} Trip {props.trip}
    </div>
    <FilePicker />
    <UploadMap />
    <UploadPointsList  />
  </div>
);

export default TrackUpload;

import React from "react";
import FilePicker from "./FilePicker";
import UploadMap from "./UploadMap";
import UploadPointsList from './UploadPointsList'

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

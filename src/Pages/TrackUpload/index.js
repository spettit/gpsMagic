import React from "react";
import FilePicker from "./components/FilePicker";
import ImagePicker from "./components/ImagePicker"
import UploadMap from "./components/UploadMap";
import UploadPointsList from './components/UploadPointsList'
// import { getImagesByTrack } from '../../firebase/firestore'
// import MapContext from '../../MapContext'
// import ImageGallery from './components/ImageGallery'

let TrackUpload = props => {
  return (
    <div>
      <div>
        {" "}
        UPLOAD Type: {props.type} Trip {props.trip}
      </div>
      <div style={{height: "100px"}}></div>
      <ImagePicker />
      <FilePicker />
      <UploadMap />
      {/* <ImageGallery /> */}
      <UploadPointsList  />
    </div>
  );
}



export default TrackUpload;

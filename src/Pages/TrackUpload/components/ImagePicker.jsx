import React, { useContext } from "react";
import { uploadImageToStorage } from "../../../firebase/storage";
import { addImageToTrack } from "../../../firebase/firestore";
import MapContext from "../../../MapContext";

function ImagePicker() {
  const { state } = useContext(MapContext);
  const track = state.currentTrack.id;

  function handleChange(e) {
    const file = e.currentTarget.files[0];
    console.log(file);
    const metadata = { contentType: "image/jpeg" };
    const task = uploadImageToStorage(file, metadata);
    task.on(
      "state_changed",
      function progress(snapshot) {
        console.log(snapshot.bytesTransferred);
      },
      function error(err) {
        console.log(err);
      },
      function complete() {
        task.snapshot.ref
          .getDownloadURL()
          .then(url => addImageToTrack(track, file, url));
      }
    );
  }

  return (
    <div>
      <input type="file" onChange={handleChange} />
    </div>
  );
}

export default ImagePicker;

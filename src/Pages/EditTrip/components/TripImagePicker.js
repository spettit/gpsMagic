import React, { useContext } from "react";
import { uploadImageToStorage } from "../../../firebase/storage";
import { addCoverImageToTrip } from "../../../firebase/firestore";
import MapContext from "../../../MapContext";

function TripImagePicker() {
  const { state } = useContext(MapContext);
  const trip = state.currentTrip.id;

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
          .then(imageURL => addCoverImageToTrip(trip, imageURL, imageURL.replace(".jpg", "_200x200.jpg")));
      }
    );
  }

  return (
    <div>
      <input type="file" accept="image/jpg" onChange={handleChange} />
    </div>
  );
}

export default TripImagePicker;

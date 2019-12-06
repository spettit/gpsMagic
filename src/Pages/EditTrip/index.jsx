import React, { useContext, useEffect } from "react";
import MapContext from "../../MapContext";
import { Link } from "@reach/router";
import { getTripBySlug } from "../../firebase/firestore";
import TripImagePicker from "./components/TripImagePicker";

function EditTrip(props) {
  const { state, dispatch } = useContext(MapContext);
  useEffect(() => dispatch({ type: "loading" }), [dispatch]);
  useEffect(() => getTripBySlug(props.trip, dispatch), [dispatch, props.trip]);
  if (state.loading) {
    return (
      <div>
        <div className="top-spacer" />
        <div>...loading</div>
      </div>
    );
  }
  return (
    <div>
      <div className="top-spacer" />
      Trip Edit
      <div>
        <img src={state.currentTrip.thumbnail} width="300px" height="200px" />
        <button>Add or change Cover Image</button>
        <TripImagePicker />
      </div>
      <div>
        <label>description</label>
        <textarea />
      </div>
      <h3>Tracks</h3>
      <ul>
        {state.currentTrip.tracks &&
          state.currentTrip.tracks.map(track => (
            <li key={track.id}>
              <Link to={`/track/${track.id}/edit`}>{track.name}</Link>
            </li>
          ))}
        <Link to={`/trip/${state.currentTrip.slug}/newtrack`}>Add Track</Link>
      </ul>
      <button>Set Flag Coords</button>
    </div>
  );
}

export default EditTrip;

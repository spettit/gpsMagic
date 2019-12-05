import React, { useContext } from "react";
import MapContext from "../../MapContext";
import { Link } from "@reach/router";

function EditTrip(props) {
  const { state } = useContext(MapContext);
  return (
    <div>
      <div className="top-spacer" />
      Trip Edit
      <div>
        <img src={state.currentTrip.image} width="300px" height="200px" />
        <button>Add or change Cover Image</button>
      </div>
      <div>
        <label>description</label>
        <textarea />
      </div>
      <ul>
        {state.currentTrip.tracks.map(track => (
          <li>
            <Link to={`/track/${track.id}/edit`}>{track.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default EditTrip;

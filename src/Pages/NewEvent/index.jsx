import React, { useContext, useState } from "react";
import { Link } from "@reach/router";
import MapContext from "../../MapContext";

function NewEvent(props) {
  const { state } = useContext(MapContext);
  const [type, setType] = useState();
  return (
    <div>
      <div className="top-spacer" />
      <h1>New Event</h1>
      <h2>{state.currentTrip.name}</h2>
      <h2>{state.currentTrack.id}</h2>
      <div>
        <Link className="btn" to="/addgpx">
          Upload GPX file
        </Link>
      </div>
      <div>
        <button className="btn">Upload Image</button>
      </div>
      <div>
        <button className="btn">Upload Move</button>
      </div>
      <div>
        <button className="btn">Link to external URL</button>
      </div>
    </div>
  );
}

export default NewEvent;

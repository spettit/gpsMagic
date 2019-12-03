import React, { useContext } from "react";
import { Link } from "@reach/router";
import MapContext from "../../../../MapContext";

function EventList(props) {
  const { state } = useContext(MapContext);
  return (
    <div>
      {state.currentTrack.events &&
        state.currentTrack.events.map((event, index) => (
          <div key={index}>{event.name}</div>
        ))}
      {state.user && (
        <Link to={`/trip/${state.currentTrip.slug}/newevent`}>
          <h2>+</h2>
        </Link>
      )}
    </div>
  );
}

export default EventList;

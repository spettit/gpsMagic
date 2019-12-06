import React, { useEffect, useContext } from "react";
import MapContext from "../../MapContext";
import { getCurrentTrackById } from "../../firebase/firestore";

function EditTrack(props) {
  const { state, dispatch } = useContext(MapContext);
  useEffect(() => getCurrentTrackById(props.track, dispatch));
  return (
    <div>
      <div className="top-spacer" />
      Edit Track
      <div>{state.currentTrack.name}</div>
      <ul>
        {state.currentTrack.events.map(event => {
          return <li>{event.name}</li>;
        })}
      </ul>
    </div>
  );
}

export default EditTrack;

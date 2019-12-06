import React, { useEffect, useContext } from "react";
import MapContext from "../../MapContext";
import {
  getCurrentTrackById,
  uploadMinifiedPoints
} from "../../firebase/firestore";

function EditTrack(props) {
  const { state, dispatch } = useContext(MapContext);
  useEffect(() => dispatch({ type: "loading" }), [dispatch]);
  useEffect(() => getCurrentTrackById(props.track, dispatch), [
    dispatch,
    props.track
  ]);

  function minifyPoints() {
    // const minipoints = points.filter((point, index, points) => {
    //   const divisor = Math.floor(points.length / 100) + 1;
    //   return index % divisor === 0;
    // });
    // uploadMinifiedPoints(state.currentTrack.id, minipoints);
  }

  if (state.loading) {
    console.log("loading");
    return <div>...loading</div>;
  }
  return (
    <div>
      <div className="top-spacer" />
      <h2>Edit Track</h2>

      <div>
        Track Name: <input type="text" value={state.currentTrack.name} />
      </div>
      <h3>Events</h3>
      <ul>
        {state.currentTrack.events &&
          state.currentTrack.events.map(event => {
            return <li key={event.id}>{event.name + " " + event.type}</li>;
          })}
      </ul>
      <div>
        <button>Add GPX file</button>
        <button>Add image file</button>
        <button>Add youtube movie</button>
        <button>Add external html link</button>
      </div>
      <div>
        <label>Blog</label>
        <textarea />
      </div>
      <button onClick={minifyPoints}>minify points</button>
    </div>
  );
}

export default EditTrack;

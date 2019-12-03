import React, { useState, useEffect, useContext } from "react";
import slugify from "slugify";
import MapContext from "../../MapContext";
import { addNewTrack } from "../../firebase/firestore";
import moment from "moment";

function NewTrack(props) {
  const { state, dispatch } = useContext(MapContext);
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [trip, setTrip] = useState("");
  const [starttime, setStarttime] = useState(moment().valueOf());

  useEffect(() => setTrip(state.currentTrip.id), [state.currentTrip.id]);

  useEffect(() => setSlug(slugify(name)), [name]);

  function handleSubmit() {
    addNewTrack({
      name,
      slug,
      trip,
      start_time: starttime
    });
  }

  return (
    <div>
      <div className="top-spacer" />
      <h1>New Track</h1>
      <div>{trip}</div>
      <input
        type="text"
        onChange={e => setName(e.currentTarget.value)}
        value={name}
      />
      <div>{slug}</div>
      <button onClick={handleSubmit}>add</button>
    </div>
  );
}

export default NewTrack;

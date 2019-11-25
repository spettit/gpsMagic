import React, { useContext, useEffect, useState } from "react";
import MapContext from "../../MapContext";
import TrackMap from "./components/TrackMap";
import TrackPointsList from "./components/PointsTable";
import moment from "moment";

// import TrackList from './components/TrackList'
// import Stats from './components/Stats'
import { getCurrentTrackById } from "../../firebase/firestore";

let marker = { lat: 12, lng: -61.75 };

let Track = props => {
  const { state, dispatch } = useContext(MapContext);
  const startDate = moment(state.currentTrack.start_time);
  const [theDate, setTheDate] = useState(startDate);
  const [lastPoint, setLastPoint] = useState({ lat: 0, lng: 0 });
  const [nextPoint, setnextPoint] = useState({ lat: 0, lng: 0 });
  const [lastPointIndex, setLastPointIndex] = useState(0)
  const [markerCoords, setMarkerCoords] = useState({ lat: 0, lng: 0 });
  const [running, setRunning] = useState(false)
  const [count, setCount] = useState(0)
  useEffect(() => getCurrentTrackById(props.track, dispatch), [
    dispatch,
    props.track
  ]);

  useEffect(() => {
    const points = state.currentTrack.minified_points;
    if (points) {
      for (let i = lastPointIndex; i < points.length; i++) {
        if (points[i].timestamp > theDate.valueOf()) {
          setLastPoint(points[i - 1]);
          setnextPoint(points[i]);
          setLastPointIndex(i-1)
          return;
        }
      }
    }
  }, [lastPointIndex, setnextPoint, state.currentTrack.minified_points, theDate]);

  useEffect(() => {
    const duration =
      parseInt(nextPoint.timestamp) - parseInt(lastPoint.timestamp);
    const part = parseInt(theDate.valueOf()) - parseInt(lastPoint.timestamp);
    const fraction = part / duration;
    const markerlat =
      lastPoint.lat + (nextPoint.lat - lastPoint.lat) * fraction;
    const markerlng =
      lastPoint.lng + (nextPoint.lng - lastPoint.lng) * fraction;
    setMarkerCoords({ lat: markerlat, lng: markerlng });
  }, [
    lastPoint.lat,
    lastPoint.lng,
    lastPoint.timestamp,
    nextPoint.lat,
    nextPoint.lng,
    nextPoint.timestamp,
    theDate,
  ]);



  return (
    <div>
      <h1>{state.currentTrack.name}</h1>
      <TrackMap marker={markerCoords} />
      {/* <TrackPointsList /> */}
      <div>{theDate.format("DD/MM/YYYY HH:mm:ss")}</div>
      <input
        type="number"
        onChange={e => setTheDate(startDate.add(e.target.value, "m"))}
      />
      <button onClick={() => {setRunning(running => !running)}}>run</button>
    </div>
  );
};

export default Track;

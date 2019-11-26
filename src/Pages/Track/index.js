import React, { useContext, useEffect, useState } from "react";
import MapContext from "../../MapContext";
import TrackMap from "./components/TrackMap";
import Photo from "./components/Photo"
import TrackPointsList from "./components/PointsTable";
import moment from "moment";

// import TrackList from './components/TrackList'
// import Stats from './components/Stats'
import { getCurrentTrackById, getPhotosByTrack } from "../../firebase/firestore";

let marker = { lat: 12, lng: -61.75 };
var interval

let Track = props => {
  const { state, dispatch } = useContext(MapContext);
  const startDate = moment(state.currentTrack.start_time).clone();
  const [theDate, setTheDate] = useState(moment());
  const [lastPoint, setLastPoint] = useState({ lat: 0, lng: 0 });
  const [nextPoint, setnextPoint] = useState({ lat: 0, lng: 0 });
  const [lastPointIndex, setLastPointIndex] = useState(0)
  const [markerCoords, setMarkerCoords] = useState({ lat: 0, lng: 0 });
  // const [running, setRunning] = useState(false)
  const [count, setCount] = useState(0)
  useEffect(() => getCurrentTrackById(props.track, dispatch), [
    dispatch,
    props.track
  ]);

  useEffect(() => getPhotosByTrack(props.track, dispatch), [dispatch, props.track])

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


  // 
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
    console.log(markerlat, markerlng)
  }, [
    lastPoint.lat,
    lastPoint.lng,
    lastPoint.timestamp,
    nextPoint.lat,
    nextPoint.lng,
    nextPoint.timestamp,
    theDate,
  ]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => setTheDate(startDate.add(count, 'm')), [count])

  return (
    <div>
      <h1>{state.currentTrack.name}</h1>
      <div style={{display: "flex"}}>
      <TrackMap marker={markerCoords} />
      <Photo />
      </div>
      
      {/* <TrackPointsList /> */}
      <div>{theDate.format("DD/MM/YYYY HH:mm:ss")}</div>
      <button onClick={() => {interval = setInterval(() => {
        setCount(count => count+1)
      }, 60);}}>run</button>
      <button onClick={() => clearInterval(interval)}>Stop</button>
    </div>
  );
};

export default Track;
